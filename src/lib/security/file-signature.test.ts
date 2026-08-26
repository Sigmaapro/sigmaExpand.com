import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as partnerPOST } from "@/app/api/partner/route";
import { detectSupportedFileMime } from "@/lib/security/file-signature";
import {
  RATE_LIMIT_POLICIES,
  checkRateLimit,
  resetRateLimitClientForTests,
  setRateLimitStoreForTests,
  type RateLimitStore,
} from "@/lib/security/rate-limit";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

const PNG_BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
const JPEG_BYTES = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00]);
const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);

function webpBytes(): Uint8Array {
  const bytes = new Uint8Array(16);
  bytes.set([0x52, 0x49, 0x46, 0x46], 0);
  bytes.set([0x08, 0x00, 0x00, 0x00], 4);
  bytes.set([0x57, 0x45, 0x42, 0x50], 8);
  return bytes;
}

function riffNotWebp(): Uint8Array {
  const bytes = new Uint8Array(12);
  bytes.set([0x52, 0x49, 0x46, 0x46], 0);
  bytes.set([0x57, 0x41, 0x56, 0x45], 8);
  return bytes;
}

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

function kolFields(): Record<string, string | string[]> {
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

function fileWith(bytes: Uint8Array, name: string, type: string): File {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return new File([copy], name, { type });
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

test("PNG: valid signature => image/png", () => {
  assert.equal(detectSupportedFileMime(PNG_BYTES), "image/png");
});

test("PNG: fake PNG => null", () => {
  assert.equal(detectSupportedFileMime(new Uint8Array([0x89, 0x50, 0x4e, 0x00])), null);
});

test("PNG: truncated PNG => null", () => {
  assert.equal(detectSupportedFileMime(PNG_BYTES.slice(0, 4)), null);
});

test("JPEG: valid FF D8 FF => image/jpeg", () => {
  assert.equal(detectSupportedFileMime(JPEG_BYTES), "image/jpeg");
});

test("JPEG: fake JPEG => null", () => {
  assert.equal(detectSupportedFileMime(new Uint8Array([0xff, 0xd8, 0x00])), null);
});

test("JPEG: truncated FF D8 => null", () => {
  assert.equal(detectSupportedFileMime(new Uint8Array([0xff, 0xd8])), null);
});

test("WEBP: valid RIFF + WEBP => image/webp", () => {
  assert.equal(detectSupportedFileMime(webpBytes()), "image/webp");
});

test("WEBP: RIFF but not WEBP => null", () => {
  assert.equal(detectSupportedFileMime(riffNotWebp()), null);
});

test("WEBP: WEBP text without RIFF => null", () => {
  const bytes = new Uint8Array(12);
  bytes.set([0x57, 0x45, 0x42, 0x50], 8);
  assert.equal(detectSupportedFileMime(bytes), null);
});

test("WEBP: truncated WEBP => null", () => {
  assert.equal(detectSupportedFileMime(webpBytes().slice(0, 10)), null);
});

test("PDF: valid %PDF- => application/pdf", () => {
  assert.equal(detectSupportedFileMime(PDF_BYTES), "application/pdf");
});

test("PDF: fake PDF => null", () => {
  assert.equal(detectSupportedFileMime(new TextEncoder().encode("%PDX-1.4")), null);
});

test("PDF: truncated PDF => null", () => {
  assert.equal(detectSupportedFileMime(new TextEncoder().encode("%PD")), null);
});

test("empty Uint8Array => null", () => {
  assert.equal(detectSupportedFileMime(new Uint8Array()), null);
});

test("random bytes => null", () => {
  assert.equal(detectSupportedFileMime(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])), null);
});

async function assertUnsupported(file: File) {
  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      performanceScreenshot: file,
    }),
  );
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Unsupported file type");
  assert.equal(JSON.stringify(json).includes("image/"), false);
  assert.equal(JSON.stringify(json).includes("%PDF"), false);
}

