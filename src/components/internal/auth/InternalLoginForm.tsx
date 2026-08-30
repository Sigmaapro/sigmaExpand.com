"use client";

import { useActionState } from "react";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { FieldLabel } from "@/components/internal/profile/ProfileFormSection";
import { loginAction, type AuthFormState } from "@/lib/internal/auth-actions";

const INITIAL_STATE: AuthFormState = { error: null };

export function InternalLoginForm() {
  const [state, action, pending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={action} className="space-y-5" noValidate>
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
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "internal-login-error" : undefined}
        />
      </div>

      {state.error ? (
        <p id="internal-login-error" role="alert" className="glass-error">
          {state.error}
        </p>
      ) : null}

      <GlassButton type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in" : "Sign in"}
      </GlassButton>
    </form>
  );
}
