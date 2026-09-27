"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { completePasswordResetAction, type AuthFormState } from "@/lib/internal/auth-actions";
import { createClient } from "@/lib/supabase/client";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { parseRecoveryUrl } from "@/lib/internal/recovery-url";

/**
 * Update the address bar without notifying the Next.js router.
 * Passing a null history state makes Next treat the call as a navigation,
 * refetch the page, and remount this form — which drops the recovery session.
 */
function replaceRecoveryLocation(path: string) {
  const current = window.history.state;
  const state =
    current && typeof current === "object" ? { ...current, __NA: true } : { __NA: true };
  window.history.replaceState(state, "", path);
}

function markRecoveryCookie() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `sigma-internal-recovery=1; Path=/internal; Max-Age=900; SameSite=Lax${secure}`;
}

const INITIAL_STATE: AuthFormState = { error: null };

export function InternalResetPasswordForm({
  recoveryHint = false,
  expired = false,
}: {
  recoveryHint?: boolean;
  expired?: boolean;
}) {
  const [state, action, pending] = useActionState(completePasswordResetAction, INITIAL_STATE);
  const [sessionState, setSessionState] = useState<"checking" | "ready" | "missing" | "confirm">(
    expired ? "missing" : "checking",
  );
  const [pendingToken, setPendingToken] = useState<{ tokenHash: string; type: "recovery" | "invite" } | null>(
    null,
  );
  const pendingTokenRef = useRef(pendingToken);
  pendingTokenRef.current = pendingToken;
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (expired) {
      setSessionState("missing");
      return;
    }

    const payload = parseRecoveryUrl(window.location.href);

    if (payload?.kind === "error") {
      replaceRecoveryLocation(INTERNAL_ROUTES.resetPassword);
      setSessionState("missing");
      return;
    }

    if (payload?.kind === "code") {
      // Exchange here. The PKCE verifier cookie was stored in this browser when
      // the reset email was requested, and auth-js reads sb_flow_id from this URL.
      // Sending the code to the server callback drops that pairing and, on failure,
      // replaces this URL with ?expired=1 so the still-valid code is discarded.
      const supabase = createClient();
      let cancelled = false;
      let recovered = false;
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event) => {
        if (cancelled || event !== "PASSWORD_RECOVERY") return;
        recovered = true;
        replaceRecoveryLocation(`${INTERNAL_ROUTES.resetPassword}?from=recovery`);
        setSessionState("ready");
      });
      void supabase.auth.getUser().then(() => {
        // PASSWORD_RECOVERY is emitted on a timer after the code exchange.
        // Wait for that turn before deciding the link failed.
        setTimeout(() => {
          if (cancelled || recovered) return;
          replaceRecoveryLocation(INTERNAL_ROUTES.resetPassword);
          setSessionState((current) => (current === "ready" || current === "confirm" ? current : "missing"));
        }, 0);
      });
      return () => {
        cancelled = true;
        subscription.unsubscribe();
      };
    }

    if (payload?.kind === "token_hash") {
      replaceRecoveryLocation(`${INTERNAL_ROUTES.resetPassword}?type=${payload.type}`);
      setPendingToken({ tokenHash: payload.tokenHash, type: payload.type });
      setSessionState("confirm");
      return;
    }

    // Strip implicit tokens before creating the browser client.
    // @supabase/ssr rejects an implicit-grant URL still sitting in location.hash.
    if (payload?.kind === "implicit") {
      replaceRecoveryLocation(`${INTERNAL_ROUTES.resetPassword}?from=recovery`);
    }

    let cancelled = false;
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (cancelled || event !== "PASSWORD_RECOVERY") return;
      replaceRecoveryLocation(`${INTERNAL_ROUTES.resetPassword}?from=recovery`);
      setSessionState("ready");
    });

    if (payload?.kind === "implicit") {
      void supabase.auth
        .setSession({
          access_token: payload.accessToken,
          refresh_token: payload.refreshToken,
        })
        .then(({ error }) => {
          if (cancelled) return;
          setSessionState(error ? "missing" : "ready");
        });
    } else {
      void supabase.auth.getUser().then(({ data }) => {
        if (cancelled) return;
        const params = new URLSearchParams(window.location.search);
        const fromRecovery =
          recoveryHint ||
          params.get("from") === "recovery" ||
          params.get("type") === "recovery";
        setSessionState((current) => {
          if (current === "ready" || current === "confirm") return current;
          if (pendingTokenRef.current) return "confirm";
          return data.user && fromRecovery ? "ready" : "missing";
        });
      });
    }

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [expired, recoveryHint]);

  async function confirmTokenHash() {
    if (!pendingToken) return;
    setVerifying(true);
    setVerifyError(null);
    // Verify in this browser. A server action that sets the session cookie
    // makes Next.js discard this component and rerun the check against
    // ?type=recovery, which no longer contains the token.
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      type: pendingToken.type,
      token_hash: pendingToken.tokenHash,
    });
    setVerifying(false);
    if (error || !data.session) {
      setVerifyError("This reset link is invalid or expired.");
      setSessionState("missing");
      return;
    }
    markRecoveryCookie();
    setPendingToken(null);
    replaceRecoveryLocation(`${INTERNAL_ROUTES.resetPassword}?from=recovery`);
    setSessionState("ready");
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
          href={INTERNAL_ROUTES.forgotPassword}
          className="inline-flex min-h-12 w-full items-center justify-center text-[13px] text-[#bde0fe]/85 underline-offset-4 hover:underline"
        >
          Request a new link
        </a>
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
