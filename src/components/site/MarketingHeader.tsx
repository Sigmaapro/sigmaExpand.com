"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Info, LayoutGrid, Mail, Menu, Network, Newspaper, Sparkles, X } from "lucide-react";
import { ROUTES } from "@/content/global/routes";
import { InsightsOuterLink } from "@/components/site/InsightsOuterLink";
import { LanguageSwitcherButton } from "@/components/site/LanguageSwitcherButton";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { useLanguage } from "@/context/LanguageContext";
import { localeCta, localeNav } from "@/lib/localeTypography";

/**
 * Compact chrome for inner routes + Insights layout — logo, Insights, Get Access, language (no “More” menu).
 */
export function MarketingHeader() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelId = useId();
  const compactLabel = t.ui.languageSwitcherCompact[language];
  const coreNavLinks = [
    { href: ROUTES.anchor.system, label: t.nav.system, icon: Info },
    { href: ROUTES.anchor.capabilities, label: t.nav.capabilities, icon: LayoutGrid },
    { href: ROUTES.anchor.network, label: t.nav.network, icon: Network },
    { href: ROUTES.anchor.sigmaPro, label: t.nav.sigmaPro, icon: Sparkles },
    { href: ROUTES.anchor.contactStrip, label: t.nav.contact, icon: Mail },
  ] as const;

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090f]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07090f]/75">
        <div className="mx-auto flex min-h-[4.25rem] max-w-[90rem] flex-nowrap items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href={ROUTES.home}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-sm text-[#c5ccd3] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center font-display text-[1.5rem] font-semibold leading-none text-white">
              Σ
            </span>
            <span
              data-latin-tracking
              className="hidden font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] sm:inline"
            >
              {t.insights.sigmaHome}
            </span>
          </Link>

          <nav className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            {coreNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md border border-transparent px-2.5 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.09em] text-[#cfd5dd] transition-colors hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 xl:px-3 xl:text-[11px] ${localeNav(language)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <InsightsOuterLink
              className={`hidden min-h-10 max-w-[min(11rem,40vw)] items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dce2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background,border-color] hover:border-[#1c39bb]/40 hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 lg:inline-flex sm:text-[11px] ${localeNav(language)}`}
            >
              <Newspaper
                className="size-[14px] shrink-0 text-[#bde0fe]/80"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0 truncate">{t.nav.insights}</span>
              <ArrowUpRight className="size-3 shrink-0 opacity-55" strokeWidth={2} aria-hidden />
            </InsightsOuterLink>
            <PartnerIntentTriggerButton
              className={`hidden min-h-10 max-w-[min(10.5rem,35vw)] shrink-0 items-center overflow-hidden whitespace-nowrap rounded-md border border-[#1c39bb]/48 bg-[linear-gradient(180deg,rgba(28,57,187,0.22)_0%,rgba(28,57,187,0.08)_100%)] px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,box-shadow] hover:border-[#2a4acd]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 lg:inline-flex xl:max-w-none xl:px-3.5 xl:text-[11px] ${localeCta(language)}`}
              ariaLabel={t.nav.navCta}
            >
              <span className="truncate">{t.nav.navCta}</span>
            </PartnerIntentTriggerButton>
            <div className="hidden lg:block">
              <LanguageSwitcherButton
                currentLang={language}
                setLang={setLanguage}
                ariaLabel={t.ui.navChrome.languageMenuAria}
                compactLabel={compactLabel}
              />
            </div>
            <div className="lg:hidden">
              <LanguageSwitcherButton
                currentLang={language}
                setLang={setLanguage}
                ariaLabel={t.ui.navChrome.languageMenuAria}
                compactLabel={compactLabel}
                variant="navCompact"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#e9ecef] transition-colors hover:border-white/18 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobilePanelId}
              aria-label={
                mobileOpen ? t.ui.navChrome.closeMenuAria : t.ui.navChrome.openMenuAria
              }
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="size-[18px]" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-[18px]" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[rgba(3,5,10,0.62)] backdrop-blur-sm lg:hidden"
            aria-label={t.ui.navChrome.closeMenuAria}
            onClick={() => setMobileOpen(false)}
          />
          <div
            id={mobilePanelId}
            className="fixed inset-x-3 top-[calc(4.75rem+env(safe-area-inset-top,0px))] z-50 max-h-[calc(100svh-5.5rem-env(safe-area-inset-top,0px))] overflow-y-auto rounded-2xl border border-white/[0.09] bg-[linear-gradient(155deg,rgba(16,20,30,0.96)_0%,rgba(8,10,16,0.94)_100%)] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.ui.navChrome.openMenuAria}
          >
            <nav className="grid gap-1.5">
              {coreNavLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[3rem] items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d8dde3] transition-all hover:border-[#1c39bb]/30 hover:bg-[#1c39bb]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 ${localeNav(language)}`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon className="size-[17px] shrink-0 text-[#bde0fe]/85" strokeWidth={2} aria-hidden />
                    <span className="truncate">{label}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 opacity-45" strokeWidth={2} aria-hidden />
                </Link>
              ))}

              <InsightsOuterLink
                onNavigate={() => setMobileOpen(false)}
                className={`flex min-h-[3rem] items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d8dde3] transition-all hover:border-[#1c39bb]/30 hover:bg-[#1c39bb]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 ${localeNav(language)}`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Newspaper className="size-[17px] shrink-0 text-[#bde0fe]/85" strokeWidth={2} aria-hidden />
                  <span className="truncate">{t.nav.insights}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 opacity-45" strokeWidth={2} aria-hidden />
              </InsightsOuterLink>
            </nav>

            <div className="mt-2 border-t border-white/[0.08] pt-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f98a3] ${localeNav(language)}`}
                >
                  {t.ui.navChrome.languageMenuAria}
                </span>
                <LanguageSwitcherButton
                  currentLang={language}
                  setLang={setLanguage}
                  ariaLabel={t.ui.navChrome.languageMenuAria}
                  compactLabel={compactLabel}
                />
              </div>
              <PartnerIntentTriggerButton
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-[3.25rem] w-full items-center justify-center rounded-xl border border-[#1c39bb]/45 bg-[linear-gradient(180deg,rgba(28,57,187,0.35)_0%,rgba(28,57,187,0.12)_100%)] px-3.5 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_36px_rgba(28,57,187,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,box-shadow] hover:border-[#3d5cdf]/55 hover:shadow-[0_12px_48px_rgba(28,57,187,0.45)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 ${localeCta(language)}`}
                ariaLabel={t.nav.navCta}
              >
                <span className="truncate">{t.nav.navCta}</span>
              </PartnerIntentTriggerButton>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
