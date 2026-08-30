"use client";

import { InternalLogoutButton } from "@/components/internal/auth/InternalLogoutButton";
import { initialsFromEmail } from "@/components/internal/InternalNavGlyph";

export function InternalTopBar({ email }: { email: string | null }) {
  const initials = initialsFromEmail(email);

  return (
    <>
      <header className="internal-account-header relative z-40 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)] lg:hidden">
        <div className="flex min-w-0 items-center justify-between gap-1.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              aria-hidden="true"
              className="glass-chip h-7 w-7 shrink-0 justify-center rounded-full px-0 font-display text-[8px] tracking-[0.06em] text-white"
            >
              {initials}
            </span>
            <p className="min-w-0 truncate font-display text-[8px] uppercase tracking-[0.1em] text-cadet/75">
              {email ?? "Signed in"}
            </p>
          </div>
          <div className="shrink-0">
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
