/**
 * Narrow typed representation of public.profiles.
 * Nullable columns match the verified database; do not assume presence.
 */
export type ProfileStatus = "draft" | "active" | "archived";

export type ProfileRow = {
  id: string;
  user_id: string;
  slug: string;
  full_name: string | null;
  role: string | null;
  short_bio: string | null;
  bio: string | null;
  languages: string[] | null;
  expertise: string[] | null;
  linkedin_url: string | null;
  x_url: string | null;
  instagram_url: string | null;
  telegram_url: string | null;
  website_url: string | null;
  profile_image_url: string | null;
  email: string | null;
  location_city: string | null;
  location_country: string | null;
  location_country_code: string | null;
  other_socials: unknown;
  quote: string | null;
  profile_status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export const PROFILE_SELECT_COLUMNS = [
  "id",
  "user_id",
  "slug",
  "full_name",
  "role",
  "short_bio",
  "bio",
  "languages",
  "expertise",
  "linkedin_url",
  "x_url",
  "instagram_url",
  "telegram_url",
  "website_url",
  "profile_image_url",
  "email",
  "location_city",
  "location_country",
  "location_country_code",
  "other_socials",
  "quote",
  "profile_status",
  "created_at",
  "updated_at",
].join(", ");

function asNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => typeof item === "string")) return null;
  return value;
}

function asProfileStatus(value: unknown): ProfileStatus {
  if (value === "draft" || value === "active" || value === "archived") return value;
  return "draft";
}

export function parseProfileRow(value: unknown): ProfileRow | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.user_id !== "string" || typeof row.slug !== "string") {
    return null;
  }
  if (typeof row.created_at !== "string" || typeof row.updated_at !== "string") {
    return null;
  }

  return {
    id: row.id,
    user_id: row.user_id,
    slug: row.slug,
    full_name: asNullableString(row.full_name),
    role: asNullableString(row.role),
    short_bio: asNullableString(row.short_bio),
    bio: asNullableString(row.bio),
    languages: asStringArray(row.languages),
    expertise: asStringArray(row.expertise),
    linkedin_url: asNullableString(row.linkedin_url),
    x_url: asNullableString(row.x_url),
    instagram_url: asNullableString(row.instagram_url),
    telegram_url: asNullableString(row.telegram_url),
    website_url: asNullableString(row.website_url),
    profile_image_url: asNullableString(row.profile_image_url),
    email: asNullableString(row.email),
    location_city: asNullableString(row.location_city),
    location_country: asNullableString(row.location_country),
    location_country_code: asNullableString(row.location_country_code),
    other_socials: row.other_socials ?? [],
    quote: asNullableString(row.quote),
    profile_status: asProfileStatus(row.profile_status),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
