/**
 * Canonical site origin for metadataBase, canonical URLs, sitemap, robots, and OG `url`.
 *
 * Never uses `VERCEL_URL` (preview/deployment host must not become the canonical origin).
 *
 * **NEXT_PUBLIC_SITE_URL** is the primary override when it points to your real public site.
 * If it is set to another `*.vercel.app` host that is not the production project alias, it is
 * ignored so preview deployments do not poison canonicals.
 */

export const PRODUCTION_SITE_ORIGIN = "https://sigma-expand-com.vercel.app";

const PRODUCTION_HOSTNAME = new URL(PRODUCTION_SITE_ORIGIN).hostname.toLowerCase();

function normalizeExplicitSiteUrl(raw: string): string {
  const t = raw.trim().replace(/\/$/, "");
  if (!t) return "";
  const withProto = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  return withProto.replace(/\/$/, "");
}

function hostnameFromOrigin(origin: string): string | null {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Any `*.vercel.app` hostname except the production alias is treated as a preview deployment URL.
 * Custom domains (non-vercel) are always accepted.
 */
function isIgnoredVercelDeploymentHostname(hostname: string): boolean {
  return hostname.endsWith(".vercel.app") && hostname !== PRODUCTION_HOSTNAME;
}

/**
 * Single source for metadataBase and absolute canonical URLs.
 *
 * Order:
 * 1. `NEXT_PUBLIC_SITE_URL` when set and not a non-production `*.vercel.app` deployment URL.
 * 2. **Development:** `http://localhost:3000` when `NODE_ENV === "development"`.
 * 3. **Production fallback:** `{@link PRODUCTION_SITE_ORIGIN}` (never `VERCEL_URL`).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const normalized = normalizeExplicitSiteUrl(raw);
    const host = hostnameFromOrigin(normalized);
    if (host && isIgnoredVercelDeploymentHostname(host)) {
      if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
      }
      return PRODUCTION_SITE_ORIGIN;
    }
    if (normalized) return normalized;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_SITE_ORIGIN;
}
