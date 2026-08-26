import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST as partnerPOST } from "@/app/api/partner/route";
import { sanitizeAttachmentFilename } from "@/lib/security/attachment-filename";
import type { SupportedUploadMime } from "@/lib/security/file-signature";
import {
  resetRateLimitClientForTests,
  setRateLimitStoreForTests,
  type RateLimitStore,
} from "@/lib/security/rate-limit";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);

const BIDI_RE = /[\u202A-\u202E\u2066-\u2069]/;
const ZW_RE = /[\u200B\u200C\u200D\uFEFF]/;
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\t\r\n]/;

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

function extFor(mime: SupportedUploadMime): string {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "application/pdf":
      return ".pdf";
  }
}

function assertSafeFilename(name: string, mime: SupportedUploadMime) {
  const ext = extFor(mime);
  assert.equal(name.includes("/"), false, name);
  assert.equal(name.includes("\\"), false, name);
  assert.equal(CONTROL_RE.test(name), false, name);
  assert.equal(BIDI_RE.test(name), false, name);
  assert.equal(ZW_RE.test(name), false, name);
  assert.equal(name.endsWith(ext), true, name);
  const basename = name.slice(0, -ext.length);
  assert.ok(Array.from(basename).length <= 80, name);
  assert.ok(basename.length > 0, name);
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

test("normal: proof.png", () => {
  const name = sanitizeAttachmentFilename("proof.png", "image/png");
  assert.equal(name, "proof.png");
  assertSafeFilename(name, "image/png");
});

test("normal: performance report.pdf preserves a single space", () => {
  const name = sanitizeAttachmentFilename("performance report.pdf", "application/pdf");
  assert.equal(name, "performance report.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("normal: screenshot-2026.webp", () => {
  const name = sanitizeAttachmentFilename("screenshot-2026.webp", "image/webp");
  assert.equal(name, "screenshot-2026.webp");
  assertSafeFilename(name, "image/webp");
});

test("normal: evidence.JPG uses canonical .jpg", () => {
  const name = sanitizeAttachmentFilename("evidence.JPG", "image/jpeg");
  assert.equal(name, "evidence.jpg");
  assertSafeFilename(name, "image/jpeg");
});

test("traversal: ../../proof.png", () => {
  const name = sanitizeAttachmentFilename("../../proof.png", "image/png");
  assert.equal(name, "proof.png");
  assertSafeFilename(name, "image/png");
});

test("traversal: ..\\..\\proof.pdf", () => {
  const name = sanitizeAttachmentFilename("..\\..\\proof.pdf", "application/pdf");
  assert.equal(name, "proof.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("traversal: /etc/passwd + pdf", () => {
  const name = sanitizeAttachmentFilename("/etc/passwd", "application/pdf");
  assert.equal(name, "passwd.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("control: CR/LF/TAB/NUL are stripped", () => {
  const name = sanitizeAttachmentFilename("invo\r\nice\tname\0.pdf", "application/pdf");
  assert.equal(name.includes("\r"), false);
  assert.equal(name.includes("\n"), false);
  assert.equal(name.includes("\t"), false);
  assert.equal(name.includes("\0"), false);
  assert.equal(name, "invoicename.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("extensions: proof.exe.pdf keeps inner tokens and canonical .pdf", () => {
  const name = sanitizeAttachmentFilename("proof.exe.pdf", "application/pdf");
  assert.equal(name, "proof-exe.pdf");
  assert.equal(name.endsWith(".exe"), false);
  assertSafeFilename(name, "application/pdf");
});

test("extensions: proof.pdf.exe does not keep .exe", () => {
  const name = sanitizeAttachmentFilename("proof.pdf.exe", "application/pdf");
  assert.equal(name, "proof-pdf.pdf");
  assert.equal(name.endsWith(".exe"), false);
  assertSafeFilename(name, "application/pdf");
});

test("extensions: proof.jpg.php", () => {
  const name = sanitizeAttachmentFilename("proof.jpg.php", "image/jpeg");
  assert.equal(name, "proof-jpg.jpg");
  assertSafeFilename(name, "image/jpeg");
});

test("extensions: proof without extension", () => {
  const name = sanitizeAttachmentFilename("proof", "image/png");
  assert.equal(name, "proof.png");
  assertSafeFilename(name, "image/png");
});

test("extensions: many dots", () => {
  const name = sanitizeAttachmentFilename("a.b.c.d.png", "image/png");
  assert.equal(name, "a-b-c-d.png");
  assertSafeFilename(name, "image/png");
});

test("unicode: Persian filename is preserved", () => {
  const name = sanitizeAttachmentFilename("گزارش-عملکرد.png", "image/png");
  assert.equal(name, "گزارش-عملکرد.png");
  assertSafeFilename(name, "image/png");
});

test("unicode: Arabic filename is preserved", () => {
  const name = sanitizeAttachmentFilename("دليل.pdf", "application/pdf");
  assert.equal(name, "دليل.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("unicode: emoji is normalized away", () => {
  const name = sanitizeAttachmentFilename("🎉proof.png", "image/png");
  assert.equal(name, "proof.png");
  assertSafeFilename(name, "image/png");
});

test("unicode: bidi override is stripped", () => {
  const raw = `invoice\u202Efdp.exe`;
  const name = sanitizeAttachmentFilename(raw, "application/pdf");
  assert.equal(BIDI_RE.test(name), false);
  assert.equal(name.endsWith(".pdf"), true);
  assert.equal(name.endsWith(".exe"), false);
  assertSafeFilename(name, "application/pdf");
});

test("unicode: zero-width characters are stripped", () => {
  const name = sanitizeAttachmentFilename("pro\u200Bof\u200D.png", "image/png");
  assert.equal(name, "proof.png");
  assertSafeFilename(name, "image/png");
});

test("special: . and .. fall back", () => {
  assert.equal(sanitizeAttachmentFilename(".", "image/png"), "performance-proof.png");
  assert.equal(sanitizeAttachmentFilename("..", "application/pdf"), "performance-proof.pdf");
});

test("special: .hidden strips the leading dot", () => {
  const name = sanitizeAttachmentFilename(".hidden.pdf", "application/pdf");
  assert.equal(name, "hidden.pdf");
  assertSafeFilename(name, "application/pdf");
});

test("special: Windows reserved names fall back", () => {
  const reserved = ["CON", "PRN", "AUX", "NUL", "COM1", "COM9", "LPT1", "LPT9", "con.png", "nul.pdf"];
  for (const raw of reserved) {
    const mime: SupportedUploadMime = raw.toLowerCase().includes("png") ? "image/png" : "application/pdf";
    const name = sanitizeAttachmentFilename(raw, mime);
    assert.equal(name, `performance-proof${extFor(mime)}`, raw);
    assertSafeFilename(name, mime);
  }
});

test("special: trailing dot and spaces", () => {
  assert.equal(sanitizeAttachmentFilename("proof. ", "image/png"), "proof.png");
  assert.equal(sanitizeAttachmentFilename("proof...", "image/jpeg"), "proof.jpg");
});

test("special: empty filename falls back", () => {
  assert.equal(sanitizeAttachmentFilename("", "image/webp"), "performance-proof.webp");
});

test("special: 500-character filename is truncated to 80 code points", () => {
  const raw = `${"ن".repeat(500)}.png`;
  const name = sanitizeAttachmentFilename(raw, "image/png");
  const basename = name.slice(0, -".png".length);
  assert.equal(Array.from(basename).length, 80);
  assert.equal(name.endsWith(".png"), true);
  assertSafeFilename(name, "image/png");
});

test("repeated separators collapse", () => {
  assert.equal(sanitizeAttachmentFilename("my----file.png", "image/png"), "my-file.png");
  assert.equal(sanitizeAttachmentFilename("my____file.png", "image/png"), "my_file.png");
  assert.equal(sanitizeAttachmentFilename("my     file.png", "image/png"), "my file.png");
});

test("route: traversal + bidi filename is normalized on a valid PDF upload", async () => {
  process.env.RESEND_API_KEY = "re_test";
  let capturedFilename: string | undefined;
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
        attachments?: { filename?: string }[];
        html?: string;
      };
      capturedFilename = body.attachments?.[0]?.filename;
      assert.equal(body.html?.includes(capturedFilename ?? ""), true);
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;

  const copy = new ArrayBuffer(PDF_BYTES.byteLength);
  new Uint8Array(copy).set(PDF_BYTES);
  const file = new File([copy], `../../invoice\u202Efdp.exe`, { type: "application/pdf" });
  const fd = new FormData();
  fd.set("intentType", "kol");
  fd.set("fullName", "QA User");
  fd.set("email", "qa@example.com");
  fd.set("description", "Bio");
  fd.append("roles", "KOL");
  fd.set("website_honeypot", "");
  fd.set("turnstileToken", "test-turnstile-token");
  fd.set("performanceScreenshot", file);

  const res = await partnerPOST(
    new Request("http://localhost/api/partner", {
      method: "POST",
      headers: { "x-forwarded-for": "203.0.113.20" },
      body: fd,
    }),
  );
  assert.equal(res.status, 200);
  assert.ok(capturedFilename);
  assert.equal(capturedFilename.includes(".."), false);
  assert.equal(capturedFilename.includes("/"), false);
  assert.equal(capturedFilename.includes("\\"), false);
  assert.equal(BIDI_RE.test(capturedFilename), false);
  assert.equal(capturedFilename.endsWith(".pdf"), true);
  assert.equal(capturedFilename.endsWith(".exe"), false);
});
