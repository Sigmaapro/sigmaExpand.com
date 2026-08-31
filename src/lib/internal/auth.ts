import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

/**
 * One Auth getUser() per incoming RSC request.
 * Middleware still independently validates the JWT; this only dedupes layout + page.
 */
export const getInternalAuthUser = cache(async (): Promise<User | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
});

export async function requireInternalUser(): Promise<User> {
  const user = await getInternalAuthUser();
  if (!user) {
    redirect(INTERNAL_ROUTES.login);
  }
  return user;
}
