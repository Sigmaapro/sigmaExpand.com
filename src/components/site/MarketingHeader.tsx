"use client";

import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { ROUTES } from "@/content/global/routes";
import { InsightsOuterLink } from "@/components/site/InsightsOuterLink";
import { LanguageSwitcherButton } from "@/components/site/LanguageSwitcherButton";
import { useLanguage } from "@/context/LanguageContext";
import { localeCta, localeNav } from "@/lib/localeTypography";

/**
 * Compact chrome for inner routes + Insights layout — logo, Insights, Get Access, language (no “More” menu).
 */
export function MarketingHeader() {
  const { t, language, setLanguage } = useLanguage();
  const compactLabel = t.ui.languageSwitcherCompact[language];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07090f]/75">
      <div className="mx-auto flex min-h-[4.25rem] max-w-[90rem] flex-nowrap items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-10">
        <Link
          href={ROUTES.home}
          className="group flex min-w-0 shrink-0 items-center gap-2.5 text-[#c5ccd3] transition-colors hover:text-white"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center font-display text-[1.5rem] font-semibold leading-none text-white">
            Σ
          </span>
          <span
            className={`hidden font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] sm:inline ${localeNav(language)}`}
          >
            {t.insights.sigmaHome}
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-1.5 sm:gap-3 md:gap-4">
          <InsightsOuterLink
            className={`hidden min-h-10 max-w-[min(11rem,40vw)] items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dce2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background,border-color] hover:border-[#1c39bb]/40 hover:bg-white/[0.055] min-[431px]:inline-flex sm:text-[11px] ${localeNav(language)}`}
          >
            <Newspaper
              className="size-[14px] shrink-0 text-[#bde0fe]/80"
              strokeWidth={2}
              aria-hidden
            />
            <span className="min-w-0 truncate">{t.nav.insights}</span>
            <ArrowUpRight className="size-3 shrink-0 opacity-55" strokeWidth={2} aria-hidden />
          </InsightsOuterLink>
          <Link
            href={ROUTES.anchor.connect}
            className={`inline-flex min-h-10 max-w-[min(9.5rem,35vw)] shrink-0 items-center overflow-hidden whitespace-nowrap rounded-md border border-[#1c39bb]/48 bg-[linear-gradient(180deg,rgba(28,57,187,0.22)_0%,rgba(28,57,187,0.08)_100%)] px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,box-shadow] hover:border-[#2a4acd]/65 sm:max-w-none sm:px-3.5 sm:text-[11px] ${localeCta(language)}`}
          >
            <span className="truncate">{t.nav.navCta}</span>
          </Link>
          <LanguageSwitcherButton
            currentLang={language}
            setLang={setLanguage}
            ariaLabel={t.ui.navChrome.languageMenuAria}
            compactLabel={compactLabel}
          />
        </div>
      </div>
    </header>
  );
}
