"use client";

import { useEffect, useState } from "react";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { parseRecoveryUrl } from "@/lib/internal/recovery-url";

function callbackHref(code: string, type: string | null): string {
  const next = new URL(INTERNAL_ROUTES.authCallback, window.location.origin);
  next.searchParams.set("code", code);
  if (type) next.searchParams.set("type", type);
  next.searchParams.set("next", INTERNAL_ROUTES.resetPassword);
  return `${next.pathname}${next.search}`;
}

/**
 * Forwards Supabase recovery URL data into the internal reset flow.
 * Ordinary visits (no recovery params, no recovery hash) do not navigate.
 *
 * Implicit-hash tokens are moved to /internal/reset-password WITHOUT creating a
 * PKCE browser client here — @supabase/ssr rejects implicit grant URLs.
 */
export function RecoveryLinkBridge({ silent = false }: { silent?: boolean }) {
  const [status, setStatus] = useState<"idle" | "working" | "failed">("idle");

  useEffect(() => {
    const payload = parseRecoveryUrl(window.location.href);
    if (!payload) return;

    setStatus("working");

    if (payload.kind === "error") {
      window.location.replace(`${INTERNAL_ROUTES.resetPassword}?expired=1`);
      return;
    }

    if (payload.kind === "code") {
      window.location.replace(callbackHref(payload.code, payload.type));
      return;
    }

    if (payload.kind === "token_hash") {
      const next = new URL(INTERNAL_ROUTES.resetPassword, window.location.origin);
      next.searchParams.set("token_hash", payload.tokenHash);
      next.searchParams.set("type", payload.type);
      window.location.replace(`${next.pathname}${next.search}`);
      return;
    }

    window.location.replace(`${INTERNAL_ROUTES.resetPassword}${window.location.hash}`);
  }, []);

  if (silent || status === "idle") return null;

  return (
    <p className="mb-5 text-center text-[13px] leading-relaxed text-cadet/80" role="status">
      {status === "failed" ? "This reset link is invalid or expired." : "Opening your reset link…"}
    </p>
  );
}
