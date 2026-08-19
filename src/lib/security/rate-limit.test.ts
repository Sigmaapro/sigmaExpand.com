import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as contactPOST } from "@/app/api/contact/route";
import { POST as partnerPOST } from "@/app/api/partner/route";
import {
  RATE_LIMIT_POLICIES,
  checkRateLimit,
  enforceRateLimit,
  getClientIdentifier,
  getUpstashRestConfig,
  rateLimitKey,
  resetRateLimitClientForTests,
  setRateLimitStoreForTests,
  type RateLimitStore,
} from "@/lib/security/rate-limit";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

function createMemoryStore(clock?: { now: () => number }): RateLimitStore {
  const windows = new Map<string, { count: number; resetAtMs: number }>();
  return {
    async increment(key, windowMs) {
      const now = clock?.now() ?? Date.now();
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

function contactRequest(body: Record<string, unknown>, ip = "203.0.113.10"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

function partnerRequest(
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

function validContactBody(): Record<string, unknown> {
  return {
    email: "qa@example.com",
    name: "QA User",
    message: "Hello from tests",
    source: "contact-form",
    website: "",
  };
}

function validPartnerFields(): Record<string, string | string[]> {
  return {
    intentType: "company",
    fullName: "QA User",
    companyName: "Example Co",
    email: "qa@example.com",
    description: "Partnership inquiry",
    website_honeypot: "",
  };
}

beforeEach(() => {
  process.env.VERCEL = "1";
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_API_KEY;
  delete process.env.CONTACT_EMAIL;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  resetRateLimitClientForTests();
  setRateLimitStoreForTests(createMemoryStore());
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

test("getClientIdentifier trusts Vercel forwarded IP and ignores spoofing off-platform", () => {
  process.env.VERCEL = "1";
  const onVercel = getClientIdentifier(
    new Request("http://localhost/api/contact", {
      headers: {
        "x-vercel-forwarded-for": "198.51.100.7, 127.0.0.1",
        "x-forwarded-for": "8.8.8.8",
      },
    }),
  );
  assert.equal(onVercel, "198.51.100.7");

  process.env.VERCEL = "1";
  const xff = getClientIdentifier(
    new Request("http://localhost/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
    }),
  );
  assert.equal(xff, "203.0.113.9");

  delete process.env.VERCEL;
  const local = getClientIdentifier(
    new Request("http://localhost/api/contact", {
      headers: { "x-forwarded-for": "8.8.8.8" },
    }),
  );
  assert.equal(local, "unknown");
});

test("getUpstashRestConfig rejects missing or non-https URLs", () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  assert.equal(getUpstashRestConfig(), null);

  process.env.UPSTASH_REDIS_REST_URL = "http://insecure.example";
  process.env.UPSTASH_REDIS_REST_TOKEN = "token";
  assert.equal(getUpstashRestConfig(), null);

  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "token";
  assert.deepEqual(getUpstashRestConfig(), {
    url: "https://example.upstash.io",
    token: "token",
  });
});

test("contact: first valid request is allowed", async () => {
  const decision = await checkRateLimit({
    namespace: "contact",
    identifier: "203.0.113.10",
    ...RATE_LIMIT_POLICIES.contact,
  });
  assert.equal(decision.status, "ok");
  assert.equal(decision.allowed, true);
  assert.equal(decision.remaining, RATE_LIMIT_POLICIES.contact.limit - 1);
});

test("contact: requests under threshold are allowed", async () => {
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    const decision = await checkRateLimit({
      namespace: "contact",
      identifier: "203.0.113.11",
      ...RATE_LIMIT_POLICIES.contact,
    });
    assert.equal(decision.allowed, true, `request ${i + 1} should be allowed`);
  }
});

test("contact: threshold exceeded is limited", async () => {
  const id = "203.0.113.12";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({ namespace: "contact", identifier: id, ...RATE_LIMIT_POLICIES.contact });
  }
  const blocked = await checkRateLimit({
    namespace: "contact",
    identifier: id,
    ...RATE_LIMIT_POLICIES.contact,
  });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.status, "limited");
  assert.equal(blocked.remaining, 0);
  assert.ok(blocked.retryAfterSec >= 1);
});

test("contact: blocked request returns 429 and does not invoke Resend", async () => {
  let resendCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) resendCalls += 1;
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "bd@example.com";

  const ip = "203.0.113.13";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({ namespace: "contact", identifier: ip, ...RATE_LIMIT_POLICIES.contact });
  }

  const res = await contactPOST(contactRequest(validContactBody(), ip));
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("Retry-After") !== null, true);
  assert.equal(res.headers.get("X-RateLimit-Limit"), "5");
  assert.equal(res.headers.get("X-RateLimit-Remaining"), "0");
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Too many requests. Please try again later.");
  assert.equal(resendCalls, 0);
});

test("contact: window reset restores quota", async () => {
  let now = 1_000_000;
  setRateLimitStoreForTests(createMemoryStore({ now: () => now }));
  const id = "203.0.113.14";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({ namespace: "contact", identifier: id, ...RATE_LIMIT_POLICIES.contact });
  }
  const blocked = await checkRateLimit({
    namespace: "contact",
    identifier: id,
    ...RATE_LIMIT_POLICIES.contact,
  });
  assert.equal(blocked.allowed, false);

  now += RATE_LIMIT_POLICIES.contact.windowMs + 1;
  const afterReset = await checkRateLimit({
    namespace: "contact",
    identifier: id,
    ...RATE_LIMIT_POLICIES.contact,
  });
  assert.equal(afterReset.allowed, true);
  assert.equal(afterReset.status, "ok");
});

