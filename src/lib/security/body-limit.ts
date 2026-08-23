import { NextResponse } from "next/server";

/** Total raw HTTP body cap for `POST /api/contact` (JSON). */
export const CONTACT_MAX_BODY_BYTES = 65_536;

/** Total raw HTTP body cap for `POST /api/partner` (multipart). */
export const PARTNER_MAX_BODY_BYTES = 6_291_456;

export type BodyLimitResult =
  | { status: "ok"; request: Request }
  | { status: "too-large" }
  | { status: "unreadable" };

/**
 * Parse `Content-Length` as a declared size, or `null` when missing/malformed.
 *
 * Malformed values are untrusted: callers must still count actual bytes.
 * Values larger than `Number.MAX_SAFE_INTEGER` are treated as an enormous
 * declared size so the early-reject path can fire.
 */
export function parseDeclaredContentLength(
  header: string | null,
): number | null {
  if (header === null) return null;
  const trimmed = header.trim();
  if (!/^\d+$/.test(trimmed)) return null;

  try {
    const declared = BigInt(trimmed);
    if (declared > BigInt(Number.MAX_SAFE_INTEGER)) {
      return Number.POSITIVE_INFINITY;
    }
    return Number(declared);
  } catch {
    return null;
  }
}

function concatChunks(chunks: Uint8Array[], totalBytes: number): Uint8Array {
  const out = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

function abandonBody(req: Request): void {
  try {
    void req.body?.cancel();
  } catch {
    /* already locked or disturbed */
  }
}

function toBodyInit(body: Uint8Array): BodyInit {
  const copy = new ArrayBuffer(body.byteLength);
  new Uint8Array(copy).set(body);
  return copy;
}

function rebuildRequest(source: Request, body: Uint8Array): Request {
  return new Request(source.url, {
    method: source.method,
    headers: source.headers,
    body: body.byteLength === 0 ? undefined : toBodyInit(body),
  });
}

export function payloadTooLargeResponse(): NextResponse {
  return NextResponse.json({ error: "Payload too large" }, { status: 413 });
}

/**
 * Cap the raw request body before `json()` / `formData()`.
 *
 * `Content-Length` is only an early-reject signal when it is a valid integer
 * greater than `maxBytes`. Missing or malformed headers still go through a
 * hard byte count on the Web Streams body.
 */
export async function enforceBodyLimit(
  req: Request,
  maxBytes: number,
): Promise<BodyLimitResult> {
  const declared = parseDeclaredContentLength(req.headers.get("content-length"));
  if (declared !== null && declared > maxBytes) {
    abandonBody(req);
    return { status: "too-large" };
  }

  if (!req.body) {
    return { status: "ok", request: rebuildRequest(req, new Uint8Array(0)) };
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value || value.byteLength === 0) continue;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { status: "too-large" };
      }
      chunks.push(value);
    }
  } catch {
    await reader.cancel().catch(() => undefined);
    return { status: "unreadable" };
  }

  return {
    status: "ok",
    request: rebuildRequest(req, concatChunks(chunks, totalBytes)),
  };
}
