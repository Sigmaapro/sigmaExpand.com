import type { Metadata } from "next";
import { InternalLoginForm } from "@/components/internal/auth/InternalLoginForm";

export const metadata: Metadata = {
  title: { absolute: "Sign in · SIGMA" },
  robots: { index: false, follow: false },
};

export default function InternalLoginPage() {
  return (
    <div className="relative z-20 flex min-h-dvh flex-col px-4 text-cadet sm:px-6">
      <main className="internal-page mx-auto flex w-full max-w-[22.5rem] flex-1 flex-col pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.35rem,env(safe-area-inset-top))] sm:max-w-[24rem] lg:max-w-[26rem] lg:justify-center lg:py-10">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/services/sigma-mark.png"
            alt="SIGMA"
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
          <h1 className="mt-3 font-display text-[1.05rem] font-medium tracking-[0.18em] text-white sm:mt-3.5 sm:text-[1.15rem]">
            SIGMA
          </h1>
        </div>

        <div className="internal-login-panel mt-7 w-full sm:mt-9">
          <InternalLoginForm />
        </div>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-cadet/65 sm:mt-8">
          Invite-only. No public registration.
        </p>
      </main>
    </div>
  );
}
