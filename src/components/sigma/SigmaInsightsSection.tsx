"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { LiveSupportButton } from "@/components/sigma/LiveSupportButton";
import { ProofLayer } from "@/components/sigma/ProofLayer";
import { MagneticButton } from "@/components/sigma/SigmaCtaButton";
import { MidConversionCta, FinalConversionCta } from "@/components/sigma/ConversionSections";
import { BookCallModal } from "@/components/sigma/BookCallModal";
import { PartnerIntentModalHost, openPartnerIntentFlow } from "@/components/partner/PartnerIntentModal";
import { getConversion } from "@/content/conversion";
import { HeroAtmosphere } from "@/components/sigma/HeroAtmosphere";
import { HeroEyebrowShard } from "@/components/sigma/HeroEyebrowShards";
import { FloatingTeamCards } from "@/components/sigma/FloatingTeamCards";
import { CryptoMarketingSection } from "@/components/sigma/CryptoMarketingSection";
import { CryptoWordCloudVisual } from "@/components/sigma/CryptoWordCloudVisual";
import { SectionTitleTypewriter } from "@/components/sigma/SectionTitleTypewriter";
import { SeoHiddenImages } from "@/components/seo/SeoHiddenImages";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import * as THREE from "three";
import {
  Shield,
  Cpu,
  Activity,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Mail,
  Info,
  Network,
  LayoutGrid,
  Menu,
  X,
  Sparkles,
  Check,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconId, SiteTranslations } from "@/content/types";
import { InsightsOuterLink } from "@/components/site/InsightsOuterLink";
import { LanguageSwitcherButton } from "@/components/site/LanguageSwitcherButton";
import { SigmaMobileNavPanel } from "@/components/sigma/SigmaMobileNavPanel";
import { pickLang } from "@/content/global/marketing/helpers";
import { aboutPageMetaByLang } from "@/content/global/marketing/aboutContent";
import { teamPageMetaByLang } from "@/content/global/marketing/teamContent";
import { MarketingFooter } from "@/components/site/MarketingFooter";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import { ROUTES } from "@/content/global/routes";
import { useLanguage } from "@/context/LanguageContext";
import type { CSSProperties } from "react";
import {
  localeBody,
  localeCardTitle,
  localeCta,
  localeEyebrow,
  localeHeading,
  localeHeroSubtitle,
  localeHeroSupporting,
  localeMeta,
  localeNav,
  rtlScriptSurfaceClass,
} from "@/lib/localeTypography";
import { useIsMobile, useMinWidth } from "@/hooks/useMedia";


export const BLOG_INSIGHTS_URL = "https://blog.sigmaa.pro";
const BLOG_LINK_REL = "noopener noreferrer";

export type HomeInsightCard = {
  id: string;
  category: string;
  date: string;
  dateTime: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string | null;
};

export type InsightsPayload = {
  cards: HomeInsightCard[];
  error: boolean;
};

const SECTION_COPY = {
  eyebrow: "SIGMA INSIGHTS",
  title: "Market intelligence for crypto, forex, and Web3 growth",
  intro:
    "Signals, playbooks, and operator notes from the markets where exchanges, brokers, KOLs, IBs, and Web3 teams compete for trust and distribution.",
  readMore: "Read More",
  cta: "Explore All Insights",
  fallback:
    "Insights are temporarily unavailable. Explore the full Sigma blog for live market intelligence.",
} as const;

const MARQUEE_DURATION_SEC = 96;
/** Approx card + gap; refined from first card on mount/resize. */
const INSIGHT_CARD_STEP_FALLBACK = 380;

function measureInsightCardStep(root: HTMLElement | null): number {
  if (!root) return INSIGHT_CARD_STEP_FALLBACK;
  const card = root.querySelector("article");
  if (!(card instanceof HTMLElement)) return INSIGHT_CARD_STEP_FALLBACK;
  const row = card.parentElement;
  const styles = getComputedStyle(row ?? root);
  const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
  return Math.round(card.getBoundingClientRect().width + gap);
}

function InsightsNavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous insight" : "Next insight"}
      className={`pointer-events-auto absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(189,224,254,0.16)] bg-[linear-gradient(155deg,rgba(8,20,55,0.72),rgba(5,12,30,0.48))] text-[#c9d7f0] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_32px_rgba(8,24,64,0.28)] backdrop-blur-xl transition-[border-color,box-shadow,color,background-color,transform] duration-300 hover:border-[rgba(189,224,254,0.32)] hover:bg-[linear-gradient(155deg,rgba(12,28,68,0.82),rgba(6,16,40,0.55))] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_36px_rgba(28,57,187,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030b1d] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-35 sm:size-12 ${
        isPrev ? "left-2 sm:left-3 md:left-4 lg:left-5" : "right-2 sm:right-3 md:right-4 lg:right-5"
      }`}
    >
      <Icon className="size-5 sm:size-[1.35rem]" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