test("contact: different identifiers have independent quota", async () => {
  const a = "203.0.113.15";
  const b = "203.0.113.16";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({ namespace: "contact", identifier: a, ...RATE_LIMIT_POLICIES.contact });
  }
  const aBlocked = await checkRateLimit({
    namespace: "contact",
    identifier: a,
    ...RATE_LIMIT_POLICIES.contact,
  });
  const bAllowed = await checkRateLimit({
    namespace: "contact",
    identifier: b,
    ...RATE_LIMIT_POLICIES.contact,
  });
  assert.equal(aBlocked.allowed, false);
  assert.equal(bAllowed.allowed, true);
});

test("partner: valid requests under threshold are allowed", async () => {
  for (let i = 0; i < RATE_LIMIT_POLICIES.partner.limit; i++) {
    const decision = await checkRateLimit({
      namespace: "partner",
      identifier: "203.0.113.21",
      ...RATE_LIMIT_POLICIES.partner,
    });
    assert.equal(decision.allowed, true);
  }
});

test("partner: threshold exceeded returns 429 and does not invoke Resend or read attachments", async () => {
  let resendCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) resendCalls += 1;
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
  process.env.RESEND_API_KEY = "re_test";

  const ip = "203.0.113.22";
  for (let i = 0; i < RATE_LIMIT_POLICIES.partner.limit; i++) {
    await checkRateLimit({ namespace: "partner", identifier: ip, ...RATE_LIMIT_POLICIES.partner });
  }

  const file = new File(["screenshot"], "shot.png", { type: "image/png" });
  const res = await partnerPOST(
    partnerRequest(
      {
        ...validPartnerFields(),
        intentType: "kol",
        roles: ["KOL"],
        performanceScreenshot: file,
      },
      ip,
    ),
  );
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("Retry-After") !== null, true);
  assert.equal(resendCalls, 0);
});

test("partner: different identifiers have independent quota", async () => {
  const a = "203.0.113.23";
  const b = "203.0.113.24";
  for (let i = 0; i < RATE_LIMIT_POLICIES.partner.limit; i++) {
    await checkRateLimit({ namespace: "partner", identifier: a, ...RATE_LIMIT_POLICIES.partner });
  }
  const aBlocked = await checkRateLimit({
    namespace: "partner",
    identifier: a,
    ...RATE_LIMIT_POLICIES.partner,
  });
  const bAllowed = await checkRateLimit({
    namespace: "partner",
    identifier: b,
    ...RATE_LIMIT_POLICIES.partner,
  });
  assert.equal(aBlocked.allowed, false);
  assert.equal(bAllowed.allowed, true);
});

test("contact and partner namespaces do not share a counter", async () => {
  const id = "203.0.113.30";
  for (let i = 0; i < RATE_LIMIT_POLICIES.contact.limit; i++) {
    await checkRateLimit({ namespace: "contact", identifier: id, ...RATE_LIMIT_POLICIES.contact });
  }
  const contactBlocked = await checkRateLimit({
    namespace: "contact",
    identifier: id,
    ...RATE_LIMIT_POLICIES.contact,
  });
  const partnerAllowed = await checkRateLimit({
    namespace: "partner",
    identifier: id,
    ...RATE_LIMIT_POLICIES.partner,
  });
  assert.equal(contactBlocked.allowed, false);
  assert.equal(partnerAllowed.allowed, true);
  assert.notEqual(rateLimitKey("contact", id), rateLimitKey("partner", id));
});

test("honeypot still short-circuits after a allowed limiter check", async () => {
  let resendCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) resendCalls += 1;
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "bd@example.com";

  const res = await contactPOST(
    contactRequest({ ...validContactBody(), website: "http://spam.test" }),
  );
  assert.equal(res.status, 200);
  const json = (await res.json()) as { ok?: boolean };
  assert.equal(json.ok, true);
  assert.equal(resendCalls, 0);
});

test("validation still runs after limiter allows", async () => {
  const res = await contactPOST(contactRequest({ ...validContactBody(), email: "not-an-email" }));
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Invalid email");
});

test("partner upload size limit still runs after limiter allows", async () => {
  const tooBig = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.png", {
    type: "image/png",
  });
  const res = await partnerPOST(
    partnerRequest({
      intentType: "kol",
      fullName: "QA User",
      email: "qa@example.com",
      description: "Bio",
      roles: ["KOL"],
      website_honeypot: "",
      performanceScreenshot: tooBig,
    }),
  );
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "File too large");
});

test("legitimate contact request is not 429 under quota", async () => {
  const res = await contactPOST(contactRequest(validContactBody()));
  assert.notEqual(res.status, 429);
  assert.ok([400, 503].includes(res.status));
});

test("fail-closed when no distributed store is configured", async () => {
  setRateLimitStoreForTests(undefined);
  const res = await enforceRateLimit(contactRequest(validContactBody()), "contact");
  assert.ok(res);
  assert.equal(res.status, 503);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Service temporarily unavailable");
});
