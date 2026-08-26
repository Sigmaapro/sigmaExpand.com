import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as contactPOST } from "@/app/api/contact/route";
import { POST as partnerPOST } from "@/app/api/partner/route";
import {
  CONTACT_MAX_BODY_BYTES,
  PARTNER_MAX_BODY_BYTES,
  enforceBodyLimit,
  parseDeclaredContentLength,
  payloadTooLargeResponse,
} from "@/lib/security/body-limit";
import {
  RATE_LIMIT_POLICIES,
  checkRateLimit,
  resetRateLimitClientForTests,
  setRateLimitStoreForTests,
  type RateLimitStore,
} from "@/lib/security/rate-limit";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

function createMemoryStore(): RateLimitStore {
  const windows = new Map<string, { count: number; resetAtMs: number }>();
  return {
    async increment(key, windowMs) {
      const now = Date.now();
      const current = windows.get(key);
      if (!current || now >= current.resetAtMs) {
        const resetAtMs = now + windowMs;
        windows.set(key, { count: 1, resetAtMs });
        return { count: 1, resetAtMs };
      }
      current.count += 1;
      return { count: current.count, resetAtMs: current.resetAtMs };
    },
  };
}

function validContactBody(): Record<string, unknown> {
  return {
    email: "qa@example.com",
    name: "QA User",
    message: "Hello from tests",
    source: "contact-form",
    website: "",
    turnstileToken: "test-turnstile-token",
  };
}

function validCompanyFields(): Record<string, string> {
  return {
    intentType: "company",
    fullName: "QA User",
    companyName: "Example Co",
    email: "qa@example.com",
    description: "Partnership inquiry",
    website_honeypot: "",
    turnstileToken: "test-turnstile-token",
  };
}

function validKolFields(): Record<string, string | string[]> {
  return {
    intentType: "kol",
    fullName: "QA User",
    email: "qa@example.com",
    description: "Bio",
    roles: ["KOL"],
    website_honeypot: "",
    turnstileToken: "test-turnstile-token",
  };
}

function contactJsonRequest(
  body: string,
  ip = "203.0.113.10",
  extraHeaders?: Record<string, string>,
): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
      ...extraHeaders,
    },
    body,
  });
}

function contactStreamRequest(
  bytes: Uint8Array,
  ip = "203.0.113.10",
): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    }),
    duplex: "half",
  } as RequestInit);
}

function partnerFormRequest(
  fields: Record<string, string | File | string[]>,
  ip = "203.0.113.20",
): Request {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      for (const item of value) fd.append(key, item);
    } else {
      fd.append(key, value);
    }
  }
  return new Request("http://localhost/api/partner", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: fd,
  });
}

function helperRequest(
  body?: string | Uint8Array | null,
  headers?: Record<string, string>,
): Request {
  let initBody: BodyInit | undefined;
  if (body instanceof Uint8Array) {
    const copy = new ArrayBuffer(body.byteLength);
    new Uint8Array(copy).set(body);
    initBody = copy;
  } else if (body != null) {
    initBody = body;
  }
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers,
    body: initBody,
  });
}

function streamRequest(chunks: Uint8Array[], headers?: Record<string, string>): Request {
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers,
    body: new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(chunk);
        controller.close();
      },
    }),
    duplex: "half",
  } as RequestInit);
}

beforeEach(() => {
  process.env.VERCEL = "1";
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_API_KEY;
  delete process.env.CONTACT_EMAIL;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  resetRateLimitClientForTests();
  setRateLimitStoreForTests(createMemoryStore());
  globalThis.fetch = (async (input, init) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return originalFetch(input as RequestInfo, init);
  }) as typeof fetch;
});