function InsightsStaticScroller({
  cards,
  language,
}: {
  cards: HomeInsightCard[];
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const scrollByCard = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = measureInsightCardStep(el) || INSIGHT_CARD_STEP_FALLBACK;
      el.scrollBy({
        left: dir * step,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  return (
    <div className="group/insights-static relative w-full max-w-[100vw]">
      <InsightsNavButton direction="prev" onClick={() => scrollByCard(-1)} />
      <InsightsNavButton direction="next" onClick={() => scrollByCard(1)} />
      <div
        ref={scrollerRef}
        className="-mx-0 flex gap-4 overflow-x-auto px-12 pb-3 [scrollbar-width:thin] snap-x snap-mandatory sm:gap-5 sm:px-14 md:grid md:max-w-6xl md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-6 md:pb-0 lg:mx-auto lg:grid-cols-3"
        role="list"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-0 snap-center max-md:flex max-md:justify-center"
            role="listitem"
          >
            <div className="h-full max-md:w-[min(20.5rem,82vw)] md:w-full [&_article]:w-full [&_article]:max-w-none">
              <InsightFeedCard card={card} language={language} />
            </div>
          </div>
        ))}
      </div>
      {/* Hide side controls once md+ grid shows all cards */}
      <style>{`
        @media (min-width: 768px) {
          .group\\/insights-static > button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function InsightsMarqueeScroller({
  cards,
  language,
}: {
  cards: HomeInsightCard[];
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const trackInnerRef = useRef<HTMLDivElement>(null);
  const [manualOffset, setManualOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoveringRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const clearPauseTimer = useCallback(() => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const holdPause = useCallback(
    (ms = 1400) => {
      setPaused(true);
      clearPauseTimer();
      pauseTimerRef.current = setTimeout(() => {
        pauseTimerRef.current = null;
        if (!hoveringRef.current) setPaused(false);
      }, ms);
    },
    [clearPauseTimer],
  );

  useEffect(() => () => clearPauseTimer(), [clearPauseTimer]);

  const nudge = useCallback(
    (dir: -1 | 1) => {
      const step = measureInsightCardStep(trackInnerRef.current);
      holdPause(1600);
      setManualOffset((prev) => {
        const next = prev + dir * step;
        const loop = Math.max(step * Math.max(cards.length, 1), step);
        if (next > loop) return next - loop;
        if (next < -loop) return next + loop;
        return next;
      });
    },
    [cards.length, holdPause],
  );

  return (
    <div
      className="group/insights-marquee relative w-full max-w-[100vw] overflow-hidden"
      onMouseEnter={() => {
        hoveringRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        if (!pauseTimerRef.current) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          if (!pauseTimerRef.current && !hoveringRef.current) setPaused(false);
        }
      }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#06122f]/70 via-[#06122f]/35 to-transparent sm:w-20 md:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#06122f]/70 via-[#06122f]/35 to-transparent sm:w-20 md:w-28"
        aria-hidden
      />

      <InsightsNavButton direction="prev" onClick={() => nudge(1)} />
      <InsightsNavButton direction="next" onClick={() => nudge(-1)} />

      <div
        className="flex w-max py-1 will-change-transform"
        style={{
          transform: `translate3d(${manualOffset}px, 0, 0)`,
          transition: reduceMotion
            ? undefined
            : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          ref={trackInnerRef}
          className="sigma-insights-marquee-track flex w-max"
          style={
            {
              animation: `sigma-insights-marquee-ltr ${MARQUEE_DURATION_SEC}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            } as CSSProperties
          }
        >
          <InsightCardTrack cards={cards} language={language} />
          <InsightCardTrack cards={cards} language={language} ariaHidden />
        </div>
      </div>

      <style>{`
        @keyframes sigma-insights-marquee-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sigma-insights-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function InsightImageFallback({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_15%,rgba(189,224,254,0.16),transparent_55%),radial-gradient(ellipse_65%_55%_at_85%_80%,rgba(28,57,187,0.42),transparent_58%),linear-gradient(150deg,#071225_0%,#0b1630_50%,#050a16_100%)]"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(189,224,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(189,224,254,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="sr-only">{title}</span>
    </div>
  );
}

function InsightFeedCard({
  card,
  language,
}: {
  card: HomeInsightCard;
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <article className="group relative flex h-full w-[min(20.5rem,82vw)] shrink-0 flex-col overflow-hidden rounded-2xl border border-[rgba(147,197,253,0.16)] bg-[linear-gradient(165deg,rgba(7,12,24,0.88)_0%,rgba(10,18,34,0.82)_50%,rgba(6,10,18,0.9)_100%)] shadow-[0_20px_56px_rgba(2,8,22,0.45),inset_0_1px_0_rgba(210,228,255,0.1)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(189,224,254,0.32)] hover:shadow-[0_24px_64px_rgba(2,8,22,0.55),0_0_40px_rgba(28,57,187,0.18)] sm:w-[22rem] lg:w-[23.5rem]">
      <a
        href={card.href}
        target="_blank"
        rel={BLOG_LINK_REL}
        className="relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030b1d]"
        aria-label={`${card.title} — ${SECTION_COPY.readMore} (opens in a new tab)`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a1222]">
          {card.imageSrc ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- external blog media; next.config out of scope */}
              <img
                src={card.imageSrc}
                alt={card.title}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </>
          ) : (
            <InsightImageFallback title={card.title} />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/35 to-transparent"
            aria-hidden
          />
        </div>
      </a>
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span
            className={`rounded-sm border border-[#1c39bb]/40 bg-[#1c39bb]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bde0fe] ${localeMeta(language)}`}
          >
            {card.category}
          </span>
          {card.date ? (
            <time
              dateTime={card.dateTime}
              className={`text-[10px] uppercase tracking-[0.12em] text-[#6c757d] ${localeMeta(language)}`}
            >
              {card.date}
            </time>
          ) : null}
        </div>
        <h3
          className={`font-display text-lg font-semibold leading-snug tracking-tight text-white text-balance sm:text-[1.2rem] ${localeHeading(language)}`}
        >
          <a
            href={card.href}
            target="_blank"
            rel={BLOG_LINK_REL}
            className="transition-colors hover:text-[#bde0fe]"
          >
            {card.title}
          </a>
        </h3>
        {card.summary ? (
          <p
            className={`mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#9aa5b3] ${localeBody(language)}`}
          >
            {card.summary}
          </p>
        ) : (
          <div className="mt-3 flex-1" />
        )}
        <a
          href={card.href}
          target="_blank"
          rel={BLOG_LINK_REL}
          className={`mt-5 inline-flex min-h-10 w-fit items-center gap-1.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bde0fe] transition-colors hover:text-white ${localeNav(language)} ${localeCta(language)}`}
          aria-label={`${SECTION_COPY.readMore}: ${card.title} (opens in a new tab)`}
        >
          {SECTION_COPY.readMore}
          <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

function InsightCardTrack({
  cards,
  language,
  ariaHidden,
}: {
  cards: HomeInsightCard[];
  language: ReturnType<typeof useLanguage>["language"];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-stretch gap-4 pe-4 sm:gap-5 sm:pe-5"
      aria-hidden={ariaHidden || undefined}
    >
      {cards.map((card) => (
        <InsightFeedCard
          key={`${ariaHidden ? "dup" : "main"}-${card.id}`}
          card={card}
          language={language}
        />
      ))}
    </div>
  );
}

function InsightsFallbackNotice({
  language,
}: {
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <div className="mx-auto max-w-xl px-5 text-center sm:px-6">
      <p className={`text-sm leading-relaxed text-[#9aa5b3] ${localeBody(language)}`}>
        {SECTION_COPY.fallback}
      </p>
      <a
        href={BLOG_INSIGHTS_URL}
        target="_blank"
        rel={BLOG_LINK_REL}
        className={`mt-4 inline-flex min-h-10 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bde0fe] transition-colors hover:text-white ${localeNav(language)}`}
      >
        {SECTION_COPY.cta}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}

/** Client Insights UI — cards come from server WP fetch with revalidate: 1800. */
export function SigmaInsightsSection({ insights }: { insights: InsightsPayload }) {
  const { language, isRtl } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile(768);
  const useStatic = reduceMotion || isMobile;
  const cards = insights.cards;
  const showFallback = insights.error && cards.length === 0;

  return (
    <section
      id="insights"
      className="sigma-landing-section-shell relative z-10 scroll-mt-24 overflow-hidden px-0 pb-20 pt-16 sm:pb-24 sm:pt-20 md:scroll-mt-28 md:pb-28 md:pt-24"
      aria-labelledby="sigma-insights-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_12%,rgba(28,57,187,0.1),transparent_62%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(125,170,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(125,170,255,0.03)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_88%,transparent_100%)]" aria-hidden />

      <div className="relative mx-auto max-w-[52rem] px-5 text-center sm:px-6">
        <div className="sigma-section-header-glass mx-auto px-5 py-5 text-center sm:px-7 sm:py-6 md:px-8 md:py-7">
          <p
            className={`sigma-hero-eyebrow mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-6 sm:text-[11px] ${localeEyebrow(language)}`}
          >
            {SECTION_COPY.eyebrow}
          </p>
          <SectionTitleTypewriter
            text={SECTION_COPY.title}
            id="sigma-insights-heading"
            className={`mx-auto text-center font-display text-[clamp(1.25rem,4.2vw,2.65rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:tracking-tight ${localeHeading(language)}`}
          />
          <p
            className={`mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[#cfd6de] sm:mt-6 sm:text-base md:text-[#b6bcc4] ${localeBody(language)}`}
          >
            {SECTION_COPY.intro}
          </p>
        </div>
      </div>

      <div className="relative mt-10 sm:mt-14 md:mt-16">
        {showFallback ? <InsightsFallbackNotice language={language} /> : null}

        {cards.length > 0 ? (
          useStatic ? (
            <InsightsStaticScroller cards={cards} language={language} />
          ) : (
            <InsightsMarqueeScroller cards={cards} language={language} />
          )
        ) : null}
      </div>

      <div className="relative mt-10 flex justify-center px-5 sm:mt-12 sm:px-6 md:mt-14">
        <MagneticButton
          href={BLOG_INSIGHTS_URL}
          target="_blank"
          rel={BLOG_LINK_REL}
          primary
          isRtl={isRtl}
          fullWidthMobile
        >
          {SECTION_COPY.cta}
        </MagneticButton>
      </div>
    </section>
  );
}



const theme = {
  colors: {
    erie: "#212529",
    persian: "#1c39bb",
    cadet: "#adb5bd",
    uranian: "#bde0fe",
  },
};

/** Pass 2: Σ-inspired extruded shards. Pass 1 (platonic cluster) = set WEBGL_USE_SIGMA_SHARDS to false in WebGLBackground. */
const WEBGL_USE_SIGMA_SHARDS = true;

function buildSigmaShardGeometries(): THREE.BufferGeometry[] {
  const shardDepth = 0.1;
  const ext = { depth: shardDepth, bevelEnabled: false };
  const list: THREE.BufferGeometry[] = [];

  const shUpper = new THREE.Shape();
  shUpper.moveTo(-0.42, -0.12);
  shUpper.lineTo(0.52, 0.48);
  shUpper.lineTo(0.38, 0.22);
  shUpper.lineTo(-0.28, -0.12);
  shUpper.closePath();
  const g0 = new THREE.ExtrudeGeometry(shUpper, ext);
  g0.center();
  list.push(g0);

  const shLower = new THREE.Shape();
  shLower.moveTo(-0.38, 0.18);
  shLower.lineTo(0.48, -0.42);
  shLower.lineTo(0.22, -0.22);
  shLower.lineTo(-0.42, 0.02);
  shLower.closePath();
  const g1 = new THREE.ExtrudeGeometry(shLower, ext);
  g1.center();
  list.push(g1);

  const shBar = new THREE.Shape();
  shBar.moveTo(-0.52, -0.07);
  shBar.lineTo(0.52, -0.07);
  shBar.lineTo(0.48, 0.07);
  shBar.lineTo(-0.48, 0.07);
  shBar.closePath();
  const g2 = new THREE.ExtrudeGeometry(shBar, ext);
  g2.center();
  list.push(g2);

  const shSpine = new THREE.Shape();
  shSpine.moveTo(-0.09, -0.52);
  shSpine.lineTo(0.09, -0.48);
  shSpine.lineTo(0.07, 0.52);
  shSpine.lineTo(-0.07, 0.48);
  shSpine.closePath();
  const g3 = new THREE.ExtrudeGeometry(shSpine, ext);
  g3.center();
  list.push(g3);

  const shDiag = new THREE.Shape();
  shDiag.moveTo(0, 0);
  shDiag.lineTo(0.58, 0.18);
  shDiag.lineTo(0.32, -0.28);
  shDiag.closePath();
  const g4 = new THREE.ExtrudeGeometry(shDiag, {
    depth: shardDepth * 1.15,
    bevelEnabled: false,
  });
  g4.center();
  list.push(g4);

  const shKite = new THREE.Shape();
  shKite.moveTo(0, 0);
  shKite.lineTo(0.38, 0.52);
  shKite.lineTo(-0.18, 0.22);
  shKite.closePath();
  const g5 = new THREE.ExtrudeGeometry(shKite, ext);
  g5.center();
  list.push(g5);

  return list;
}

const GlobalStyles = () => (
  <style>{`
    :root {
      --bg-color: ${theme.colors.erie};
      --primary: ${theme.colors.persian};
      --text-muted: ${theme.colors.cadet};
      --glow: ${theme.colors.uranian};
    }

    /*
     * Fallback layout when the main Tailwind bundle fails to load (dev chunk/HMR issues).
     * Keeps nav + hero readable until a hard refresh or clean .next rebuild.
     */
    .sigma-landing-root {
      min-height: 100vh;
      background-color: #020817;
      color: ${theme.colors.cadet};
      overflow-x: clip;
    }
    .sigma-landing-root nav.sigma-nav-shell {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      box-sizing: border-box;
      pointer-events: auto;
    }
    .sigma-landing-root main {
      position: relative;
      z-index: 10;
      padding-top: max(4.5rem, calc(env(safe-area-inset-top, 0px) + 3.25rem));
    }
    @media (max-width: 767px) {
      .sigma-landing-root main {
        padding-top: max(4.25rem, calc(env(safe-area-inset-top, 0px) + 3rem));
      }
    }
    .sigma-landing-root #hero {
      min-height: min(100svh, 920px);
      padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
      padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
      padding-bottom: 2rem;
      box-sizing: border-box;
    }
    @media (min-width: 640px) {
      .sigma-landing-root #hero {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    .sigma-landing-root ::selection {
      background: var(--primary);
      color: #fff;
    }

    .sigma-landing-root ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .sharp-edge {
      border-radius: 0 !important;
    }

    .grid-bg {
      background-size: 50px 50px;
      background-image:
        linear-gradient(to right, rgba(173, 181, 189, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(173, 181, 189, 0.05) 1px, transparent 1px);
      /* Horizontal-only fade — radial masks stacked into dark bands between sections */
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        black 14%,
        black 86%,
        transparent 100%
      );
    }

    .glow-text {
      text-shadow: 0 0 20px rgba(189, 224, 254, 0.4);
    }

    @media (max-width: 767px) {
      .glow-text {
        text-shadow: 0 0 26px rgba(189, 224, 254, 0.55);
      }
    }
  `}</style>
);

/** Heavy Three.js layer — only mounted from desktop-up to protect phone performance. */
const WebGLScene = ({
  lowPower,
  onInitError,
}: {
  lowPower: boolean;
  onInitError: () => void;
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const windowHalf = useRef(new THREE.Vector2(1, 1));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    windowHalf.current.set(window.innerWidth / 2, window.innerHeight / 2);

    const w = window.innerWidth;
    const isTablet = w < 1024;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let group: THREE.Group | null = null;
    let tetGeo: THREE.BufferGeometry | null = null;
    let octGeo: THREE.BufferGeometry | null = null;
    let sigmaShardGeometries: THREE.BufferGeometry[] = [];
    let material: THREE.MeshPhysicalMaterial | null = null;
    let wireMaterial: THREE.LineBasicMaterial | null = null;
    const shards: THREE.Mesh[] = [];
    let pointLight: THREE.PointLight | null = null;
    let animationFrameId = 0;
    let resizeFrameId = 0;
    let running = true;
    let lastViewportWidth = 0;
    let lastViewportHeight = 0;

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX - windowHalf.current.x;
      mouse.current.y = event.clientY - windowHalf.current.y;
    };

    const applyResize = () => {
      if (!camera || !renderer) return;
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      if (nextWidth === lastViewportWidth && nextHeight === lastViewportHeight) return;
      lastViewportWidth = nextWidth;
      lastViewportHeight = nextHeight;
      windowHalf.current.x = nextWidth / 2;
      windowHalf.current.y = nextHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      updateMaxScroll();
    };

    const handleResize = () => {
      if (resizeFrameId) return;
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = 0;
        applyResize();
      });
    };

    let maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const updateMaxScroll = () => {
      maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    };

    const timer = new THREE.Timer();
    timer.connect(document);

    const cleanup = () => {
      running = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
        resizeFrameId = 0;
      }
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      shards.forEach((m) => {
        m.children.forEach((ch) => {
          if (ch instanceof THREE.LineSegments) ch.geometry.dispose();
        });
      });
      if (tetGeo) tetGeo.dispose();
      if (octGeo) octGeo.dispose();
      sigmaShardGeometries.forEach((g) => g.dispose());
      if (material) material.dispose();
      if (wireMaterial) wireMaterial.dispose();
      if (renderer) renderer.dispose();
      timer.dispose();
    };

    const animate = (timestamp: number) => {
      if (!running || !group || !pointLight || !camera || !renderer) return;
      timer.update(timestamp);
      const scrollProgress = Math.min(scrollY.current / maxScroll, 1.0);

      pointLight.position.x +=
        (mouse.current.x * 0.01 - pointLight.position.x) * 0.05;
      pointLight.position.y +=
        (-mouse.current.y * 0.01 - pointLight.position.y) * 0.05;
      pointLight.position.z = 5;

      group.rotation.y +=
        (mouse.current.x * 0.00042 - group.rotation.y) * 0.045;
      group.rotation.x +=
        (-mouse.current.y * 0.00042 - group.rotation.x) * 0.045;

      const explosionFactor = scrollProgress * 22;

      shards.forEach((shard) => {
        const ud = shard.userData as {
          initialPos: THREE.Vector3;
          direction: THREE.Vector3;
          speed: number;
          rotSpeed: THREE.Vector3;
        };
        const targetPos = ud.initialPos
          .clone()
          .add(ud.direction.clone().multiplyScalar(explosionFactor * ud.speed));
        shard.position.lerp(targetPos, 0.05);

        shard.rotation.x += ud.rotSpeed.x;
        shard.rotation.y += ud.rotSpeed.y;
        shard.rotation.z += ud.rotSpeed.z;
      });

      camera.position.z = 15 - scrollProgress * 4;
      camera.position.y = -(scrollProgress * 4);

      renderer.render(scene!, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      running = document.visibilityState !== "hidden";
      if (running) {
        animationFrameId = requestAnimationFrame(animate);
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030b1d, isTablet ? 0.024 : 0.021);

      camera = new THREE.PerspectiveCamera(
        72,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer({
        antialias: !lowPower,
        alpha: true,
        powerPreference: lowPower ? "low-power" : "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.05 : isTablet ? 1.25 : 1.5));
      renderer.domElement.style.pointerEvents = "none";
      mount.appendChild(renderer.domElement);
      lastViewportWidth = window.innerWidth;
      lastViewportHeight = window.innerHeight;

      group = new THREE.Group();
      scene.add(group);

      const baseScale = isTablet ? 1.12 : 1.34;

      /**
       * Pass 1 — original platonic cluster (tet / oct): exact composition baseline.
       * Pass 2 — `buildSigmaShardGeometries()`: same loop, same motion; only mesh geometry changes.
       */
      if (WEBGL_USE_SIGMA_SHARDS) {
        sigmaShardGeometries = buildSigmaShardGeometries();
      } else {
        tetGeo = new THREE.TetrahedronGeometry(baseScale, 0);
        octGeo = new THREE.OctahedronGeometry(baseScale * 0.92, 0);
      }

      material = new THREE.MeshPhysicalMaterial({
        color: theme.colors.persian,
        emissive: 0x07142f,
        emissiveIntensity: 0.14,
        metalness: 0.82,
        roughness: 0.22,
        wireframe: false,
        flatShading: true,
      });

      wireMaterial = new THREE.LineBasicMaterial({
        color: theme.colors.uranian,
        transparent: true,
        opacity: 0.17,
      });

      const numShards = lowPower ? 92 : isTablet ? 132 : 252;

      const SIGMA_W = 2.8;
      const SIGMA_H = 4.2;
      const SIGMA_THICKNESS = 0.20;
      const SIGMA_DEPTH = 0.05;

      // Σ has FOUR strokes. Coordinates in 2D, Y axis goes UP.
      // Top bar runs across the top. Bottom bar runs across the bottom.
      // The vertex of the < shape is on the LEFT at y=0.
      const sigmaSegments: Array<{ sx: number; sy: number; ex: number; ey: number }> = [
        { sx:  SIGMA_W, sy:  SIGMA_H, ex: -SIGMA_W, ey:  SIGMA_H }, // top bar
        { sx: -SIGMA_W, sy:  SIGMA_H, ex:  SIGMA_W, ey:  0       }, // upper diag TL -> vertex right
        { sx:  SIGMA_W, sy:  0,       ex: -SIGMA_W, ey: -SIGMA_H }, // lower diag vertex -> BL
        { sx:  SIGMA_W, sy: -SIGMA_H, ex: -SIGMA_W, ey: -SIGMA_H }, // bottom bar
      ];

      const sigmaSegmentLengths = sigmaSegments.map((s) =>
        Math.hypot(s.ex - s.sx, s.ey - s.sy),
      );
      const sigmaTotalLength = sigmaSegmentLengths.reduce((a, b) => a + b, 0);

      const sampleSigmaPoint = (): THREE.Vector3 => {
        let pick = Math.random() * sigmaTotalLength;
        let segIdx = 0;
        for (let s = 0; s < sigmaSegments.length; s++) {
          if (pick <= sigmaSegmentLengths[s]!) { segIdx = s; break; }
          pick -= sigmaSegmentLengths[s]!;
        }
        const seg = sigmaSegments[segIdx]!;
        const t = Math.random();
        const x = seg.sx + (seg.ex - seg.sx) * t;
        const y = seg.sy + (seg.ey - seg.sy) * t;

        const dx = seg.ex - seg.sx;
        const dy = seg.ey - seg.sy;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny =  dx / len;

        const jitter = (Math.random() - 0.5) * 2 * SIGMA_THICKNESS;
        const z      = (Math.random() - 0.5) * 2 * SIGMA_DEPTH;

        return new THREE.Vector3(x + nx * jitter, y + ny * jitter, z);
      };

      for (let i = 0; i < numShards; i++) {
        const geometry = WEBGL_USE_SIGMA_SHARDS
          ? sigmaShardGeometries[i % sigmaShardGeometries.length]!
          : i % 3 === 0
            ? octGeo!
            : tetGeo!;
        const mesh = new THREE.Mesh(geometry, material);
        const sigmaPos = sampleSigmaPoint();
        mesh.position.copy(sigmaPos);

        mesh.userData = {
          initialPos: mesh.position.clone(),
          direction: mesh.position.clone().normalize(),
          speed: Math.random() * 0.42 + 0.12,
          rotSpeed: new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5,
          ).multiplyScalar(0.042),
        };

        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        );

        if (WEBGL_USE_SIGMA_SHARDS) {
          mesh.scale.setScalar(i % 3 === 0 ? baseScale * 0.92 : baseScale);
        }

        const wireframe = new THREE.LineSegments(
          new THREE.WireframeGeometry(geometry),
          wireMaterial,
        );
        mesh.add(wireframe);

        group.add(mesh);
        shards.push(mesh);
      }

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.36);
      scene.add(ambientLight);

      pointLight = new THREE.PointLight(theme.colors.uranian, 1.65, 55);
      scene.add(pointLight);

      const rim = new THREE.DirectionalLight(0xffffff, 0.28);
      rim.position.set(4, 6, 8);
      scene.add(rim);

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("resize", handleResize);
      document.addEventListener("visibilitychange", onVisibility);

      updateMaxScroll();
      animate(performance.now());
    } catch (error) {
      cleanup();
      if (process.env.NODE_ENV === "development") {
        console.error("[Sigma WebGL] Falling back to static hero background.", error);
      }
      onInitError();
      return;
    }

    return cleanup;
  }, [lowPower, onInitError]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

const WebGLBackground = () => {
  /** Canvas from lg-up saves tablet GPU / battery; soft navy film still shows below */
  const showCanvas = useMinWidth(1024);
  const reduceMotion = useReducedMotion() ?? false;
  const [lowPowerDevice, setLowPowerDevice] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : 8;
    const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 8;
    setLowPowerDevice(memory <= 4 || cores <= 6);
  }, []);
  const handleWebglInitError = useCallback(() => {
    setWebglFailed(true);
  }, []);

  const shouldRenderCanvas = showCanvas && !reduceMotion && !lowPowerDevice && !webglFailed;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full overflow-x-hidden">
      {/* Deep navy base — matches marketing subpage night shell (/team, /about) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#030b1d] to-[#07142f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-8%,rgba(28,57,187,0.16),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_42%_at_88%_18%,rgba(189,224,254,0.05),transparent_58%)]" />
      {shouldRenderCanvas ? (
        <WebGLScene
          lowPower={lowPowerDevice}
          onInitError={handleWebglInitError}
        />
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 sigma-webgl-film ${shouldRenderCanvas ? "opacity-100" : "opacity-[0.4]"}`}
        aria-hidden
      />
    </div>
  );
};

const AnimatedText = ({
  text,
  className,
  /** Mobile: each word on its own centered line (e.g. "CORE" / "ECOSYSTEM"). Desktop: unchanged word-by-word row. */
  mobileWordStack = false,
  /** Semantic heading — motion + typography unchanged. */
  as,
}: {
  text: string;
  className?: string;
  mobileWordStack?: boolean;
  as?: "h2" | "h3";
}) => {
  const words = text.split(" ").filter((w) => w.length > 0);
  const spanMotion = (i: number) => ({
    initial: { opacity: 1, y: 14 } as const,
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    viewport: { once: true, margin: "-100px" as const },
  });

  if (mobileWordStack) {
    const Wrapper = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.div;
    return (
      <Wrapper
        className={`flex w-full min-w-0 max-w-full flex-col items-center gap-1.5 text-center [overflow-wrap:anywhere] leading-snug md:flex-row md:flex-wrap md:items-baseline md:gap-x-0 md:gap-y-1 md:leading-none md:text-start ${className ?? ""}`}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            {...spanMotion(i)}
            className="max-w-full shrink-0 [word-break:normal] max-md:block max-md:w-full max-md:px-1 md:mb-1 md:mr-3 md:inline-block md:break-words rtl:md:mr-0 rtl:md:ml-3"
          >
            {word}
          </motion.span>
        ))}
      </Wrapper>
    );
  }

  const Wrapper = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.div;

  return (
    <Wrapper
      {...spanMotion(0)}
      className={`max-w-full [overflow-wrap:anywhere] [word-break:normal] ${className ?? ""}`}
    >
      <span className="md:hidden">{text}</span>
      <span className="hidden max-w-full flex-wrap break-words md:flex md:gap-y-1">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            {...spanMotion(i)}
            className="mb-1 mr-3 max-w-full break-words [word-break:normal] md:inline-block rtl:mr-0 rtl:ml-3"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Wrapper>
  );
};

