"use client";

import { useEffect, useState } from "react";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

const RECOVERY_OTP_TYPES = new Set(["recovery", "invite"]);

function callbackUrl(params: {
  code?: string | null;
  tokenHash?: string | null;
  type?: string | null;
}): string {
  const next = new URL(INTERNAL_ROUTES.authCallback, window.location.origin);
  if (params.code) next.searchParams.set("code", params.code);
  if (params.tokenHash) next.searchParams.set("token_hash", params.tokenHash);
  if (params.type) next.searchParams.set("type", params.type);
  next.searchParams.set("next", INTERNAL_ROUTES.resetPassword);
  return `${next.pathname}${next.search}`;
}

/**
 * Forwards Supabase recovery/invite URL data to the internal callback.
 * Ordinary visits (no recovery params) render nothing and do not navigate.
 */
export function RecoveryLinkBridge({ silent = false }: { silent?: boolean }) {
  const [status, setStatus] = useState<"idle" | "working" | "failed">("idle");

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("error")) return;

    const code = url.searchParams.get("code");
    const tokenHash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const hashType = hashParams.get("type");

    if (code) {
      setStatus("working");
      window.location.replace(callbackUrl({ code, type }));
      return;
    }

    if (tokenHash && type && RECOVERY_OTP_TYPES.has(type)) {
      setStatus("working");
      window.location.replace(callbackUrl({ tokenHash, type }));
      return;
    }

    if (hashType !== "recovery") return;

    setStatus("working");
    void import("@/lib/supabase/client").then(({ createClient }) => {
      const supabase = createClient();
      return supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          window.location.replace(`${INTERNAL_ROUTES.resetPassword}?from=recovery`);
          return;
        }
        setStatus("failed");
      });
    });
  }, []);

  if (silent || status === "idle") return null;

  return (
    <p className="mb-5 text-center text-[13px] leading-relaxed text-cadet/80" role="status">
      {status === "failed" ? "This reset link is invalid or expired." : "Opening your reset link…"}
    </p>
  );
}