afterEach(() => {
  setRateLimitStoreForTests(undefined);
  resetRateLimitClientForTests();
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

test("parseDeclaredContentLength accepts integers and rejects malformed values", () => {
  assert.equal(parseDeclaredContentLength(null), null);
  assert.equal(parseDeclaredContentLength(""), null);
  assert.equal(parseDeclaredContentLength(" 12 "), 12);
  assert.equal(parseDeclaredContentLength("0"), 0);
  assert.equal(parseDeclaredContentLength("65536"), 65536);
  assert.equal(parseDeclaredContentLength("12abc"), null);
  assert.equal(parseDeclaredContentLength("1e6"), null);
  assert.equal(parseDeclaredContentLength("-1"), null);
  assert.equal(parseDeclaredContentLength("64.0"), null);
  assert.equal(parseDeclaredContentLength("1,2"), null);
  assert.equal(parseDeclaredContentLength("99999999999999999999"), Number.POSITIVE_INFINITY);
});

test("payloadTooLargeResponse is 413 without exposing limits", async () => {
  const res = payloadTooLargeResponse();
  assert.equal(res.status, 413);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Payload too large");
  assert.equal(JSON.stringify(json).includes("65536"), false);
  assert.equal(JSON.stringify(json).includes("6291456"), false);
});

test("helper: empty body is allowed", async () => {
  const result = await enforceBodyLimit(helperRequest(null), 16);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  const buf = await result.request.arrayBuffer();
  assert.equal(buf.byteLength, 0);
});

test("helper: valid body under limit is rebuilt and readable", async () => {
  const result = await enforceBodyLimit(helperRequest("hello"), 16);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(await result.request.text(), "hello");
});

test("helper: exact max bytes is allowed", async () => {
  const body = new Uint8Array(16).fill(7);
  const result = await enforceBodyLimit(helperRequest(body), 16);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal((await result.request.arrayBuffer()).byteLength, 16);
});

test("helper: max + 1 byte is rejected", async () => {
  const body = new Uint8Array(17).fill(7);
  const result = await enforceBodyLimit(helperRequest(body), 16);
  assert.equal(result.status, "too-large");
});

test("helper: Content-Length over limit rejects without consuming a large body", async () => {
  const req = new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "content-length": "100" },
  });
  const result = await enforceBodyLimit(req, 16);
  assert.equal(result.status, "too-large");
});

test("helper: missing Content-Length still counts actual bytes under the cap", async () => {
  const result = await enforceBodyLimit(streamRequest([new TextEncoder().encode("abc")]), 16);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(await result.request.text(), "abc");
});

test("helper: malformed Content-Length does not skip byte counting", async () => {
  const over = new Uint8Array(17).fill(1);
  const result = await enforceBodyLimit(
    streamRequest([over], { "content-length": "nope" }),
    16,
  );
  assert.equal(result.status, "too-large");
});

test("helper: malformed Content-Length still allows a small actual body", async () => {
  const result = await enforceBodyLimit(
    helperRequest("ok", { "content-length": "nope" }),
    16,
  );
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(await result.request.text(), "ok");
});

test("helper: streamed body over the limit is rejected", async () => {
  const result = await enforceBodyLimit(
    streamRequest([new Uint8Array(10), new Uint8Array(7)]),
    16,
  );
  assert.equal(result.status, "too-large");
});

test("helper: reconstructed request keeps JSON content-type", async () => {
  const result = await enforceBodyLimit(
    helperRequest(JSON.stringify({ a: 1 }), { "content-type": "application/json" }),
    1024,
  );
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.request.headers.get("content-type"), "application/json");
  assert.deepEqual(await result.request.json(), { a: 1 });
});

test("helper: reconstructed request keeps multipart boundary", async () => {
  const fd = new FormData();
  fd.set("intentType", "company");
  fd.set("note", "hello");
  const original = new Request("http://localhost/api/partner", {
    method: "POST",
    body: fd,
  });
  const contentType = original.headers.get("content-type") ?? "";
  assert.equal(contentType.includes("multipart/form-data"), true);
  assert.equal(contentType.includes("boundary="), true);

  const result = await enforceBodyLimit(original, 64_000);
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.request.headers.get("content-type"), contentType);
  const parsed = await result.request.formData();
  assert.equal(parsed.get("intentType"), "company");
  assert.equal(parsed.get("note"), "hello");
});

test("contact: normal body passes the body-limit stage", async () => {
  const res = await contactPOST(
    contactJsonRequest(JSON.stringify(validContactBody())),
  );
  assert.equal(res.status, 503);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Lead capture is not configured");
});

test("contact: body under 64 KiB is not 413", async () => {
  const payload = {
    ...validContactBody(),
    message: "x".repeat(8_000),
  };
  const raw = JSON.stringify(payload);
  assert.ok(raw.length < CONTACT_MAX_BODY_BYTES);
  const res = await contactPOST(contactJsonRequest(raw));
  assert.notEqual(res.status, 413);
  assert.equal(res.status, 503);
});

test("contact: body over 64 KiB returns 413 and does not call Turnstile", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const raw = JSON.stringify({
    ...validContactBody(),
    pad: "x".repeat(CONTACT_MAX_BODY_BYTES),
  });
  assert.ok(raw.length > CONTACT_MAX_BODY_BYTES);
  const res = await contactPOST(contactJsonRequest(raw));
  assert.equal(res.status, 413);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Payload too large");
  assert.equal(siteverifyCalls, 0);
});

test("contact: Content-Length over limit returns 413", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await contactPOST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": String(CONTACT_MAX_BODY_BYTES + 1),
        "x-forwarded-for": "203.0.113.10",
      },
    }),
  );
  assert.equal(res.status, 413);
  assert.equal(siteverifyCalls, 0);
});

