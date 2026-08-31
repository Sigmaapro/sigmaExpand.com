"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

export async function completePasswordResetAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!password || !confirm) {
    return { error: "Enter and confirm your new password." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }
  if (password.length < 8 || password.length > 72) {
    return { error: "Use a password between 8 and 72 characters." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "This reset link is invalid or expired." };
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error("[internal-auth] password update failed");
      return { error: "Could not update the password. Try the reset link again." };
    }

    const cookieStore = await cookies();
    cookieStore.set("sigma-internal-recovery", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/internal",
      maxAge: 0,
    });
    await supabase.auth.signOut();
  } catch (error) {
    if (isAuthConfigError(error)) {
      return { error: "Password reset is unavailable right now." };
    }
    console.error("[internal-auth] password update unavailable");
    return { error: "Could not update the password. Try again." };
  }

  revalidatePath(INTERNAL_ROUTES.root, "layout");
  redirect(`${INTERNAL_ROUTES.login}?reset=1`);
}

export async function establishRecoveryFromTokenHashAction(
  tokenHash: string,
  type: string,
): Promise<AuthFormState> {
  if (typeof tokenHash !== "string" || !tokenHash) {
    return { error: "This reset link is invalid or expired." };
  }
  if (type !== "recovery" && type !== "invite") {
    return { error: "This reset link is invalid or expired." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (error) {
      console.error("[internal-auth] recovery verify failed");
      return { error: "This reset link is invalid or expired." };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "This reset link is invalid or expired." };
    }

    const cookieStore = await cookies();
    cookieStore.set("sigma-internal-recovery", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/internal",
      maxAge: 15 * 60,
      secure: process.env.NODE_ENV === "production",
    });
    return { error: null };
  } catch (error) {
    if (isAuthConfigError(error)) {
      return { error: "Password reset is unavailable right now." };
    }
    console.error("[internal-auth] recovery verify unavailable");
    return { error: "This reset link is invalid or expired." };
  }
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
