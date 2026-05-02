"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/content/global/routes";
import { ArrowUpRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

/**
 * Shared frame for SEO marketing subpages: mesh background, content surface, bottom CTA.
 * Does not alter global header/footer (InnerPageShell).
 */
export function MarketingSubpageScaffold({ children }: Props) {
  const { t, isRtl } = useLanguage();
  const c = t.cta;

  return (
    <div className="relative min-h-0 flex-1">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -inset-[20%] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(28,57,187,0.12),transparent_70%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(189,224,254,0.04),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.07] sm:opacity-[0.1] bg-sigma-mesh" />
      </div>

      <div className="relative z-10">{children}</div>

      <section
        className="relative z-10 mx-auto mt-14 max-w-5xl border-t border-white/[0.06] px-4 pb-16 pt-12 sm:mt-16 sm:px-6 sm:pb-20 md:mt-20 md:pb-24"
        aria-labelledby="subpage-cta-heading"
      >
        <div className="rounded-2xl border border-white/[0.09] bg-[#07090f]/75 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <p
              id="subpage-cta-heading"
              className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb]"
            >
              {c.title}
            </p>
            <p className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.12em] text-[#e9ecef] md:text-xl">
              {c.description}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={ROUTES.anchor.capabilities}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/25 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(28,57,187,0.28)] transition-[background,transform] hover:bg-[#1c39bb]/45 active:scale-[0.99]"
              >
                {c.primaryCta}
                <ArrowUpRight className={`size-4 shrink-0 opacity-80 ${isRtl ? "rotate-180" : ""}`} aria-hidden />
              </Link>
              <Link
                href={ROUTES.contact}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e9ecef] transition-[background,border-color] hover:border-[#bde0fe]/35 hover:bg-white/[0.07]"
              >
                {c.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
