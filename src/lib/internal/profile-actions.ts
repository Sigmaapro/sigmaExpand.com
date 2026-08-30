"use server";

import { revalidatePath } from "next/cache";
import { editableProfileToUpdatePayload } from "@/lib/internal/profile-payload";
import { profileRowToEditable } from "@/lib/internal/profile-mapper";
import { parseProfileRow, PROFILE_SELECT_COLUMNS } from "@/lib/internal/profile-row";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import type { EditableProfile, ProfileSaveResult } from "@/lib/internal/types";
import { createClient } from "@/lib/supabase/server";

/**
 * Persist the signed-in user's own profile.
 * Ownership is auth.getUser().id → profiles.user_id. Client ids are ignored.
 */
export async function saveInternalProfileAction(
  edited: EditableProfile,
): Promise<ProfileSaveResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false, error: "Sign in to save your profile." };
    }

    const payload = editableProfileToUpdatePayload(edited);

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", user.id)
      .select(PROFILE_SELECT_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[internal-profile] update failed");
      return { ok: false, error: "Could not save your profile." };
    }

    const row = parseProfileRow(data);
    if (!row || row.user_id !== user.id) {
      return { ok: false, error: "Could not save your profile." };
    }

    revalidatePath(INTERNAL_ROUTES.profile);

    return {
      ok: true,
      persistence: "database",
      publishedToPublicSite: false,
      profile: profileRowToEditable(row),
    };
  } catch {
    console.error("[internal-profile] update unavailable");
    return { ok: false, error: "Could not save your profile." };
  }
}
