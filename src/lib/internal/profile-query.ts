import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import { getInternalAuthUser } from "@/lib/internal/auth";
import {
  parseProfileRow,
  PROFILE_SELECT_COLUMNS,
  type ProfileRow,
} from "@/lib/internal/profile-row";
import { createClient } from "@/lib/supabase/server";

export type AuthenticatedProfileLoad =
  | { status: "ok"; user: User; profile: ProfileRow }
  | { status: "unauthenticated" }
  | { status: "missing"; user: User }
  | { status: "error" };

/**
 * Load the signed-in user's own public.profiles row.
 * Identity is auth.getUser().id only — never slug, email, or static TeamMember id.
 * Cached per request so layout auth + profile page share the same session lookup.
 */
export const getAuthenticatedProfile = cache(async (): Promise<AuthenticatedProfileLoad> => {
  let user: User | null = null;

  try {
    user = await getInternalAuthUser();

    if (!user) {
      return { status: "unauthenticated" };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select(PROFILE_SELECT_COLUMNS)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("[internal-profile] load failed");
      return { status: "error" };
    }

    if (!data) {
      return { status: "missing", user };
    }

    const profile = parseProfileRow(data);
    if (!profile) {
      console.error("[internal-profile] unexpected profile row shape");
      return { status: "error" };
    }

    if (profile.user_id !== user.id) {
      console.error("[internal-profile] user_id mismatch after select");
      return { status: "error" };
    }

    return { status: "ok", user, profile };
  } catch {
    console.error("[internal-profile] load unavailable");
    return user ? { status: "error" } : { status: "unauthenticated" };
  }
});
