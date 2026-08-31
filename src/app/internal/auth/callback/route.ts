import { NextResponse } from "next/server";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

const EMAIL_OTP_TYPES = ["recovery", "invite", "magiclink", "signup", "email", "email_change"] as const;
type EmailOtpType = (typeof EMAIL_OTP_TYPES)[number];

function isEmailOtpType(value: string | null): value is EmailOtpType {
  return Boolean(value && (EMAIL_OTP_TYPES as readonly string[]).includes(value));
}

function safeInternalNext(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return INTERNAL_ROUTES.resetPassword;
  }
  if (!next.startsWith(INTERNAL_ROUTES.root)) {
    return INTERNAL_ROUTES.resetPassword;
  }
  return next;
}

function destinationAfterAuth(type: string | null, next: string | null): string {
  if (type === "recovery" || type === "invite") {
    return INTERNAL_ROUTES.resetPassword;
  }
  if (type === "magiclink" || type === "email" || type === "signup" || type === "email_change") {
    return next ? safeInternalNext(next) : INTERNAL_ROUTES.sigma;
  }
  if (next) return safeInternalNext(next);
  return INTERNAL_ROUTES.resetPassword;
}

function redirectAfterSession(origin: string, next: string) {
  const path = next === INTERNAL_ROUTES.resetPassword ? `${next}?from=recovery` : next;
  const response = NextResponse.redirect(`${origin}${path}`);
  if (next === INTERNAL_ROUTES.resetPassword) {
    response.cookies.set("sigma-internal-recovery", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/internal",
      maxAge: 15 * 60,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}

/** PKCE / email-link callback. Recovery continues to the password-reset page. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = destinationAfterAuth(type, searchParams.get("next"));

  try {
    const supabase = await createClient();

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return redirectAfterSession(origin, next);
      }
    } else if (tokenHash && isEmailOtpType(type)) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash: tokenHash,
      });
      if (!error) {
        return redirectAfterSession(origin, next);
      }
    }
  } catch {
    return NextResponse.redirect(`${origin}${INTERNAL_ROUTES.login}`);
  }

  return NextResponse.redirect(`${origin}${INTERNAL_ROUTES.login}`);
}
