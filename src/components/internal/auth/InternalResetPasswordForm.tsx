"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import {
  completePasswordResetAction,
  establishRecoveryFromTokenHashAction,
  type AuthFormState,
} from "@/lib/internal/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { parseRecoveryUrl } from "@/lib/internal/recovery-url";

const INITIAL_STATE: AuthFormState = { error: null };

export function InternalResetPasswordForm({
  recoveryHint = false,
  expired = false,
}: {
  recoveryHint?: boolean;
  expired?: boolean;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(completePasswordResetAction, INITIAL_STATE);
  const [sessionState, setSessionState] = useState<"checking" | "ready" | "missing" | "confirm">(
    expired ? "missing" : "checking",
  );
  const [pendingToken, setPendingToken] = useState<{ tokenHash: string; type: "recovery" | "invite" } | null>(
    null,
  );
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (expired) {
      setSessionState("missing");
      return;
    }

    const payload = parseRecoveryUrl(window.location.href);

    if (payload?.kind === "error") {
      window.history.replaceState(null, "", INTERNAL_ROUTES.resetPassword);
      setSessionState("missing");
      return;
    }

    if (payload?.kind === "code") {
      const next = new URL(INTERNAL_ROUTES.authCallback, window.location.origin);
      next.searchParams.set("code", payload.code);
      if (payload.type) next.searchParams.set("type", payload.type);
      next.searchParams.set("next", INTERNAL_ROUTES.resetPassword);
      window.location.replace(`${next.pathname}${next.search}`);
      return;
    }

    if (payload?.kind === "token_hash") {
      window.history.replaceState(
        null,
        "",
        `${INTERNAL_ROUTES.resetPassword}?type=${payload.type}`,
      );
      setPendingToken({ tokenHash: payload.tokenHash, type: payload.type });
      setSessionState("confirm");
      return;
    }

    if (payload?.kind === "implicit") {
      const accessToken = payload.accessToken;
      const refreshToken = payload.refreshToken;
      window.history.replaceState(null, "", `${INTERNAL_ROUTES.resetPassword}?from=recovery`);
      const supabase = createClient();
      void supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setSessionState("missing");
            return;
          }
          setSessionState("ready");
        });
      return;
    }

    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      const params = new URLSearchParams(window.location.search);
      const fromRecovery = recoveryHint || params.get("from") === "recovery";
      setSessionState(data.user && fromRecovery ? "ready" : "missing");
    });
  }, [expired, recoveryHint]);

  async function confirmTokenHash() {
    if (!pendingToken) return;
    setVerifying(true);
    setVerifyError(null);
    const result = await establishRecoveryFromTokenHashAction(
      pendingToken.tokenHash,
      pendingToken.type,
    );
    setVerifying(false);
    if (result.error) {
      setVerifyError(result.error);
      setSessionState("missing");
      return;
    }
    setPendingToken(null);
    setSessionState("ready");
    router.refresh();
  }

  if (sessionState === "checking") {
    return (
      <p className="text-center text-[13px] leading-relaxed text-cadet/80" role="status">
        Checking your reset link…
      </p>
    );
  }

  if (sessionState === "confirm") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[14px] leading-relaxed text-cadet/85">
          Continue to set a new password for your existing SIGMA account.
        </p>
        <GlassButton
          type="button"
          disabled={verifying}
          className="h-12 min-h-12 w-full"
          onClick={() => void confirmTokenHash()}
        >
          {verifying ? "Opening" : "Continue"}
        </GlassButton>
      </div>
    );
  }

  if (sessionState === "missing") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-[14px] leading-relaxed text-cadet/85">
          {verifyError ??
            "This reset link is invalid or expired. Request a new password recovery email and open it on this device."}
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
