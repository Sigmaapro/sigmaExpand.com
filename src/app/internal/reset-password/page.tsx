import type { Metadata } from "next";
import { cookies } from "next/headers";
import { InternalResetPasswordForm } from "@/components/internal/auth/InternalResetPasswordForm";

export const metadata: Metadata = {
  title: { absolute: "Reset password · SIGMA" },
  robots: { index: false, follow: false },
};

export default async function InternalResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const recoveryHint =
    cookieStore.get("sigma-internal-recovery")?.value === "1" || params.from === "recovery";

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
          <div className="mb-5 w-full text-center sm:mb-6">
            <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/85">
              Team access
            </p>
            <h2 className="mt-2 font-display text-[1.35rem] font-medium tracking-tight text-white">
              Set a new password
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-cadet/80">
              This updates the password on your existing SIGMA account.
            </p>
          </div>
          <InternalResetPasswordForm recoveryHint={recoveryHint} />
        </div>
      </main>
    </div>
  );
}
