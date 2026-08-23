import { NextResponse } from "next/server";

export const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const SITEVERIFY_TIMEOUT_MS = 3000;
const TOKEN_MAX_LEN = 8192;

const CONFIG_ERROR_CODES = new Set([
  "missing-input-secret",
  "invalid-input-secret",
  "internal-error",
]);

export type TurnstileDecision =
  | { status: "verified" }
  | { status: "rejected" }
  | { status: "unavailable" };

function readServerEnv(name: string): string | undefined {
  const env = typeof process === "undefined" ? undefined : process.env;
  if (!env) return undefined;
  const raw = env[name];
  if (typeof raw !== "string") return undefined;
  const normalized = raw
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "")
    .trim();
  return normalized.length > 0 ? normalized : undefined;
}

function readTurnstileSecret(): string | undefined {
  return readServerEnv("TURNSTILE_SECRET_KEY");
}

export function readTurnstileTokenField(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function verifyTurnstileToken(params: {
  token: string;
  remoteIp?: string;
}): Promise<TurnstileDecision> {
  const token = params.token.trim();
  if (!token || token.length > TOKEN_MAX_LEN) {
    return { status: "rejected" };
  }

  const secret = readTurnstileSecret();
  if (!secret) return { status: "unavailable" };

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  const ip = params.remoteIp?.trim();
  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  try {
    const res = await withTimeout(
      fetch(TURNSTILE_SITEVERIFY_URL, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      }),
      SITEVERIFY_TIMEOUT_MS,
    );

    if (!res.ok) return { status: "unavailable" };

    const data: unknown = await res.json();
    if (!data || typeof data !== "object") return { status: "unavailable" };

    const record = data as { success?: unknown; "error-codes"?: unknown };
    if (record.success === true) return { status: "verified" };

    const codes = Array.isArray(record["error-codes"])
      ? record["error-codes"].filter((code): code is string => typeof code === "string")
      : [];
    if (codes.some((code) => CONFIG_ERROR_CODES.has(code))) {
      return { status: "unavailable" };
    }
    return { status: "rejected" };
  } catch (error) {
    const errorClass = error instanceof Error ? error.name : "unknown";
    console.error("[turnstile] siteverify failed:", errorClass);
    return { status: "unavailable" };
  }
}

export function turnstileMissingResponse(): NextResponse {
  return NextResponse.json({ error: "Verification required" }, { status: 400 });
}

export function turnstileRejectedResponse(): NextResponse {
  return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
}

export function turnstileUnavailableResponse(): NextResponse {
  return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
}

export async function enforceTurnstile(
  tokenValue: unknown,
  remoteIp?: string,
): Promise<NextResponse | null> {
  const token = readTurnstileTokenField(tokenValue);
  if (!token) return turnstileMissingResponse();

  const decision = await verifyTurnstileToken({ token, remoteIp });
  if (decision.status === "unavailable") return turnstileUnavailableResponse();
  if (decision.status === "rejected") return turnstileRejectedResponse();
  return null;
}
