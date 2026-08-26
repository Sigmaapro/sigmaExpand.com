import type { SupportedUploadMime } from "@/lib/security/file-signature";

const FALLBACK_BASENAME = "performance-proof";
const MAX_BASENAME_CODE_POINTS = 80;

const CANONICAL_EXTENSION: Record<SupportedUploadMime, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
};

const WINDOWS_RESERVED = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
]);

/** C0/C1, bidi/format isolates, zero-width, BOM, soft hyphen. */
const STRIP_CHARS =
  /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF\u00AD]/g;

const KEEP_CHAR = /[\p{L}\p{N}\p{M} _-]/u;

function canonicalExtension(detectedMime: SupportedUploadMime): string {
  return CANONICAL_EXTENSION[detectedMime];
}

function lastPathSegment(name: string): string {
  const unified = name.replace(/\\/g, "/");
  const parts = unified.split("/");
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i]) return parts[i];
  }
  return "";
}

function dropOriginalExtension(segment: string): string {
  const lastDot = segment.lastIndexOf(".");
  if (lastDot <= 0) return segment;
  const ext = segment.slice(lastDot + 1);
  if (!ext || ext.length > 15 || !/^[A-Za-z0-9]+$/.test(ext)) return segment;
  return segment.slice(0, lastDot);
}

function isReservedName(value: string): boolean {
  return WINDOWS_RESERVED.has(value.trim().toUpperCase());
}

function truncateCodePoints(value: string, max: number): string {
  const points = Array.from(value);
  if (points.length <= max) return value;
  return points.slice(0, max).join("");
}

function trimEdges(value: string): string {
  return value.replace(/^[-_\s.]+|[-_\s.]+$/g, "");
}

function isKeepableChar(char: string): boolean {
  return KEEP_CHAR.test(char);
}

/**
 * Build a safe Resend attachment filename from the client name and trusted MIME.
 * Never throws; always returns basename + canonical extension.
 */
export function sanitizeAttachmentFilename(
  rawName: string,
  detectedMime: SupportedUploadMime,
): string {
  const extension = canonicalExtension(detectedMime);
  const fallback = `${FALLBACK_BASENAME}${extension}`;

  const source = typeof rawName === "string" ? rawName.normalize("NFC") : "";
  const segment = lastPathSegment(source);
  const stemForReserved = dropOriginalExtension(segment);
  if (isReservedName(segment) || isReservedName(stemForReserved)) {
    return fallback;
  }

  const withoutExt = dropOriginalExtension(segment);
  const stripped = withoutExt.replace(STRIP_CHARS, "");
  const mapped = Array.from(stripped)
    .map((char) => {
      if (char === ".") return "-";
      return isKeepableChar(char) ? char : "-";
    })
    .join("");

  let basename = mapped
    .replace(/-{2,}/g, "-")
    .replace(/_{2,}/g, "_")
    .replace(/ {2,}/g, " ");
  basename = trimEdges(basename);

  if (!basename || basename === "." || basename === ".." || isReservedName(basename)) {
    return fallback;
  }

  basename = trimEdges(truncateCodePoints(basename, MAX_BASENAME_CODE_POINTS));
  if (!basename || isReservedName(basename)) {
    return fallback;
  }

  return `${basename}${extension}`;
}
