import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as contactPOST } from "@/app/api/contact/route";
import { POST as partnerPOST } from "@/app/api/partner/route";
import {
  getEmailTransportReady,
  resolveEmailFrom,
} from "@/lib/contact/server-send";
import {
  resetRateLimitClientForTests,
  setRateLimitStoreForTests,
  type RateLimitStore,
} from "@/lib/security/rate-limit";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

const FALLBACK = "Sigma <onboarding@resend.dev>";
const VALID_FROM = "Sigma <leads@sigmaa.pro>";

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

function clearSenderEnv() {
  delete process.env.EMAIL_FROM;
  delete process.env.FROM_EMAIL;
  delete process.env.VERCEL_ENV;
}

function setNodeEnv(value: string) {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
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

function contactRequest(body: Record<string, unknown>, ip = "203.0.113.60"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

function partnerRequest(ip = "203.0.113.61"): Request {
  const fd = new FormData();
  fd.set("intentType", "company");
  fd.set("fullName", "QA User");
  fd.set("companyName", "Example Co");
  fd.set("email", "qa@example.com");
  fd.set("description", "Partnership inquiry");
  fd.set("website_honeypot", "");
  fd.set("turnstileToken", "test-turnstile-token");
  return new Request("http://localhost/api/partner", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
    body: fd,
  });
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
  clearSenderEnv();
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

test("production: valid EMAIL_FROM is accepted", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = VALID_FROM;
  assert.equal(resolveEmailFrom(), VALID_FROM);
});

test("production: bare email EMAIL_FROM is accepted", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "leads@sigmaa.pro";
  assert.equal(resolveEmailFrom(), "leads@sigmaa.pro");
});

test("production: EMAIL_FROM missing + valid FROM_EMAIL is accepted", () => {
  process.env.VERCEL_ENV = "production";
  process.env.FROM_EMAIL = VALID_FROM;
  assert.equal(resolveEmailFrom(), VALID_FROM);
});

test("production: EMAIL_FROM wins over FROM_EMAIL", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = VALID_FROM;
  process.env.FROM_EMAIL = "Sigma <other@sigmaa.pro>";
  assert.equal(resolveEmailFrom(), VALID_FROM);
});

test("production: both missing is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  assert.equal(resolveEmailFrom(), null);
});

test("production: whitespace-only is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "   ";
  process.env.FROM_EMAIL = "\t";
  assert.equal(resolveEmailFrom(), null);
});

test("production: invalid email is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "not-an-email";
  assert.equal(resolveEmailFrom(), null);
});

test("production: empty angle-bracket sender is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "Sigma <>";
  assert.equal(resolveEmailFrom(), null);
});

test("production: Sigma <onboarding@resend.dev> is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "Sigma <onboarding@resend.dev>";
  assert.equal(resolveEmailFrom(), null);
});

test("production: onboarding@resend.dev is unavailable", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "onboarding@resend.dev";
  assert.equal(resolveEmailFrom(), null);
});

test("production: onboarding sender comparison is case-insensitive", () => {
  process.env.VERCEL_ENV = "production";
  process.env.EMAIL_FROM = "Sigma <Onboarding@Resend.DEV>";
  assert.equal(resolveEmailFrom(), null);
});

test("production: NODE_ENV=production does not by itself enable enforcement", () => {
  setNodeEnv("production");
  delete process.env.VERCEL_ENV;
  assert.equal(resolveEmailFrom(), FALLBACK);
});

test("non-production: missing both uses fallback", () => {
  assert.equal(resolveEmailFrom(), FALLBACK);
});

test("non-production: preview missing sender uses fallback", () => {
  process.env.VERCEL_ENV = "preview";
  assert.equal(resolveEmailFrom(), FALLBACK);
});

test("non-production: development missing sender uses fallback", () => {
  process.env.VERCEL_ENV = "development";
  assert.equal(resolveEmailFrom(), FALLBACK);
});

test("non-production: local/test env missing sender uses fallback", () => {
  delete process.env.VERCEL;
  delete process.env.VERCEL_ENV;
  setNodeEnv("test");
  assert.equal(resolveEmailFrom(), FALLBACK);
});

test("getEmailTransportReady requires a production sender", () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "BD@sigmaa.pro";
  assert.equal(getEmailTransportReady(), false);
  process.env.EMAIL_FROM = VALID_FROM;
  assert.equal(getEmailTransportReady(), true);
});

test("getEmailTransportReady still works with non-production fallback", () => {
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "BD@sigmaa.pro";
  assert.equal(getEmailTransportReady(), true);
});

test("contact: production invalid sender + no Telegram => 503", async () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "BD@sigmaa.pro";
  let resendCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) resendCalls += 1;
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await contactPOST(contactRequest(validContactBody()));
  assert.equal(res.status, 503);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Lead capture is not configured");
  assert.equal(resendCalls, 0);
});

test("contact: production invalid sender + Telegram ready => Telegram-only, no Resend", async () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "BD@sigmaa.pro";
  process.env.TELEGRAM_BOT_TOKEN = "123:abc";
  process.env.TELEGRAM_CHAT_ID = "100";
  let resendCalls = 0;
  let telegramCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) {
      resendCalls += 1;
      throw new Error("resend should not be called");
    }
    if (url.includes("api.telegram.org")) {
      telegramCalls += 1;
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await contactPOST(contactRequest(validContactBody()));
  assert.equal(res.status, 200);
  const json = (await res.json()) as { ok?: boolean; partial?: boolean };
  assert.equal(json.ok, true);
  assert.equal(json.partial, undefined);
  assert.equal(resendCalls, 0);
  assert.equal(telegramCalls, 1);
});

test("contact: production valid sender => Resend receives that exact From", async () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_EMAIL = "BD@sigmaa.pro";
  process.env.EMAIL_FROM = VALID_FROM;
  let capturedFrom: string | undefined;
  globalThis.fetch = (async (input, init) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.includes("api.resend.com/emails")) {
      const body = JSON.parse(String(init && "body" in init ? init.body : "{}")) as {
        from?: string;
      };
      capturedFrom = body.from;
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await contactPOST(contactRequest(validContactBody()));
  assert.equal(res.status, 200);
  assert.equal(capturedFrom, VALID_FROM);
});

test("partner: production invalid sender => 503, no Resend", async () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  let resendCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("api.resend.com")) resendCalls += 1;
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await partnerPOST(partnerRequest());
  assert.equal(res.status, 503);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Lead capture is not configured");
  assert.equal(resendCalls, 0);
});

test("partner: production valid sender => Resend receives exact From", async () => {
  process.env.VERCEL_ENV = "production";
  process.env.RESEND_API_KEY = "re_test";
  process.env.EMAIL_FROM = VALID_FROM;
  let capturedFrom: string | undefined;
  globalThis.fetch = (async (input, init) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile/v0/siteverify")) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.includes("api.resend.com/emails")) {
      const body = JSON.parse(String(init && "body" in init ? init.body : "{}")) as {
        from?: string;
        to?: string[];
      };
      capturedFrom = body.from;
      assert.equal(body.to?.[0], "BD@sigmaa.pro");
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const res = await partnerPOST(partnerRequest());
  assert.equal(res.status, 200);
  assert.equal(capturedFrom, VALID_FROM);
});
