import type { Metadata } from "next";
import { GlassSurface } from "@/components/internal/glass/Glass";
import { InternalLoginForm } from "@/components/internal/auth/InternalLoginForm";
import { InternalSigmaMark } from "@/components/internal/InternalSigmaMark";

export const metadata: Metadata = {
  title: { absolute: "Sign in · SIGMA" },
  robots: { index: false, follow: false },
};

export default function InternalLoginPage() {
  return (
    <div className="relative z-20 flex min-h-dvh flex-col px-0 text-cadet sm:px-6">
      <main className="internal-page mx-auto flex w-full max-w-[26rem] flex-1 flex-col justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.75rem,env(safe-area-inset-top))] lg:max-w-[1180px] lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        <div className="hidden min-w-0 flex-1 lg:block">
          <InternalSigmaMark active className="h-14 w-14 text-white" />
          <p className="mt-8 font-display text-[10px] uppercase tracking-[0.32em] text-[#bde0fe]/80">
            Internal access
          </p>
          <h1 className="mt-4 font-display text-[3.4rem] font-medium leading-[0.95] tracking-[0.18em] text-white">
            SIGMA
          </h1>
          <p className="mt-6 max-w-[22ch] text-[16px] leading-relaxed text-cadet">
            Private team operating space. Invite-only.
          </p>
        </div>

        <GlassSurface className="internal-login-panel w-full max-w-[26rem] rounded-none px-5 py-9 sm:rounded-[1.75rem] sm:px-8 sm:py-10">
          <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <InternalSigmaMark active className="h-10 w-10 text-white lg:hidden" />
            <h1 className="mt-5 font-display text-[1.35rem] font-medium tracking-[0.42em] text-white lg:mt-0">
              SIGMA
            </h1>
            <p className="mt-3 font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">
              Team access
            </p>
          </div>

          <InternalLoginForm />

          <p className="mt-8 text-center text-[12px] leading-relaxed text-cadet/70 lg:text-left">
            Invite-only. No public registration.
          </p>
        </GlassSurface>
      </main>
    </div>
  );
}
