import type { EditableProfile } from "@/lib/internal/types";

export type ProfileUpdatePayload = {
  full_name: string | null;
  role: string | null;
  short_bio: string | null;
  bio: string | null;
  languages: string[];
  expertise: string[];
  location_city: string | null;
  location_country: string | null;
  location_country_code: string | null;
  linkedin_url: string | null;
  x_url: string | null;
  instagram_url: string | null;
  telegram_url: string | null;
  website_url: string | null;
  email: string | null;
  quote: string | null;
  other_socials: Array<{ label: string; href: string }>;
};

function emptyToNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const items: string[] = [];
  for (const entry of value) {
    if (typeof entry !== "string") continue;
    const trimmed = entry.trim();
    if (trimmed) items.push(trimmed);
  }
  return items;
}

function normalizeOtherSocials(value: unknown): Array<{ label: string; href: string }> {
  if (!Array.isArray(value)) return [];
  const links: Array<{ label: string; href: string }> = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const label = typeof record.label === "string" ? record.label.trim() : "";
    const href = typeof record.href === "string" ? record.href.trim() : "";
    if (!label || !href) continue;
    links.push({ label, href });
  }
  return links;
}

/**
 * Allowlisted UPDATE payload. Never includes id, user_id, slug,
 * profile_status, or profile_image_url.
 */
export function editableProfileToUpdatePayload(edited: EditableProfile): ProfileUpdatePayload {
  const fullName =
    emptyToNull(edited.displayName) ??
    emptyToNull(`${edited.firstName} ${edited.lastName}`) ??
    null;

  return {
    full_name: fullName,
    role: emptyToNull(edited.role),
    short_bio: emptyToNull(edited.shortBio),
    bio: emptyToNull(edited.fullBio),
    languages: normalizeList(edited.languages),
    expertise: normalizeList(edited.expertise),
    location_city: emptyToNull(edited.locationCity),
    location_country: emptyToNull(edited.locationCountry),
    location_country_code: emptyToNull(edited.locationCountryCode),
    linkedin_url: emptyToNull(edited.linkedin),
    x_url: emptyToNull(edited.x),
    instagram_url: emptyToNull(edited.instagram),
    telegram_url: emptyToNull(edited.telegram),
    website_url: emptyToNull(edited.website),
    email: emptyToNull(edited.email),
    quote: emptyToNull(edited.status),
    other_socials: normalizeOtherSocials(edited.otherSocials),
  };
}
