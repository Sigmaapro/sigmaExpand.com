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

/** Verified company profiles for Organization JSON-LD `sameAs` (non-placeholder URLs only). */
export const organizationSameAs = [
  socials.linkedin,
  socials.x,
] as const;
