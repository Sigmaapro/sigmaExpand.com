"use client";

import { useActionState, useState } from "react";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { InternalLoginFace } from "@/components/internal/auth/InternalLoginFace";
import { FieldLabel } from "@/components/internal/profile/ProfileFormSection";
import { loginAction, type AuthFormState } from "@/lib/internal/auth-actions";

const INITIAL_STATE: AuthFormState = { error: null };

export function InternalLoginForm() {
  const [state, action, pending] = useActionState(loginAction, INITIAL_STATE);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      <InternalLoginFace
        guarded={passwordFocused}
        className="mb-6 h-[4.75rem] w-full sm:mb-8 sm:h-[5.5rem] lg:mb-10 lg:h-[6.25rem]"
      />

      <div className="mb-5 w-full text-center sm:mb-6">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/85">
          Team access
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-cadet/80">
          Private SIGMA operating space.
        </p>
      </div>

      <form action={action} className="w-full space-y-3.5 sm:space-y-4" noValidate>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="internal-email">Email</FieldLabel>
          <GlassField
            id="internal-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="username"
            required
            disabled={pending}
            className="h-12 min-h-12"
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "internal-login-error" : undefined}
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="internal-password">Password</FieldLabel>
          <GlassField
            id="internal-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={pending}
            className="h-12 min-h-12"
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "internal-login-error" : undefined}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </div>

        {state.error ? (
          <p id="internal-login-error" role="alert" className="glass-error">
            {state.error}
          </p>
        ) : null}

        <GlassButton type="submit" disabled={pending} className="mt-1 h-12 min-h-12 w-full">
          {pending ? "Signing in" : "Sign in"}
        </GlassButton>
      </form>
    </div>
  );
}
