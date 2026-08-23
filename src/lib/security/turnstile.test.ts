import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import {
  TURNSTILE_SITEVERIFY_URL,
  enforceTurnstile,
  readTurnstileTokenField,
  verifyTurnstileToken,
} from "@/lib/security/turnstile";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

beforeEach(() => {
  delete process.env.TURNSTILE_SECRET_KEY;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

test("readTurnstileTokenField trims and rejects non-strings", () => {
  assert.equal(readTurnstileTokenField("  token  "), "token");
  assert.equal(readTurnstileTokenField(""), "");
  assert.equal(readTurnstileTokenField(null), "");
  assert.equal(readTurnstileTokenField(1), "");
});

test("verifyTurnstileToken fails closed when secret is missing", async () => {
  let called = 0;
  globalThis.fetch = (async () => {
    called += 1;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  const decision = await verifyTurnstileToken({ token: "ok-token" });
  assert.equal(decision.status, "unavailable");
  assert.equal(called, 0);
});

test("verifyTurnstileToken verifies a successful Cloudflare response", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  let called = 0;
  globalThis.fetch = (async (input) => {
    assert.equal(String(input), TURNSTILE_SITEVERIFY_URL);
    called += 1;
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const decision = await verifyTurnstileToken({ token: "ok-token" });
  assert.equal(decision.status, "verified");
  assert.equal(called, 1);
});

test("verifyTurnstileToken rejects invalid tokens", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const decision = await verifyTurnstileToken({ token: "bad-token" });
  assert.equal(decision.status, "rejected");
});

test("verifyTurnstileToken fails closed on network/timeout errors", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  globalThis.fetch = (async () => {
    throw new Error("timeout");
  }) as typeof fetch;

  const decision = await verifyTurnstileToken({ token: "ok-token" });
  assert.equal(decision.status, "unavailable");
});

test("enforceTurnstile returns 400 when token is missing", async () => {
  const res = await enforceTurnstile("   ");
  assert.ok(res);
  assert.equal(res.status, 400);
  const json = (await res.json()) as { error?: string };
  assert.equal(json.error, "Verification required");
});

test("enforceTurnstile returns 400 when Cloudflare rejects the token", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ success: false, "error-codes": ["timeout-or-duplicate"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const res = await enforceTurnstile("used-token");
  assert.ok(res);
  assert.equal(res.status, 400);
});

test("enforceTurnstile returns 503 when verification is unavailable", async () => {
  const res = await enforceTurnstile("ok-token");
  assert.ok(res);
  assert.equal(res.status, 503);
});

test("enforceTurnstile returns null when verified", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const res = await enforceTurnstile("ok-token", "203.0.113.9");
  assert.equal(res, null);
});
