/**
 * Canonical origin for metadata, sitemap, robots, and Open Graph `og:url`.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://yoursite.com).
 * On Vercel, `VERCEL_URL` is used when `NEXT_PUBLIC_SITE_URL` is unset.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return "http://localhost:3000";
}
