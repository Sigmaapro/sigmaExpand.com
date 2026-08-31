"use client";

import { useActionState, useEffect, useState } from "react";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { completePasswordResetAction, type AuthFormState } from "@/lib/internal/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

const INITIAL_STATE: AuthFormState = { error: null };

export function InternalResetPasswordForm({ recoveryHint = false }: { recoveryHint?: boolean }) {
  const [state, action, pending] = useActionState(completePasswordResetAction, INITIAL_STATE);
  const [sessionState, setSessionState] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    const supabase = createClient();
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const url = new URL(window.location.href);

    if (url.searchParams.get("code") || url.searchParams.get("token_hash")) {
      const next = new URL(INTERNAL_ROUTES.authCallback, window.location.origin);
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash");
      const type = url.searchParams.get("type");
      if (code) next.searchParams.set("code", code);
      if (tokenHash) next.searchParams.set("token_hash", tokenHash);
      if (type) next.searchParams.set("type", type);
      next.searchParams.set("next", INTERNAL_ROUTES.resetPassword);
      window.location.replace(`${next.pathname}${next.search}`);
      return;
    }

    void supabase.auth.getUser().then(({ data }) => {
      const params = new URLSearchParams(window.location.search);
      const fromRecovery = recoveryHint || params.get("from") === "recovery";
      if (data.user && fromRecovery) {
        setSessionState("ready");
        return;
      }
      if (hashParams.get("access_token") || hashParams.get("type") === "recovery") {
        void supabase.auth.getSession().then(({ data: sessionData }) => {
          setSessionState(sessionData.session ? "ready" : "missing");
        });
        return;
      }
      setSessionState("missing");
    });
  }, [recoveryHint]);

  if (sessionState === "checking") {
    return (
      <p className="text-center text-[13px] leading-relaxed text-cadet/80" role="status">
        Checking your reset link…
      </p>
    );
  }

  if (sessionState === "missing") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[14px] leading-relaxed text-cadet/85">
          This reset link is invalid or expired. Request a new password recovery email and open it
          on this device.
        </p>
        <a
          href={INTERNAL_ROUTES.login}
          className="inline-flex min-h-12 items-center justify-center text-[13px] text-[#bde0fe]/85 underline-offset-4 hover:underline"
        >
          Back to sign in
        </a>
      </div>
    );
  }

  return (
    <form action={action} className="w-full space-y-3.5 sm:space-y-4" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="internal-new-password" className="internal-profile-field-label">
          New password
        </label>
        <GlassField
          id="internal-new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          required
          disabled={pending}
          className="h-12 min-h-12 text-base"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="internal-confirm-password" className="internal-profile-field-label">
          Confirm password
        </label>
        <GlassField
          id="internal-confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={72}
          required
          disabled={pending}
          className="h-12 min-h-12 text-base"
        />
      </div>
      {state.error ? (
        <p role="alert" className="glass-error">
          {state.error}
        </p>
      ) : null}
      <GlassButton type="submit" disabled={pending} className="mt-1 h-12 min-h-12 w-full">
        {pending ? "Updating" : "Update password"}
      </GlassButton>
    </form>
  );
}
