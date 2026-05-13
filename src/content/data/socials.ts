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
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/",
  whatsapp: "https://www.whatsapp.com/",
  discord: "https://discord.com/",
  tiktok: "https://www.tiktok.com/",
} as const;

export const contactEmail = "partners@sigmaexpand.com";
