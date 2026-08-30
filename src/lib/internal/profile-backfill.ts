import { profileRowToEditable, parseOtherSocials } from "@/lib/internal/profile-mapper";
import { editableProfileToUpdatePayload, type ProfileUpdatePayload } from "@/lib/internal/profile-payload";
import {
  parseProfileRow,
  PROFILE_SELECT_COLUMNS,
  type ProfileRow,
} from "@/lib/internal/profile-row";
import { createClient } from "@/lib/supabase/server";

function isBlankText(value: string | null | undefined): boolean {
  return !value?.trim();
}

function isBlankList(value: string[] | null | undefined): boolean {
  return !value || value.every((item) => !item.trim());
}

function isBlankSocials(value: unknown): boolean {
  return parseOtherSocials(value).length === 0;
}

/**
 * Allowlisted patch of missing/null/empty DB-owned fields taken from the
 * already-merged editable profile. Never overwrites a non-empty DB value.
 */
export function missingOwnedFieldsPayload(
  row: ProfileRow,
  filled: ReturnType<typeof profileRowToEditable>,
): Partial<ProfileUpdatePayload> {
  const next = editableProfileToUpdatePayload(filled);
  const patch: Partial<ProfileUpdatePayload> = {};

  if (isBlankText(row.full_name) && next.full_name) patch.full_name = next.full_name;
  if (isBlankText(row.role) && next.role) patch.role = next.role;
  if (isBlankText(row.short_bio) && next.short_bio) patch.short_bio = next.short_bio;
  if (isBlankText(row.bio) && next.bio) patch.bio = next.bio;
  if (isBlankList(row.languages) && next.languages.length > 0) patch.languages = next.languages;
  if (isBlankList(row.expertise) && next.expertise.length > 0) patch.expertise = next.expertise;
  if (isBlankText(row.location_city) && next.location_city) patch.location_city = next.location_city;
  if (isBlankText(row.location_country) && next.location_country) {
    patch.location_country = next.location_country;
  }
  if (isBlankText(row.location_country_code) && next.location_country_code) {
    patch.location_country_code = next.location_country_code;
  }
  if (isBlankText(row.linkedin_url) && next.linkedin_url) patch.linkedin_url = next.linkedin_url;
  if (isBlankText(row.x_url) && next.x_url) patch.x_url = next.x_url;
  if (isBlankText(row.instagram_url) && next.instagram_url) patch.instagram_url = next.instagram_url;
  if (isBlankText(row.telegram_url) && next.telegram_url) patch.telegram_url = next.telegram_url;
  if (isBlankText(row.website_url) && next.website_url) patch.website_url = next.website_url;
  if (isBlankText(row.email) && next.email) patch.email = next.email;
  if (isBlankText(row.quote) && next.quote) patch.quote = next.quote;
  if (isBlankSocials(row.other_socials) && next.other_socials.length > 0) {
    patch.other_socials = next.other_socials;
  }

  return patch;
}

/**
 * One-time fill of empty owned columns for the signed-in user's row only.
 * Identity is auth.getUser().id. Static content is used only after that row
 * was already loaded by user_id.
 */
export async function backfillMissingOwnedProfileFields(
  userId: string,
  row: ProfileRow,
): Promise<ProfileRow> {
  if (row.user_id !== userId) return row;

  const filled = profileRowToEditable(row);
  const patch = missingOwnedFieldsPayload(row, filled);
  if (Object.keys(patch).length === 0) return row;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || user.id !== userId) return row;

    const { data, error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("user_id", user.id)
      .select(PROFILE_SELECT_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[internal-profile] backfill failed");
      return row;
    }

    const next = parseProfileRow(data);
    if (!next || next.user_id !== user.id) return row;
    return next;
  } catch {
    console.error("[internal-profile] backfill unavailable");
    return row;
  }
}