async function assertSignatureAccepted(file: File) {
  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      performanceScreenshot: file,
    }),
  );
  assert.notEqual(res.status, 400);
  assert.notEqual(res.status, 413);
  assert.notEqual(res.status, 429);
}

test("route: valid PNG + image/png passes signature validation", async () => {
  await assertSignatureAccepted(fileWith(PNG_BYTES, "shot.png", "image/png"));
});

test("route: valid JPEG + image/jpeg passes signature validation", async () => {
  await assertSignatureAccepted(fileWith(JPEG_BYTES, "shot.jpg", "image/jpeg"));
});

test("route: valid WEBP + image/webp passes signature validation", async () => {
  await assertSignatureAccepted(fileWith(webpBytes(), "shot.webp", "image/webp"));
});

test("route: valid PDF + application/pdf passes signature validation", async () => {
  await assertSignatureAccepted(fileWith(PDF_BYTES, "shot.pdf", "application/pdf"));
});

test("route: PNG bytes + image/jpeg is rejected", async () => {
  await assertUnsupported(fileWith(PNG_BYTES, "shot.jpg", "image/jpeg"));
});

test("route: JPEG bytes + image/png is rejected", async () => {
  await assertUnsupported(fileWith(JPEG_BYTES, "shot.png", "image/png"));
});

test("route: PDF bytes + image/png is rejected", async () => {
  await assertUnsupported(fileWith(PDF_BYTES, "shot.png", "image/png"));
});

test("route: random bytes + image/png is rejected", async () => {
  await assertUnsupported(fileWith(new Uint8Array(32).fill(7), "shot.png", "image/png"));
});

test("route: RIFF non-WEBP + image/webp is rejected", async () => {
  await assertUnsupported(fileWith(riffNotWebp(), "shot.webp", "image/webp"));
});

test("route: truncated signature is rejected", async () => {
  await assertUnsupported(fileWith(PNG_BYTES.slice(0, 4), "shot.png", "image/png"));
});

test("route: unsupported declared MIME is rejected before signature acceptance", async () => {
  await assertUnsupported(fileWith(PNG_BYTES, "shot.bin", "application/octet-stream"));
});

test("route: empty file is treated as no attachment", async () => {
  const empty = fileWith(new Uint8Array(), "empty.png", "image/png");
  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      performanceScreenshot: empty,
    }),
  );
  assert.notEqual(res.status, 400);
});

test("route: file over 5 MiB remains File too large", async () => {
  const tooBig = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.png", {
    type: "image/png",
  });
  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      performanceScreenshot: tooBig,
    }),
  );
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "File too large");
});

test("route: invalid Turnstile still fails before delivery", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      performanceScreenshot: fileWith(PNG_BYTES, "shot.png", "image/png"),
    }),
  );
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Verification failed. Please try again.");
});

test("route: honeypot returns silent 200 without Turnstile", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) siteverifyCalls += 1;
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await partnerPOST(
    partnerRequest({
      ...kolFields(),
      website_honeypot: "http://spam.test",
      performanceScreenshot: fileWith(PNG_BYTES, "shot.png", "image/png"),
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(siteverifyCalls, 0);
});

test("route: rate-limited upload returns 429 before file processing", async () => {
  let siteverifyCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) siteverifyCalls += 1;
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const ip = "203.0.113.91";
  for (let i = 0; i < RATE_LIMIT_POLICIES.partner.limit; i++) {
    await checkRateLimit({
      namespace: "partner",
      identifier: ip,
      ...RATE_LIMIT_POLICIES.partner,
    });
  }

  const res = await partnerPOST(
    partnerRequest(
      {
        ...kolFields(),
        performanceScreenshot: fileWith(PNG_BYTES, "shot.png", "image/png"),
      },
      ip,
    ),
  );
  assert.equal(res.status, 429);
  assert.equal(siteverifyCalls, 0);
});
