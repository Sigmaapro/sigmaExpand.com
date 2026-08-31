"use client";

import { InternalLogoutButton } from "@/components/internal/auth/InternalLogoutButton";
import { initialsFromEmail } from "@/components/internal/InternalNavGlyph";

export function InternalTopBar({ email }: { email: string | null }) {
  const initials = initialsFromEmail(email);

  return (
    <>
      <header className="internal-account-header sticky top-0 z-40 lg:hidden pt-[max(12px,env(safe-area-inset-top,0px))]">
        <div className="internal-account-header-inner">
          <div className="internal-account-identity">
            <span aria-hidden="true" className="internal-account-avatar">
              {initials}
            </span>
            <p className="internal-account-email">{email ?? "Signed in"}</p>
          </div>
          <div className="internal-account-actions">
            <InternalLogoutButton />
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed right-6 top-4 z-40 hidden lg:block">
        <div className="pointer-events-auto glass-surface flex max-w-[22rem] items-center gap-3 rounded-2xl px-3 py-2">
          <span
            aria-hidden="true"
            className="glass-chip h-10 w-10 shrink-0 justify-center rounded-full px-0 font-display text-[11px] tracking-[0.12em] text-white"
          >
            {initials}
          </span>
          <p className="min-w-0 truncate font-display text-[10px] uppercase tracking-[0.16em] text-cadet/80">
            {email ?? "Signed in"}
          </p>
          <InternalLogoutButton />
        </div>
      </div>
    </>
  );
}
