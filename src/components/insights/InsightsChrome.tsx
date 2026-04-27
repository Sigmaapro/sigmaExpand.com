"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function InsightsChrome() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07090f]/75">
      <div className="mx-auto flex min-h-[4.25rem] max-w-[90rem] items-center justify-between gap-3 px-3 sm:gap-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 text-[#c5ccd3] transition-colors hover:text-white"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center font-display text-[1.5rem] font-semibold leading-none text-white">
            Σ
          </span>
          <span className="hidden font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] sm:inline">
            {t.insights.sigmaHome}
          </span>
        </Link>
        <nav
          className="flex min-w-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b939e] sm:gap-8 sm:text-[11px]"
          aria-label={t.insights.chromeNavAriaLabel}
        >
          <Link
            href="/insights"
            className="inline-flex min-h-10 items-center text-[#bde0fe] transition-colors hover:text-white"
          >
            {t.insights.backToInsights}
          </Link>
          <Link
            href="/#connect"
            className="inline-flex min-h-10 items-center transition-colors hover:text-white"
          >
            {t.nav.insightsAccessLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
