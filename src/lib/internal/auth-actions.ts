"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error: string | null;
};

function isAuthConfigError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Missing Supabase environment variables");
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: "Invalid email or password." };
    }
  } catch (error) {
    if (isAuthConfigError(error)) {
      return { error: "Sign in is unavailable right now." };
    }
    return { error: "Sign in failed. Try again." };
  }

  revalidatePath(INTERNAL_ROUTES.root, "layout");
  redirect(INTERNAL_ROUTES.sigma);
}

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Always leave the internal app, even if the session was already invalid.
  }

  revalidatePath(INTERNAL_ROUTES.root, "layout");
  redirect(INTERNAL_ROUTES.login);
}
