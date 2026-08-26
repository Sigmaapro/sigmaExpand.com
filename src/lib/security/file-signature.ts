export type SupportedUploadMime =
  | "image/png"
  | "image/jpeg"
  | "image/webp"
  | "application/pdf";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff] as const;
const RIFF_SIGNATURE = [0x52, 0x49, 0x46, 0x46] as const;
const WEBP_FOURCC = [0x57, 0x45, 0x42, 0x50] as const;
const PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;

function hasPrefix(data: Uint8Array, prefix: readonly number[], offset = 0): boolean {
  if (data.byteLength < offset + prefix.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (data[offset + i] !== prefix[i]) return false;
  }
  return true;
}

/**
 * Detect a supported upload type from file bytes.
 * Returns null for empty, truncated, unknown, or unsupported data.
 * Does not inspect filename, extension, or client MIME.
 */
export function detectSupportedFileMime(data: Uint8Array): SupportedUploadMime | null {
  if (data.byteLength === 0) return null;

  if (hasPrefix(data, PNG_SIGNATURE)) return "image/png";
  if (hasPrefix(data, JPEG_SIGNATURE)) return "image/jpeg";
  if (
    data.byteLength >= 12 &&
    hasPrefix(data, RIFF_SIGNATURE) &&
    hasPrefix(data, WEBP_FOURCC, 8)
  ) {
    return "image/webp";
  }
  if (hasPrefix(data, PDF_SIGNATURE)) return "application/pdf";

  return null;
}
