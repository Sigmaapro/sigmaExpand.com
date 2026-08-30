import type { SupportedUploadMime } from "@/lib/security/file-signature";

export const PROFILE_IMAGE_MAX_BYTES = 4 * 1024 * 1024;
export const PROFILE_DOCUMENT_MAX_BYTES = 8 * 1024 * 1024;

export const PROFILE_IMAGE_ACCEPT = "image/png,image/jpeg,image/webp";
export const PROFILE_DOCUMENT_ACCEPT = "image/png,image/jpeg,image/webp,application/pdf";

const IMAGE_MIMES = new Set<SupportedUploadMime>([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const DOCUMENT_MIMES = new Set<SupportedUploadMime>([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
]);

export type ClientFileValidation =
  | { ok: true; mime: string }
  | { ok: false; error: string };

function extensionHint(name: string): string {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return "";
  return name.slice(dot).toLowerCase();
}

function guessMime(file: File): string {
  if (file.type) return file.type;
  const ext = extensionHint(file.name);
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".pdf") return "application/pdf";
  return "";
}

function formatMb(bytes: number): string {
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10} MB`;
}

export function validateProfileImageFile(file: File): ClientFileValidation {
  const mime = guessMime(file);
  if (!IMAGE_MIMES.has(mime as SupportedUploadMime)) {
    return { ok: false, error: "Use a PNG, JPG, or WebP image." };
  }
  if (file.size > PROFILE_IMAGE_MAX_BYTES) {
    return {
      ok: false,
      error: `Image must be ${formatMb(PROFILE_IMAGE_MAX_BYTES)} or smaller.`,
    };
  }
  return { ok: true, mime };
}

export function validateProfileDocumentFile(file: File): ClientFileValidation {
  const mime = guessMime(file);
  if (!DOCUMENT_MIMES.has(mime as SupportedUploadMime)) {
    return { ok: false, error: "Use a PNG, JPG, WebP, or PDF file." };
  }
  if (file.size > PROFILE_DOCUMENT_MAX_BYTES) {
    return {
      ok: false,
      error: `File must be ${formatMb(PROFILE_DOCUMENT_MAX_BYTES)} or smaller.`,
    };
  }
  return { ok: true, mime };
}

/**
 * TODO(storage): Replace with signed upload to object storage.
 * Do not persist file bytes (including base64) in application state.
 */
export function createLocalPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeLocalPreviewUrl(url: string | undefined): void {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}
