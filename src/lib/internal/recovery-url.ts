/**
 * Parse recovery/invite parameters from a URL.
 * Never log the returned tokens.
 */
export type RecoveryUrlPayload =
  | { kind: "code"; code: string; type: string | null }
  | { kind: "token_hash"; tokenHash: string; type: "recovery" | "invite" }
  | { kind: "implicit"; accessToken: string; refreshToken: string }
  | { kind: "error" };

export function parseRecoveryUrl(href: string): RecoveryUrlPayload | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const query = url.searchParams;
  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));

  if (query.has("error") || hash.has("error") || hash.has("error_code")) {
    const looksLikeAuthError =
      query.get("type") === "recovery" ||
      hash.get("type") === "recovery" ||
      hash.has("access_token") ||
      hash.has("error_code");
    return looksLikeAuthError ? { kind: "error" } : null;
  }

  const code = query.get("code");
  if (code) {
    return { kind: "code", code, type: query.get("type") };
  }

  const tokenHash = query.get("token_hash");
  const otpType = query.get("type");
  if (tokenHash && (otpType === "recovery" || otpType === "invite")) {
    return { kind: "token_hash", tokenHash, type: otpType };
  }

  const hashType = hash.get("type");
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");
  if (hashType === "recovery" && accessToken && refreshToken) {
    return { kind: "implicit", accessToken, refreshToken };
  }

  return null;
}
