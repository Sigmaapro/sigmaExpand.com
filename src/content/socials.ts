// This file is safe to edit for content updates (no code knowledge needed)

import { socials, contactEmail, type SocialPlatformKey } from "./data/socials";

export type { SocialPlatformKey };

export type SocialLinks = Record<SocialPlatformKey, string>;

/** Backward-compatible alias used by existing components */
export const socialLinks: SocialLinks = socials;

/** Backward-compatible alias used by existing components */
export const socialContactEmail = contactEmail;
