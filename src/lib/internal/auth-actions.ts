"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { recoveryRedirectUrl } from "@/lib/internal/recovery-redirect";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error: string | null;
};

export type RecoveryRequestState = {
  error: string | null;
  sent: boolean;
};

function isAuthConfigError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("Missing Supabase environment variables");
}

function isPlausibleEmail(value: string): boolean {
  if (value.length < 3 || value.length > 320) return false;
  const at = value.indexOf("@");
  if (at <= 0 || at !== value.lastIndexOf("@")) return false;
  const domain = value.slice(at + 1);
  return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
}

function isOperationalResetError(error: { code?: string; message?: string; status?: number }): boolean {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLowerCase();
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit") return true;
  if (message.includes("rate limit")) return true;
  if (message.includes("redirect") || message.includes("not allowed")) return true;
  if (typeof error.status === "number" && error.status >= 500) return true;
  return false;
}

function operationalResetMessage(error: { code?: string; message?: string }): string {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLowerCase();
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || message.includes("rate limit")) {
    return "Too many attempts. Try again shortly.";
  }
  return "Password reset is unavailable right now.";
}

function passwordUpdateError(error: { code?: string; message?: string }): string {
  const code = error.code ?? "";
  const message = (error.message ?? "").toLowerCase();
  if (message.includes("different from the old")) {
    return "Choose a password you have not used before.";
  }
  if (
    code === "weak_password" ||
    message.includes("weak") ||
    message.includes("pwned") ||
    message.includes("should be at least")
  ) {
    return "Choose a stronger password. Use at least 8 characters.";
  }
  if (
    code === "session_not_found" ||
    code === "session_expired" ||
    message.includes("session") ||
    message.includes("expired") ||
    message.includes("auth session missing")
  ) {
    return "This reset link is invalid or expired.";
  }
  return "Could not update the password. Try again.";
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

export async function requestPasswordResetAction(
  _prev: RecoveryRequestState,
  formData: FormData,
): Promise<RecoveryRequestState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!isPlausibleEmail(email)) {
    return { error: "Enter a valid email address.", sent: false };
  }

  try {
    const headerStore = await headers();
    const redirectTo = recoveryRedirectUrl({
      host: headerStore.get("host"),
      forwardedHost: headerStore.get("x-forwarded-host"),
    });
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error && isOperationalResetError(error)) {
      console.error("[internal-auth] reset request failed");
      return { error: operationalResetMessage(error), sent: false };
    }
  } catch (error) {
    if (isAuthConfigError(error)) {
      return { error: "Password reset is unavailable right now.", sent: false };
    }
    console.error("[internal-auth] reset request unavailable");
    return { error: "Could not send the reset email. Try again.", sent: false };
  }

  return { error: null, sent: true };
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
      return { error: passwordUpdateError(error) };
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
