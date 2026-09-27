"use client";

import { useActionState } from "react";
import Link from "next/link";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { FieldLabel } from "@/components/internal/profile/ProfileFormSection";
import {
  requestPasswordResetAction,
  type RecoveryRequestState,
} from "@/lib/internal/auth-actions";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

const RECOVERY_SENT_MESSAGE =
  "If an account exists for this email, you'll receive a password reset link.";

const INITIAL_STATE: RecoveryRequestState = { error: null, sent: false };

export function InternalForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, INITIAL_STATE);

  if (state.sent) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[14px] leading-relaxed text-[#bde0fe]/90" role="status">
          {RECOVERY_SENT_MESSAGE}
        </p>
        <p className="text-[13px] leading-relaxed text-cadet/75">
          Open the link in this browser.
        </p>
        <Link
          href={INTERNAL_ROUTES.login}
          className="inline-flex min-h-12 items-center justify-center text-[13px] text-[#bde0fe]/85 underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="w-full space-y-3.5 sm:space-y-4" noValidate>
      <div className="space-y-1.5">
        <FieldLabel htmlFor="internal-forgot-email">Email</FieldLabel>
        <GlassField
          id="internal-forgot-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          required
          disabled={pending}
          className="h-12 min-h-12"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "internal-forgot-error" : undefined}
        />
      </div>

      {state.error ? (
        <p id="internal-forgot-error" role="alert" className="glass-error">
          {state.error}
        </p>
      ) : null}

      <GlassButton type="submit" disabled={pending} className="mt-1 h-12 min-h-12 w-full">
        {pending ? "Sending" : "Send reset link"}
      </GlassButton>

      <div className="pt-1 text-center">
        <Link
          href={INTERNAL_ROUTES.login}
          className="inline-flex min-h-11 items-center justify-center text-[13px] text-[#bde0fe]/85 underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