const TiltCard = ({
  title,
  icon: Icon,
  desc,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}) => {
  const { lang } = useLanguage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isNarrow = useIsMobile(1024);
  const reduceMotion = useReducedMotion() ?? false;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.2 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNarrow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const nextRotateX = ((y - centerY) / centerY) * -10;
    const nextRotateY = ((x - centerX) / centerX) * 10;
    rotateX.set(nextRotateX);
    rotateY.set(nextRotateY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isNarrow || reduceMotion ? 0 : smoothRotateX,
        rotateY: isNarrow || reduceMotion ? 0 : smoothRotateY,
        transformStyle: isNarrow || reduceMotion ? "flat" : "preserve-3d",
      }}
      className="group relative flex h-full min-h-[16.75rem] w-full min-w-0 max-w-full flex-col overflow-hidden sharp-edge border border-[#adb5bd]/20 bg-[#212529]/80 p-6 backdrop-blur-md sm:p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c39bb]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: "translateZ(30px)" }}
      >
        <Icon className="mb-6 h-10 w-10 text-[#adb5bd] transition-colors duration-300 group-hover:text-[#bde0fe]" />
        <h3
          className={`mb-3 break-words font-display text-lg font-semibold tracking-wide text-[#e9ecef] sm:text-xl ${localeCardTitle(lang)}`}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#c5ccd4] md:text-[#adb5bd]">{desc}</p>
      </div>
      <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#bde0fe] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#bde0fe] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
};

