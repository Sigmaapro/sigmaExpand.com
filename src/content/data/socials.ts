// This file is safe to edit for content updates (no code knowledge needed)

export type SocialPlatformKey =
  | "x"
  | "instagram"
  | "telegram"
  | "linkedin"
  | "youtube"
  | "whatsapp"
  | "discord"
  | "tiktok";

export const socials = {
  x: "https://x.com/sigmaapro",
  instagram: "https://www.instagram.com/",
  telegram: "https://telegram.org/",
  linkedin: "https://www.linkedin.com/company/sigmaapro",
  youtube: "https://www.youtube.com/",
  whatsapp: "https://www.whatsapp.com/",
  discord: "https://discord.com/",
  tiktok: "https://www.tiktok.com/",
} as const;

export const contactEmail = "BD@sigmaa.pro";

/** Platform homepages with no Sigma handle — not real public profiles. */
const GENERIC_PLATFORM_HOMEPAGES = new Set([
  "https://www.instagram.com/",
  "https://instagram.com/",
  "https://telegram.org/",
  "https://www.telegram.org/",
  "https://www.youtube.com/",
  "https://youtube.com/",
  "https://www.whatsapp.com/",
  "https://whatsapp.com/",
  "https://discord.com/",
  "https://www.discord.com/",
  "https://www.tiktok.com/",
  "https://tiktok.com/",
]);

export function isConfiguredSocialHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  const withSlash = trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
  return !GENERIC_PLATFORM_HOMEPAGES.has(trimmed) && !GENERIC_PLATFORM_HOMEPAGES.has(withSlash);
}

/** Public social profiles that have a real Sigma destination (not a platform homepage). */
export function getConfiguredSocials(): readonly { key: SocialPlatformKey; href: string }[] {
  return (Object.keys(socials) as SocialPlatformKey[])
    .filter((key) => isConfiguredSocialHref(socials[key]))
    .map((key) => ({ key, href: socials[key] }));
}

/** Verified company profiles for Organization JSON-LD `sameAs` (non-placeholder URLs only). */
export const organizationSameAs = [
  socials.linkedin,
  socials.x,
] as const;
