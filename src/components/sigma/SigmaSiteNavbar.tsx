"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowUpRight,
  Info,
  LayoutGrid,
  Mail,
  Menu,
  Network,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";
import { openPartnerIntentFlow } from "@/components/partner/PartnerIntentModal";
import { FluidGlassNavShell } from "@/components/sigma/FluidGlassNavShell";
import { SigmaMobileNavPanel } from "@/components/sigma/SigmaMobileNavPanel";
import { InsightsOuterLink } from "@/components/site/InsightsOuterLink";
import { LanguageSwitcherButton } from "@/components/site/LanguageSwitcherButton";
import { aboutPageMetaByLang } from "@/content/global/marketing/aboutContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { teamPageMetaByLang } from "@/content/global/marketing/teamContent";
import { ROUTES } from "@/content/global/routes";
import { useLanguage } from "@/context/LanguageContext";
import { localeCta, localeNav } from "@/lib/localeTypography";
import { LiquidGlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

type GlassNavId =
  | "about"
  | "capabilities"
  | "network"
  | "metrics"
  | "sigmapro"
  | "contact"
  | "connect";

const SECTION_ORDER: GlassNavId[] = [
  "about",
  "capabilities",
  "network",
  "sigmapro",
  "contact",
  "connect",
];

const NAV_SCROLL_GAP = 112;
const NAV_CLICK_SCROLL_LOCK_MS = 900;

/**
 * The single site navbar used by the homepage and every inner route.
 * Homepage-only scroll state is kept here so the visual chrome never forks.
 */
export function SigmaSiteNavbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/ar";
  const { t, lang: currentLang, setLang: setCurrentLang, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [glassActive, setGlassActive] = useState<GlassNavId | null>(null);
  const navClickScrollingRef = useRef(false);
  const navClickTimerRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const primaryNav: {
    id: Exclude<GlassNavId, "connect" | "metrics">;
    icon: typeof Mail;
    label: string;
  }[] = [
    { id: "about", icon: Info, label: t.nav.system },
    { id: "capabilities", icon: LayoutGrid, label: t.nav.capabilities },
    { id: "network", icon: Network, label: t.nav.network },
    { id: "sigmapro", icon: Sparkles, label: t.nav.sigmaPro },
    { id: "contact", icon: Mail, label: t.nav.contact },
  ];
  const navHrefById: Record<Exclude<GlassNavId, "connect" | "metrics">, string> = {
    about: ROUTES.anchor.system,
    capabilities: ROUTES.anchor.capabilities,
    network: ROUTES.anchor.network,
    sigmapro: ROUTES.anchor.sigmaPro,
    contact: ROUTES.anchor.contactStrip,
  };

  const syncActiveFromScroll = useCallback(() => {
    if (!isHomepage || navClickScrollingRef.current) return;
    const hero = document.getElementById("hero");
    if (hero) {
      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      const heroH = hero.offsetHeight;
      if (window.scrollY < heroTop + heroH - NAV_SCROLL_GAP) {
        setGlassActive(null);
        return;
      }
    }
    let current: GlassNavId | null = null;
    for (const id of SECTION_ORDER) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY + NAV_SCROLL_GAP >= top - 4) current = id;
    }
    setGlassActive(current === "connect" ? null : current);
  }, [isHomepage]);

  useEffect(() => {
    if (!isHomepage) {
      setGlassActive(null);
      return;
    }
    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        syncActiveFromScroll();
      });
    };

    syncActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
      if (scrollRafRef.current != null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      if (navClickTimerRef.current != null) {
        window.clearTimeout(navClickTimerRef.current);
        navClickTimerRef.current = null;
      }
    };
  }, [isHomepage, syncActiveFromScroll, currentLang]);

  const beginNavClickScrollLock = () => {
    navClickScrollingRef.current = true;
    if (navClickTimerRef.current != null) window.clearTimeout(navClickTimerRef.current);
    navClickTimerRef.current = window.setTimeout(() => {
      navClickScrollingRef.current = false;
      navClickTimerRef.current = null;
      syncActiveFromScroll();
    }, NAV_CLICK_SCROLL_LOCK_MS);
  };

  const goToSection = (id: GlassNavId) => {
    if (!isHomepage) {
      window.location.href = id === "connect" ? ROUTES.anchor.connect : navHrefById[id as Exclude<GlassNavId, "connect" | "metrics">];
      return;
    }
    beginNavClickScrollLock();
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setGlassActive(id === "connect" ? null : id);
  };

  const navigateToSectionFromLink = (
    event: MouseEvent<HTMLAnchorElement>,
    id: Exclude<GlassNavId, "connect" | "metrics">,
  ) => {
    setMobileOpen(false);
    if (!isHomepage) return;
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;
    event.preventDefault();
    goToSection(id);
    window.history.replaceState(null, "", navHrefById[id]);
  };

  const scrollToTop = () => {
    if (!isHomepage) return;
    beginNavClickScrollLock();
    setMobileOpen(false);
    setGlassActive(null);
    const hero = document.getElementById("hero");
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        dir="ltr"
        className="sigma-nav-shell fixed inset-x-0 top-0 z-[10000] flex justify-center pt-2 md:pt-5"
        onClick={(e) => {
          if (isHomepage && e.target === e.currentTarget) scrollToTop();
        }}
      >
        <FluidGlassNavShell
          variant="shell"
          height={72}
          className="sigma-liquid-nav min-w-0 w-[calc(100%-0.75rem)] max-w-[1440px] shrink-0 sm:w-[calc(100%-1.25rem)]"
          contentClassName="!flex !h-full !w-full !items-center !justify-start !gap-3 !p-0 !px-3 sm:!gap-4 sm:!px-4 md:!gap-5 md:!px-6 lg:!gap-7 lg:!px-7"
        >
          {isHomepage ? (
            <button
              type="button"
              onClick={scrollToTop}
              className="relative z-10 flex h-full min-w-0 max-w-[min(42%,9.5rem)] shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-start transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:max-w-none sm:gap-2.5"
              aria-label={t.ui.navChrome.brandAria}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center font-display text-[1.6rem] font-semibold leading-none tracking-tight text-white drop-shadow-[0_0_12px_rgba(29,137,187,0.28)] transition-transform duration-300 hover:scale-[1.04] sm:h-9 sm:w-9 sm:text-[1.7rem]">Σ</span>
              <span data-latin-tracking className="truncate font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#dce2e8] sm:text-lg sm:tracking-[0.14em]">SIGMA</span>
            </button>
          ) : (
            <Link
              href={ROUTES.home}
              className="relative z-10 flex h-full min-w-0 max-w-[min(42%,9.5rem)] shrink-0 items-center gap-1.5 text-start transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:max-w-none sm:gap-2.5"
              aria-label={t.ui.navChrome.brandAria}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center font-display text-[1.6rem] font-semibold leading-none tracking-tight text-white drop-shadow-[0_0_12px_rgba(29,137,187,0.28)] transition-transform duration-300 hover:scale-[1.04] sm:h-9 sm:w-9 sm:text-[1.7rem]">Σ</span>
              <span data-latin-tracking className="truncate font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#dce2e8] sm:text-lg sm:tracking-[0.14em]">SIGMA</span>
            </Link>
          )}

          <div className="relative z-10 ms-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:ms-0 lg:hidden">
            <LanguageSwitcherButton currentLang={currentLang} setLang={setCurrentLang} ariaLabel={t.ui.navChrome.languageMenuAria} compactLabel={t.ui.languageSwitcherCompact[currentLang]} variant="navCompact" />
          </div>

          <div className="relative z-0 hidden min-h-0 min-w-0 flex-1 justify-center overflow-visible px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex">
            <div className="sigma-home-nav-track relative inline-flex h-14 w-max max-w-full flex-nowrap items-center gap-1.5 sm:gap-2 md:gap-2.5" dir="ltr">
              {primaryNav.map(({ id, icon: Icon, label }) => {
                const isActive = glassActive === id;
                const isPro = id === "sigmapro";
                return (
                  <Link
                    key={id}
                    href={navHrefById[id]}
                    data-gooey-nav-item=""
                    onClick={(event) => navigateToSectionFromLink(event, id)}
                    className={`sigma-home-nav-item relative isolate box-border inline-flex h-14 min-h-14 max-h-14 shrink-0 items-center overflow-visible rounded-full border border-transparent text-start transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-[#07090f] ${isActive ? "min-w-0 border-white/[0.16] bg-white/[0.1] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_22px_rgba(0,0,0,0.16)]" : isPro ? "min-w-max text-[#dce2e8] hover:bg-white/[0.05] hover:text-white" : "min-w-0 text-[#8b939e] hover:bg-white/[0.045] hover:text-[#e6e9ed]"}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10 inline-flex h-full min-h-0 items-center gap-1.5 px-2.5 sm:gap-2 sm:px-3 md:px-3.5">
                      <Icon className={`size-[15px] shrink-0 md:size-4 ${isPro && !isActive ? "text-[#bde0fe]/85" : "text-current opacity-[0.92]"}`} strokeWidth={2} aria-hidden />
                      <span className={`max-w-[9.5rem] truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] text-current sm:max-w-none sm:text-[13px] sm:leading-none sm:tracking-[0.07em] md:text-[14px] md:tracking-[0.08em] xl:whitespace-nowrap ${localeNav(currentLang)} ${isPro && !isActive ? "shrink-0 text-[#dce2e8]" : ""}`} title={label}>{label}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 md:gap-4 lg:ms-auto">
            <InsightsOuterLink className={`hidden h-12 max-w-[min(11rem,32vw)] shrink-0 items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/[0.13] bg-white/[0.03] px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dce2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background,border-color,box-shadow] hover:border-white/[0.28] hover:bg-white/[0.07] hover:text-white md:inline-flex md:h-14 md:max-w-[min(200px,28vw)] md:gap-2 md:px-3.5 md:text-[11px] lg:px-4 lg:text-[12px] ${localeNav(currentLang)}`}>
              <Newspaper className="size-[15px] shrink-0 text-white/65" strokeWidth={2} aria-hidden />
              <span className="min-w-0 truncate">{t.nav.insights}</span>
              <ArrowUpRight className="size-3.5 shrink-0 opacity-55" strokeWidth={2} aria-hidden />
            </InsightsOuterLink>
            <LiquidGlassButton type="button" onClick={openPartnerIntentFlow} className={`sigma-framer-liquid-button hidden h-12 min-h-12 shrink-0 items-center whitespace-nowrap !rounded-full !border border-white/[0.22] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.07)_100%)] !px-3.5 !py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_24px_rgba(0,0,0,0.2)] transition-[background,box-shadow,border-color,transform] hover:border-white/[0.42] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.1)_100%)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_30px_rgba(0,0,0,0.28)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:inline-flex md:h-14 md:min-h-14 md:!px-5 md:text-[13px] ${localeCta(currentLang)}`}>
              <span className="text-white">{t.nav.navCta}</span>
            </LiquidGlassButton>
            <div className="hidden shrink-0 lg:block"><LanguageSwitcherButton currentLang={currentLang} setLang={setCurrentLang} ariaLabel={t.ui.navChrome.languageMenuAria} compactLabel={t.ui.languageSwitcherCompact[currentLang]} /></div>
            <button type="button" className="inline-flex h-12 min-h-12 w-12 min-w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[rgba(29,137,187,0.22)] bg-[rgba(8,12,24,0.5)] text-[#e9ecef] transition-colors hover:border-[#1D89BB]/4 hover:bg-[rgba(29,137,187,0.1)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 lg:hidden" aria-expanded={mobileOpen} aria-controls="sigma-mobile-nav-panel" aria-label={mobileOpen ? t.ui.navChrome.closeMenuAria : t.ui.navChrome.openMenuAria} onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X className="size-[18px]" strokeWidth={2} aria-hidden /> : <Menu className="size-[18px]" strokeWidth={2} aria-hidden />}
            </button>
          </div>
        </FluidGlassNavShell>
      </nav>

      <SigmaMobileNavPanel
        panelId="sigma-mobile-nav-panel"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        closeAriaLabel={t.ui.navChrome.closeMenuAria}
        goToSection={goToSection}
        glassActive={glassActive}
        mobileNav={t.ui.mobileNavSheet}
        isRtl={isRtl}
        isHomepage={isHomepage}
        labels={{ about: t.nav.system, capabilities: t.nav.capabilities, network: t.nav.network, sigmapro: t.nav.sigmaPro, contact: t.nav.contact }}
        aboutLabel={pickLang(aboutPageMetaByLang, currentLang).title}
        teamLabel={pickLang(teamPageMetaByLang, currentLang).title}
        workWithSigmaLabel={t.nav.navCta}
      />
    </>
  );
}