const HeroSection = ({
  t,
  isRtl,
}: {
  t: SiteTranslations;
  isRtl: boolean;
}) => {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const isCoarsePointer = useIsMobile(1024);
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const glowRafRef = useRef(0);
  const glowPointRef = useRef({ x: 0, y: 0 });
  const glowEnabled = !reduceMotion && !isCoarsePointer;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const paintGlow = useCallback(() => {
    glowRafRef.current = 0;
    const el = glowRef.current;
    if (!el) return;
    const { x, y } = glowPointRef.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    if (!reduceMotion && !isCoarsePointer) {
      pointerX.set((relX / Math.max(rect.width, 1)) * 2 - 1);
      pointerY.set((relY / Math.max(rect.height, 1)) * 2 - 1);
    }
    if (!glowEnabled) return;
    glowPointRef.current.x = relX;
    glowPointRef.current.y = relY;
    if (glowRafRef.current) return;
    glowRafRef.current = requestAnimationFrame(paintGlow);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    if (!sectionRef.current || !glowRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    glowPointRef.current.x = rect.width * 0.5;
    glowPointRef.current.y = rect.height * 0.42;
    if (glowRafRef.current) cancelAnimationFrame(glowRafRef.current);
    glowRafRef.current = requestAnimationFrame(paintGlow);
  };

  useEffect(() => {
    if (!glowEnabled || !sectionRef.current || !glowRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    glowPointRef.current.x = rect.width * 0.5;
    glowPointRef.current.y = rect.height * 0.42;
    paintGlow();
    return () => {
      if (glowRafRef.current) cancelAnimationFrame(glowRafRef.current);
    };
  }, [glowEnabled, paintGlow]);

  return (
  <section
    ref={sectionRef}
    id="hero"
    onMouseMove={handlePointerMove}
    onMouseLeave={handlePointerLeave}
    className="relative flex min-h-[min(100svh,860px)] scroll-mt-24 items-center justify-center overflow-x-clip px-5 pb-16 pt-[max(5.25rem,calc(env(safe-area-inset-top,0px)+4.25rem))] sm:px-6 sm:pb-20 sm:pt-28 md:min-h-screen md:px-16 md:pb-24 md:pt-32 lg:px-24"
  >
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {/* Soft navy mesh + radial glow — fades out before Regions junction */}
      <div className="sigma-hero-mesh absolute inset-0 opacity-[0.16] sm:opacity-[0.2] md:opacity-[0.24]" />
      <div className="absolute inset-0 bg-sigma-radial opacity-[0.14] sm:opacity-[0.18] md:opacity-[0.22] [mask-image:linear-gradient(180deg,#000_0%,#000_72%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_50%_42%,rgba(189,224,254,0.04),transparent_62%)] [mask-image:linear-gradient(180deg,#000_0%,#000_75%,transparent_100%)]" />
      <div
        ref={glowRef}
        className={`sigma-hero-cursor-glow ${glowEnabled ? "is-active" : ""}`}
      />
      <HeroAtmosphere />
    </div>
    <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center text-center">
      <div className="flex w-full min-w-0 max-w-5xl flex-col items-center">
        <div className="mb-10 flex w-full min-w-0 items-center justify-center gap-2 sm:mb-12 sm:gap-3 md:mb-14 md:gap-3.5">
          <HeroEyebrowShard
            side="left"
            scrollProgress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
          />
          <div
            className="h-px w-7 shrink-0 bg-gradient-to-r from-transparent via-[#7daaff]/45 to-transparent sm:w-10 md:w-12"
            aria-hidden
          />
          <span className="sigma-hero-eyebrow min-w-0 max-w-[min(100%,34rem)] break-words text-center text-[11px] font-semibold uppercase leading-snug text-[#e2e7ec] sm:text-xs md:text-[13px]">
            {t.hero.eyebrow}
          </span>
          <div
            className="h-px w-7 shrink-0 bg-gradient-to-l from-transparent via-[#7daaff]/45 to-transparent sm:w-10 md:w-12"
            aria-hidden
          />
          <HeroEyebrowShard
            side="right"
            scrollProgress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        </div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0.92, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`sigma-hero-title mb-5 w-full max-w-5xl break-words text-center text-[clamp(1.65rem,8vw,2.75rem)] font-semibold uppercase leading-[1.1] text-balance [overflow-wrap:anywhere] sm:mb-6 sm:text-6xl sm:leading-none md:mb-7 md:text-8xl lg:text-[5.75rem] xl:text-[6.25rem] ${
            isRtl ? "text-white glow-text" : "sigma-hero-wordmark"
          }`}
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-5 max-w-3xl px-1 font-display text-[0.95rem] font-medium leading-snug text-[#f1f3f5] text-balance sm:mb-5 sm:px-0 sm:text-lg sm:leading-[1.35] md:text-xl ${localeHeroSubtitle(lang)}`}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={`sigma-body-measure mx-auto mb-8 max-w-2xl px-1 text-sm text-[#d0d7df] text-pretty sm:mb-9 sm:px-0 sm:text-[15px] md:text-[#aeb5bd] ${localeHeroSupporting(lang)}`}
        >
          {t.hero.supporting}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full min-w-0 max-w-xl flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
        >
          <MagneticButton
            primary
            isRtl={isRtl}
            onClick={openPartnerIntentFlow}
            fullWidthMobile
          >
            {t.hero.primaryCta}
          </MagneticButton>
          <MagneticButton
            isRtl={isRtl}
            href={t.hero.secondaryHref}
            fullWidthMobile
          >
            {t.hero.secondaryCta}
          </MagneticButton>
        </motion.div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute inset-x-0 bottom-5 z-10 hidden justify-center sm:bottom-7 sm:flex md:bottom-9"
      aria-hidden
    >
      <span className="sigma-hero-scroll-cue" />
    </div>
  </section>
  );
};

const WhatIsSigmaSection = ({ t }: { t: SiteTranslations }) => {
  const pillars = t.whatIsSigma.pillars;
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);

  return (
    <section
      id="what-is-sigma"
      className="sigma-landing-section-shell relative z-10 scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 md:scroll-mt-28 md:px-16 md:py-24 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" />
      <div className="relative z-10 mx-auto max-w-[90rem]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,400px)] lg:gap-10 xl:gap-14">
          <div className="sigma-section-header-glass min-w-0 max-w-3xl px-5 py-5 sm:px-6 sm:py-6">
            <p
              className={`sigma-hero-eyebrow mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(language)}`}
            >
              {t.whatIsSigma.label}
            </p>
            <h2
              className={`max-w-full font-display text-[clamp(1.125rem,4.2vw,1.5rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight sm:leading-tight md:text-4xl lg:max-w-3xl ${localeHeading(language)}`}
            >
              {t.whatIsSigma.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:leading-relaxed md:text-[#b6bcc4]">
              {t.whatIsSigma.description}
            </p>
          </div>

          {/* Decorative ticker cloud — lg+ only */}
          <div className="relative hidden min-h-[420px] w-full max-w-[440px] items-center justify-center self-center justify-self-end lg:flex">
            <CryptoWordCloudVisual />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group rounded-md border border-white/[0.06] bg-white/[0.02] px-6 py-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#1c39bb]/22 hover:bg-white/[0.035] hover:shadow-[0_0_36px_rgba(28,57,187,0.09)]"
            >
              <h3
                className={`font-display text-sm font-semibold uppercase tracking-[0.06em] text-[#e9ecef] md:text-[15px] md:tracking-[0.12em] ${localeCardTitle(language)}`}
              >
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c8d0d8] md:text-[15px] md:text-[#aeb5bd]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <SectionDeepLink href={H.whatIsSigma.href} label={H.whatIsSigma.label} openInNewTab />
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);

  return (
    <section
      id="about"
      className="sigma-landing-section-shell relative z-10 flex min-h-0 scroll-mt-24 flex-col items-center justify-center overflow-hidden px-5 py-16 sm:min-h-[70svh] sm:px-6 sm:py-24 md:min-h-screen md:scroll-mt-28"
    >
      {/* z-0 — soft grid (continues landing navy atmosphere) */}
      <div className="pointer-events-none absolute inset-0 z-0 grid-bg opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_65%_42%_at_50%_20%,rgba(28,57,187,0.09),transparent_68%)]" />

      {/* z-30 — intro glass panel; title is a plain centered block (not AnimatedText word-flex) */}
      <div className="relative z-30 mx-auto flex w-full min-w-0 max-w-[54rem] justify-center px-0">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,rgba(28,57,187,0.18)_0%,rgba(28,57,187,0.06)_42%,transparent_72%)]"
          aria-hidden
        />
        <div className="relative mx-auto w-full overflow-hidden rounded-[1.5rem] border border-[rgba(125,170,255,0.14)] bg-[linear-gradient(160deg,rgba(7,12,24,0.52)_0%,rgba(10,18,36,0.44)_48%,rgba(6,10,20,0.5)_100%)] px-5 py-6 text-center shadow-[0_18px_50px_rgba(2,8,22,0.28),inset_0_1px_0_rgba(210,228,255,0.08)] backdrop-blur-xl sm:rounded-[1.75rem] sm:px-10 sm:py-8 md:rounded-[28px]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_0%,rgba(189,224,254,0.06),transparent_58%)]"
            aria-hidden
          />
          <div className="relative mx-auto flex w-full max-w-full flex-col items-center text-center">
            <p
              className={`sigma-hero-eyebrow mb-6 w-full text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-8 sm:text-[11px] ${localeEyebrow(language)}`}
            >
              {t.about.kicker}
            </p>
            <h3
              className={`mx-auto mb-0 block w-full text-center font-display text-[clamp(1.05rem,3.8vw,1.35rem)] font-semibold uppercase leading-[1.2] tracking-normal text-white text-balance max-md:leading-[1.2] sm:text-3xl sm:leading-[1.15] sm:tracking-tight md:text-5xl lg:text-6xl ${localeHeading(language)}`}
            >
              {t.about.title}
            </h3>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#cfd6de] sm:mt-10 sm:text-base md:text-lg md:text-[#b6bcc4]">
              {t.about.description}
            </p>
            <div className="mt-8 flex w-full justify-center sm:mt-10">
              <SectionDeepLink href={H.about.href} label={H.about.label} openInNewTab />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop float = absolute layer. Mobile/reduced = static row under intro. */}
      <FloatingTeamCards />
    </section>
  );
};

const SERVICE_ICON_MAP: Record<ServiceIconId, LucideIcon> = {
  activity: Activity,
  shield: Shield,
  cpu: Cpu,
  code2: Code2,
};

const DEFAULT_SERVICE_ICONS: ServiceIconId[] = [
  "activity",
  "shield",
  "cpu",
  "code2",
];

const ServicesSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const services = t.services.cards.map((card, i) => {
    const iconId =
      card.icon ??
      DEFAULT_SERVICE_ICONS[Math.min(i, DEFAULT_SERVICE_ICONS.length - 1)]!;
    const Icon = SERVICE_ICON_MAP[iconId];
    return {
      title: card.title,
      icon: Icon,
      desc: card.description,
    };
  });

  return (
    <section
      id="capabilities"
      className="sigma-landing-section-shell relative z-10 min-h-0 scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24 md:scroll-mt-28 md:px-16 md:py-28 lg:px-24"
    >
      <div className="relative z-10 mx-auto min-w-0 max-w-7xl">
        <div className="mx-auto mb-10 max-w-[52rem] md:mb-14">
          <div className="sigma-section-header-glass mx-auto px-5 py-5 text-center sm:px-7 sm:py-6 md:px-8 md:py-7">
            <p
              className={`mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-4 sm:text-[11px] ${localeEyebrow(language)}`}
            >
              {t.services.sectionLabel}
            </p>
            <SectionTitleTypewriter
              text={t.services.headline}
              className={`mx-auto text-center font-display text-[clamp(1.3rem,5.8vw,1.85rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-4xl md:text-5xl md:tracking-tight ${localeHeading(language)}`}
            />
          </div>
        </div>

        <div
          className="grid min-w-0 grid-cols-1 auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 1, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="h-full min-w-0 w-full max-w-full"
            >
              <TiltCard {...service} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center md:mt-14">
          <SectionDeepLink href={H.capabilities.href} label={H.capabilities.label} openInNewTab />
        </div>
      </div>
    </section>
  );
};

