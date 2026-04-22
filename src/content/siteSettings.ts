/**
 * Non-translated site configuration (URLs, feature flags).
 * Prefer env vars in deployment; fallbacks keep local dev working.
 */

const read = (k: string, fallback: string) => {
  if (typeof process === "undefined") return fallback;
  const v = process.env[k]?.trim();
  return v && v.length > 0 ? v : fallback;
};

/**
 * If env points at a placeholder host (no real DNS), use same-site `/insights`
 * so the navbar never opens a dead URL.
 */
function normalizeInsightsUrl(raw: string): string {
  const fallback = "/insights";
  if (!raw.startsWith("http")) return raw;
  try {
    const host = new URL(raw).hostname.toLowerCase();
    if (
      host === "insights.sigma.example" ||
      host.endsWith(".sigma.example") ||
      host === "sigma.example"
    ) {
      return fallback;
    }
  } catch {
    return fallback;
  }
  return raw;
}

export const siteSettings = {
  /** Same-origin `/insights` by default; set `NEXT_PUBLIC_INSIGHTS_URL` for a real external blog */
  insightsUrl: normalizeInsightsUrl(read("NEXT_PUBLIC_INSIGHTS_URL", "/insights")),
  /** Default hero logo if locale omits override */
  defaultHeroLogoSrc: read(
    "NEXT_PUBLIC_HERO_LOGO_URL",
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  ),
} as const;