test("contact: missing Content-Length under limit works", async () => {
  const raw = JSON.stringify(validContactBody());
  const res = await contactPOST(contactStreamRequest(new TextEncoder().encode(raw)));
  assert.equal(res.status, 503);
});

test("contact: missing Content-Length over limit returns 413", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const over = new Uint8Array(CONTACT_MAX_BODY_BYTES + 1).fill(120);
  const res = await contactPOST(contactStreamRequest(over));
  assert.equal(res.status, 413);
  assert.equal(siteverifyCalls, 0);
});

test("contact: malformed JSON under the limit remains 400", async () => {
  const res = await contactPOST(contactJsonRequest("{"));
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Invalid JSON");
});

test("contact: rate-limited oversized request returns 429 before 413", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const ip = "203.0.113.77";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({
      namespace: "contact",
      identifier: ip,
      ...RATE_LIMIT_POLICIES.contact,
    });
  }

  const raw = JSON.stringify({
    ...validContactBody(),
    pad: "x".repeat(CONTACT_MAX_BODY_BYTES),
  });
  const res = await contactPOST(contactJsonRequest(raw, ip));
  assert.equal(res.status, 429);
  assert.equal(siteverifyCalls, 0);
});

test("partner: normal company FormData is not 413", async () => {
  const res = await partnerPOST(partnerFormRequest(validCompanyFields()));
  assert.notEqual(res.status, 413);
  assert.ok([400, 503, 502].includes(res.status));
});

test("partner: normal KOL FormData is not 413", async () => {
  const res = await partnerPOST(partnerFormRequest(validKolFields()));
  assert.notEqual(res.status, 413);
  assert.ok([400, 503, 502].includes(res.status));
});

test("partner: valid file under 5 MiB and total under 6 MiB is not 413", async () => {
  const png = new Uint8Array(64 * 1024);
  png.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const file = new File([png], "shot.png", { type: "image/png" });
  const res = await partnerPOST(
    partnerFormRequest({
      ...validKolFields(),
      performanceScreenshot: file,
    }),
  );
  assert.notEqual(res.status, 413);
  assert.notEqual(res.status, 400);
});

test("partner: file over 5 MiB but total under 6 MiB remains 400 File too large", async () => {
  const tooBig = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.png", {
    type: "image/png",
  });
  const res = await partnerPOST(
    partnerFormRequest({
      ...validKolFields(),
      performanceScreenshot: tooBig,
    }),
  );
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "File too large");
});

test("partner: total multipart over 6 MiB returns 413 before Turnstile", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await partnerPOST(
    new Request("http://localhost/api/partner", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data; boundary=----sigma-test",
        "x-forwarded-for": "203.0.113.20",
      },
      body: new Uint8Array(PARTNER_MAX_BODY_BYTES + 1),
    }),
  );
  assert.equal(res.status, 413);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Payload too large");
  assert.equal(siteverifyCalls, 0);
});

test("partner: many extra fields under the total limit remain compatible", async () => {
  const fd = new FormData();
  for (const [key, value] of Object.entries(validCompanyFields())) {
    fd.set(key, value);
  }
  for (let i = 0; i < 50; i++) {
    fd.set(`extra_${i}`, `value-${i}`);
  }
  const res = await partnerPOST(
    new Request("http://localhost/api/partner", {
      method: "POST",
      headers: { "x-forwarded-for": "203.0.113.20" },
      body: fd,
    }),
  );
  assert.notEqual(res.status, 413);
});

test("partner: extra fields that push the total over the limit return 413", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const extraFields = Array.from({ length: 20 }, (_, i) => `extra_${i}`).join("&");
  const body = new Uint8Array(PARTNER_MAX_BODY_BYTES + 1 + extraFields.length);
  body.set(new TextEncoder().encode(extraFields));
  const res = await partnerPOST(
    new Request("http://localhost/api/partner", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data; boundary=----sigma-test",
        "x-forwarded-for": "203.0.113.20",
      },
      body,
    }),
  );
  assert.equal(res.status, 413);
  assert.equal(siteverifyCalls, 0);
});

test("partner: rate-limited oversized request returns 429", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      siteverifyCalls += 1;
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const ip = "203.0.113.88";
  for (let i = 0; i < RATE_LIMIT_POLICIES.partner.limit; i++) {
    await checkRateLimit({
      namespace: "partner",
      identifier: ip,
      ...RATE_LIMIT_POLICIES.partner,
    });
  }

  const res = await partnerPOST(
    new Request("http://localhost/api/partner", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data; boundary=----sigma-test",
        "x-forwarded-for": ip,
      },
      body: new Uint8Array(PARTNER_MAX_BODY_BYTES + 1),
    }),
  );
  assert.equal(res.status, 429);
  assert.equal(siteverifyCalls, 0);
});
