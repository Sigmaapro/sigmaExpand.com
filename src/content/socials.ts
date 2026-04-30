export type SocialPlatformKey =
  | "x"
  | "instagram"
  | "telegram"
  | "linkedin"
  | "youtube"
  | "whatsapp"
  | "discord"
  | "tiktok";

export type SocialLinks = Record<SocialPlatformKey, string>;

/**
 * Centralized social media config.
 * Fill each URL to enable the platform card.
 */
export const socialLinks: SocialLinks = {
  x: "",
  instagram: "",
  telegram: "",
  linkedin: "",
  youtube: "",
  whatsapp: "",
  discord: "",
  tiktok: "",
};

export const socialContactEmail = "contact@sigma.com";
