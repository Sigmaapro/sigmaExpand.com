import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const RATE_LIMIT_POLICIES = {
  contact: { limit: 5, windowMs: 10 * 60 * 1000 },
  partner: { limit: 3, windowMs: 15 * 60 * 1000 },
} as const;

export type RateLimitNamespace = keyof typeof RATE_LIMIT_POLICIES;

export type RateLimitIncrementResult = {
  count: number;
  resetAtMs: number;
};

export type RateLimitStore = {
  increment(key: string, windowMs: number): Promise<RateLimitIncrementResult>;
};

export type RateLimitDecision = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAtMs: number;
  retryAfterSec: number;
  status: "ok" | "limited" | "unavailable";
};

const REDIS_EVAL_TIMEOUT_MS = 2000;
const IDENTIFIER_MAX_LEN = 128;

/**
 * Atomic INCR + PEXPIRE on first hit, then PTTL.
 * Avoids orphaned keys without TTL if the process dies between two commands.
 */
const INCR_WINDOW_LUA = `
local n = redis.call("INCR", KEYS[1])
if n == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
return {n, ttl}
`;

let redisClient: Redis | null | undefined;
let storeOverride: RateLimitStore | undefined;

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

export function getUpstashRestConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();
  if (!url || !token) return null;
  if (!/^https:\/\//i.test(url)) return null;
  return { url, token };
}

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const config = getUpstashRestConfig();
  if (!config) {
    redisClient = null;
    return null;
  }
  redisClient = new Redis({ url: config.url, token: config.token });
  return redisClient;
}

function firstForwardedValue(headerValue: string | null): string | null {
  if (!headerValue) return null;
  const first = headerValue.split(",")[0]?.trim() ?? "";
  if (!first || first.length > IDENTIFIER_MAX_LEN) return null;
  if (/[\r\n]/.test(first)) return null;
  return first;
}

/**
 * Client identifier for Vercel.
 * Trust forwarded IP headers only when the Vercel platform set them (`VERCEL=1`).
 * Do not trust caller-supplied X-Forwarded-For on local / unknown proxies.
 */
export function getClientIdentifier(req: Request): string {
  if (process.env.VERCEL === "1") {
    const vercelForwarded = firstForwardedValue(req.headers.get("x-vercel-forwarded-for"));
    if (vercelForwarded) return vercelForwarded;
    const forwarded = firstForwardedValue(req.headers.get("x-forwarded-for"));
    if (forwarded) return forwarded;
  }
  return "unknown";
}

function hashIdentifier(identifier: string): string {
  return createHash("sha256").update(`sigma-rl:${identifier}`).digest("hex");
}

export function rateLimitKey(namespace: RateLimitNamespace, identifier: string): string {
  return `sigma:ratelimit:${namespace}:${hashIdentifier(identifier)}`;
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

function parseEvalPair(raw: unknown): { count: number; ttlMs: number } {
  if (!Array.isArray(raw) || raw.length < 2) {
    throw new Error("invalid result");
  }
  const count = Number(raw[0]);
  const ttlMs = Number(raw[1]);
  if (!Number.isFinite(count) || !Number.isFinite(ttlMs)) {
    throw new Error("invalid result");
  }
  return { count, ttlMs };
}

function createUpstashStore(redis: Redis): RateLimitStore {
  return {
    async increment(key, windowMs) {
      const raw = await withTimeout(
        redis.eval(INCR_WINDOW_LUA, [key], [String(windowMs)]),
        REDIS_EVAL_TIMEOUT_MS,
      );
      const { count, ttlMs } = parseEvalPair(raw);
      const effectiveTtl = ttlMs > 0 ? ttlMs : windowMs;
      return { count, resetAtMs: Date.now() + effectiveTtl };
    },
  };
}

function getStore(): RateLimitStore | null {
  if (storeOverride) return storeOverride;
  const redis = getRedis();
  if (!redis) return null;
  return createUpstashStore(redis);
}

/**
 * Test-only store injection. Refused in production so a Map can never become
 * the live limiter.
 */
export function setRateLimitStoreForTests(store: RateLimitStore | undefined): void {
  if (store && isProductionRuntime()) {
    throw new Error("rate-limit test store is not available");
  }
  storeOverride = store;
  redisClient = undefined;
}

export function resetRateLimitClientForTests(): void {
  if (isProductionRuntime()) return;
  redisClient = undefined;
}

export async function checkRateLimit(params: {
  namespace: RateLimitNamespace;
  identifier: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitDecision> {
  const { namespace, identifier, limit, windowMs } = params;
  const store = getStore();
  if (!store) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAtMs: Date.now() + windowMs,
      retryAfterSec: Math.ceil(windowMs / 1000),
      status: "unavailable",
    };
  }

  try {
    const { count, resetAtMs } = await store.increment(
      rateLimitKey(namespace, identifier),
      windowMs,
    );
    const retryAfterSec = Math.max(1, Math.ceil((resetAtMs - Date.now()) / 1000));
    if (count > limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetAtMs,
        retryAfterSec,
        status: "limited",
      };
    }
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - count),
      resetAtMs,
      retryAfterSec,
      status: "ok",
    };
  } catch {
    console.error("[rate-limit] limiter unavailable");
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAtMs: Date.now() + windowMs,
      retryAfterSec: Math.ceil(windowMs / 1000),
      status: "unavailable",
    };
  }
}

function rateLimitHeaders(decision: RateLimitDecision): HeadersInit {
  return {
    "Retry-After": String(decision.retryAfterSec),
    "X-RateLimit-Limit": String(decision.limit),
    "X-RateLimit-Remaining": String(Math.max(0, decision.remaining)),
    "X-RateLimit-Reset": String(Math.ceil(decision.resetAtMs / 1000)),
  };
}

export function rateLimitedResponse(decision: RateLimitDecision): NextResponse {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: rateLimitHeaders(decision) },
  );
}

export function limiterUnavailableResponse(): NextResponse {
  return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
}

export async function enforceRateLimit(
  req: Request,
  namespace: RateLimitNamespace,
): Promise<NextResponse | null> {
  const policy = RATE_LIMIT_POLICIES[namespace];
  const decision = await checkRateLimit({
    namespace,
    identifier: getClientIdentifier(req),
    limit: policy.limit,
    windowMs: policy.windowMs,
  });

  if (decision.status === "unavailable") {
    return limiterUnavailableResponse();
  }
  if (!decision.allowed) {
    return rateLimitedResponse(decision);
  }
  return null;
}