const SigmaProSection = ({ t }: { t: SiteTranslations }) => {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const bullets = t.sigmaPro.bullets;
  return (
    <section
      id="sigmapro"
      className="sigma-landing-section-shell relative z-10 scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16 md:scroll-mt-28 md:px-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px max-w-4xl -translate-y-1/2 bg-gradient-to-r from-transparent via-[#1c39bb]/35 to-transparent opacity-60" />
      <div className="relative mx-auto min-w-0 max-w-5xl">
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#10131a]/95 via-[#0a0c12] to-[#07090f] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8 md:p-12 md:ps-14 md:pe-14"
        >
          <div className="pointer-events-none absolute -end-24 -top-28 h-72 w-72 rounded-full bg-[#1c39bb]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -start-16 h-56 w-56 rounded-full bg-[#bde0fe]/[0.06] blur-3xl" />
          <div className="relative">
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#bde0fe]/25 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#bde0fe] sm:text-[11px] ${localeNav(language)}`}
            >
              <Sparkles className="size-3.5 shrink-0 text-[#bde0fe]" strokeWidth={2} />
              {t.sigmaPro.badge}
            </div>
            <h2
              className={`max-w-full font-display text-[clamp(1.15rem,4vw,1.65rem)] font-semibold tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight md:text-4xl lg:text-[2.5rem] ${localeHeading(language)}`}
            >
              {t.sigmaPro.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:leading-relaxed md:text-[#b6bcc4]">
              {t.sigmaPro.description}
            </p>
            <ul className="mt-10 max-w-2xl space-y-5">
              {bullets.map((line, idx) => (
                <li
                  key={idx}
                  className="flex gap-3.5 text-[#e8eaed] md:gap-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-[#1c39bb]/50 bg-[#1c39bb]/15">
                    <Check className="size-3.5 text-[#bde0fe]" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed md:text-[15px] md:leading-[1.65]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[#a0a8b2] md:text-[13px] md:text-[#868e96]">
              {t.sigmaPro.footnote}
            </p>
            <div className="mt-8 flex justify-center">
              <SectionDeepLink href={H.sigmaPro.href} label={H.sigmaPro.label} openInNewTab />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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

const Navbar = () => {
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
    if (navClickScrollingRef.current) return;
    const hero = document.getElementById("hero");
    if (hero) {
      const heroTop =
        hero.getBoundingClientRect().top + window.scrollY;
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
      if (window.scrollY + NAV_SCROLL_GAP >= top - 4) {
        current = id;
      }
    }
    if (current === "connect") {
      setGlassActive(null);
      return;
    }
    setGlassActive(current);
  }, []);

  useEffect(() => {
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
  }, [syncActiveFromScroll, currentLang]);

  const beginNavClickScrollLock = () => {
    navClickScrollingRef.current = true;
    if (navClickTimerRef.current != null) {
      window.clearTimeout(navClickTimerRef.current);
    }
    navClickTimerRef.current = window.setTimeout(() => {
      navClickScrollingRef.current = false;
      navClickTimerRef.current = null;
      syncActiveFromScroll();
    }, NAV_CLICK_SCROLL_LOCK_MS);
  };

  const goToSection = (id: GlassNavId) => {
    beginNavClickScrollLock();
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (id !== "connect") {
      setGlassActive(id);
    } else {
      setGlassActive(null);
    }
  };

  const navigateToSectionFromLink = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: Exclude<GlassNavId, "connect" | "metrics">,
  ) => {
    setMobileOpen(false);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    goToSection(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", navHrefById[id]);
    }
  };

  const scrollToTop = () => {
    beginNavClickScrollLock();
    setMobileOpen(false);
    setGlassActive(null);
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          if (e.target === e.currentTarget) scrollToTop();
        }}
      >
        <div className="relative flex h-[72px] min-w-0 w-[calc(100%-0.75rem)] max-w-[1440px] shrink-0 items-center gap-2 rounded-full border border-white/[0.07] bg-[#07090f]/70 px-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:w-[calc(100%-1.25rem)] sm:gap-3 sm:px-3.5 md:gap-4 md:px-5 lg:gap-5 lg:px-6">
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="relative z-10 flex h-full min-w-0 max-w-[min(42%,9.5rem)] shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-start transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:max-w-none sm:gap-2.5"
            aria-label={t.ui.navChrome.brandAria}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center font-display text-[1.5rem] font-semibold leading-none tracking-tight text-white drop-shadow-[0_0_12px_rgba(189,224,254,0.2)] transition-transform duration-300 hover:scale-[1.02] sm:text-[1.65rem]">
              Σ
            </span>
            <span
              data-latin-tracking
              className="truncate font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c5ccd3] sm:text-lg sm:tracking-[0.12em]"
            >
              SIGMA
            </span>
          </button>

          <div className="relative z-10 ms-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:ms-0 lg:hidden">
            <LanguageSwitcherButton
              currentLang={currentLang}
              setLang={setCurrentLang}
              ariaLabel={t.ui.navChrome.languageMenuAria}
              compactLabel={t.ui.languageSwitcherCompact[currentLang]}
              variant="navCompact"
            />
          </div>

          <div className="relative z-0 hidden min-h-0 min-w-0 flex-1 justify-center overflow-visible px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex">
            <div
              className="inline-flex h-14 w-max flex-nowrap items-center gap-2 rounded-full border border-white/[0.06] bg-[#05070c]/50 px-3 shadow-[0_2px_12px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:gap-2.5 sm:px-3.5 md:gap-3 md:px-4 lg:gap-3.5"
              dir="ltr"
            >
              {primaryNav.map(({ id, icon: Icon, label }) => {
                const isActive = glassActive === id;
                const isPro = id === "sigmapro";
                return (
                  <Link
                    key={id}
                    href={navHrefById[id]}
                    onClick={(event) => navigateToSectionFromLink(event, id)}
                    className={`relative isolate box-border inline-flex h-14 min-h-14 max-h-14 shrink-0 items-center overflow-visible rounded-full border text-start transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c39bb]/45 focus-visible:ring-offset-1 focus-visible:ring-offset-[#07090f] ${
                      isActive
                        ? "min-w-0 border-transparent text-white"
                        : isPro
                          ? "min-w-max border-white/[0.12] bg-white/[0.04] text-[#dce2e8] hover:border-[#1c39bb]/45 hover:bg-white/[0.055] hover:text-white hover:shadow-[0_0_22px_rgba(28,57,187,0.14)]"
                          : "min-w-0 border-transparent text-[#8b939e] hover:bg-white/[0.045] hover:text-[#e6e9ed]"
                    } `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="sigma-glass-nav-pill"
                        className="pointer-events-none absolute inset-0 z-0 rounded-full border border-transparent bg-[#1c39bb]/95 shadow-[0_1px_12px_rgba(28,57,187,0.32)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10 inline-flex h-full min-h-0 items-center gap-1.5 px-2.5 sm:gap-2 sm:px-3 md:px-3.5">
                      <Icon
                        className={`size-[15px] shrink-0 md:size-4 ${
                          isPro && !isActive
                            ? "text-[#bde0fe]/85"
                            : "text-current opacity-[0.92]"
                        }`}
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span
                        className={`max-w-[9.5rem] truncate text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] text-current sm:max-w-none sm:text-[13px] sm:leading-none sm:tracking-[0.07em] md:text-[14px] md:tracking-[0.08em] xl:whitespace-nowrap ${localeNav(currentLang)} ${
                          isPro && !isActive ? "shrink-0 text-[#dce2e8]" : ""
                        }`}
                        title={label}
                      >
                        {label}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 md:gap-4 lg:ms-auto">
            <InsightsOuterLink
              className={`hidden h-12 max-w-[min(11rem,32vw)] shrink-0 items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.03] px-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dce2e8] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background,border-color,box-shadow] hover:border-[#1c39bb]/40 hover:bg-white/[0.055] hover:text-white md:inline-flex md:h-14 md:max-w-[min(200px,28vw)] md:gap-2 md:px-3.5 md:text-[11px] lg:px-4 lg:text-[12px] ${localeNav(currentLang)}`}
            >
              <Newspaper
                className="size-[15px] shrink-0 text-[#bde0fe]/80"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0 truncate">{t.nav.insights}</span>
              <ArrowUpRight
                className="size-3.5 shrink-0 opacity-55"
                strokeWidth={2}
                aria-hidden
              />
            </InsightsOuterLink>

            <button
              type="button"
              onClick={openPartnerIntentFlow}
              className={`hidden h-12 min-h-12 shrink-0 items-center whitespace-nowrap rounded-full border border-[#1c39bb]/48 bg-[linear-gradient(180deg,rgba(28,57,187,0.26)_0%,rgba(28,57,187,0.09)_100%)] px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_22px_rgba(28,57,187,0.14)] transition-[background,box-shadow,border-color,transform] hover:border-[#2a4acd]/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_28px_rgba(28,57,187,0.22)] active:scale-[0.99] md:inline-flex md:h-14 md:min-h-14 md:px-5 md:text-[13px] ${localeCta(currentLang)}`}
            >
              {t.nav.navCta}
            </button>

            <div className="hidden shrink-0 lg:block">
              <LanguageSwitcherButton
                currentLang={currentLang}
                setLang={setCurrentLang}
                ariaLabel={t.ui.navChrome.languageMenuAria}
                compactLabel={t.ui.languageSwitcherCompact[currentLang]}
              />
            </div>

            <button
              type="button"
              className="inline-flex h-12 min-h-12 w-12 min-w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#e9ecef] transition-colors hover:border-white/18 hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="sigma-mobile-nav-panel"
              aria-label={
                mobileOpen ? t.ui.navChrome.closeMenuAria : t.ui.navChrome.openMenuAria
              }
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <X className="size-[18px]" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-[18px]" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </div>
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
        labels={{
          about: t.nav.system,
          capabilities: t.nav.capabilities,
          network: t.nav.network,
          sigmapro: t.nav.sigmaPro,
          contact: t.nav.contact,
        }}
        aboutLabel={pickLang(aboutPageMetaByLang, currentLang).title}
        teamLabel={pickLang(teamPageMetaByLang, currentLang).title}
        workWithSigmaLabel={t.nav.navCta}
      />
    </>
  );
};

export function SigmaLandingClient({
  insights,
}: {
  insights: InsightsPayload;
}) {
  const { t, lang: currentLang, isRtl } = useLanguage();
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <div className="sigma-landing-root">
      <GlobalStyles />
      <WebGLBackground />

      <main
        key={currentLang}
        className={`relative z-10 min-w-0 max-w-[100vw] overflow-x-clip font-body selection:bg-[#1c39bb] selection:text-white ${rtlScriptSurfaceClass(currentLang)}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <SeoHiddenImages lang={currentLang} />
        <div className="origin-top">
          <HeroSection t={t} isRtl={isRtl} />
        </div>

        <CryptoMarketingSection />

        <WhatIsSigmaSection t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <ProofLayer />
        <MidConversionCta isRtl={isRtl} lang={currentLang} />
        <SigmaProSection t={t} />
        <SigmaInsightsSection insights={insights} />
        <div id="connect" className="h-0" aria-hidden />
        <div id="contact" className="h-0" aria-hidden />
        <FinalConversionCta
          isRtl={isRtl}
          lang={currentLang}
          onBookCall={() => setBookCallOpen(true)}
        />
      </main>

      <MarketingFooter />

      <LiveSupportButton
        label={t.ui.liveSupport}
        panel={t.ui.liveSupportPanel}
        unavailableError={getConversion(currentLang).bookCall.unavailableError}
      />

      <BookCallModal
        open={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
        isRtl={isRtl}
        lang={currentLang}
      />
      <PartnerIntentModalHost />

      <Navbar />
    </div>
  );
}
