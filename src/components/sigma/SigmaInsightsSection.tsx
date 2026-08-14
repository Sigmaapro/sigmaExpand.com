"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { LiveSupportButton } from "@/components/sigma/LiveSupportButton";
import { ProofLayer } from "@/components/sigma/ProofLayer";
import { MagneticButton } from "@/components/sigma/SigmaCtaButton";
import { MidConversionCta, FinalConversionCta } from "@/components/sigma/ConversionSections";
import { BookCallModal } from "@/components/sigma/BookCallModal";
import { PartnerIntentModalHost, openPartnerIntentFlow } from "@/components/partner/PartnerIntentModal";
import { getConversion } from "@/content/conversion";
import { TeamDomeGallery } from "@/components/sigma/TeamDomeGallery";
import { CryptoMarketingSection } from "@/components/sigma/CryptoMarketingSection";
import { SectionTitleTypewriter } from "@/components/sigma/SectionTitleTypewriter";
import { SeoHiddenImages } from "@/components/seo/SeoHiddenImages";
import GlassSurface from "@/components/react-bits/GlassSurface";
import { SigmaBorderGlow } from "@/components/sigma/SigmaBorderGlow";
import { SigmaHeroCurvedLoop, SigmaHeroCurvedLoopSpacer } from "@/components/sigma/SigmaHeroCurvedLoop";
import { SigmaHeroTitleMark } from "@/components/sigma/SigmaHeroTitleMark";
import { AnimatedContent } from "@/components/react-bits/AnimatedContent";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import * as THREE from "three";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Activity,
  Shield,
  Cpu,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconId, SiteTranslations } from "@/content/types";
import { MarketingFooter } from "@/components/site/MarketingFooter";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
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
import { SigmaSiteNavbar } from "@/components/sigma/SigmaSiteNavbar";


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
    <SigmaBorderGlow borderRadius={16}>
      <article className="sigma-liquid-card group relative flex h-full w-[min(20.5rem,82vw)] shrink-0 flex-col overflow-hidden rounded-2xl border border-[rgba(147,197,253,0.16)] bg-[linear-gradient(165deg,rgba(7,12,24,0.88)_0%,rgba(10,18,34,0.82)_50%,rgba(6,10,18,0.9)_100%)] shadow-[0_20px_56px_rgba(2,8,22,0.45),inset_0_1px_0_rgba(210,228,255,0.1)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:border-[rgba(189,224,254,0.32)] hover:shadow-[0_24px_64px_rgba(2,8,22,0.55),0_0_40px_rgba(28,57,187,0.18)] sm:w-[22rem] lg:w-[23.5rem]">
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
    </SigmaBorderGlow>
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
          reduceMotion ? (
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
      background-color: transparent;
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
      {/* Soft navy film over Gradient Blinds — keeps WebGL readable without hiding ambient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020817]/55 via-[#030b1d]/40 to-[#07142f]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-8%,rgba(28,57,187,0.12),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_42%_at_88%_18%,rgba(189,224,254,0.04),transparent_58%)]" />
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
      className={`flex max-w-full flex-wrap gap-y-1 [overflow-wrap:anywhere] [word-break:normal] ${className ?? ""}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          {...spanMotion(i)}
          className="mb-1 mr-3 max-w-full break-words [word-break:normal] md:inline-block rtl:mr-0 rtl:ml-3"
        >
          {word}
        </motion.span>
      ))}
    </Wrapper>
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

  return (
    <section
      id="hero"
      className="relative flex min-h-[min(100svh,860px)] scroll-mt-24 items-center justify-start overflow-x-clip px-5 pb-16 pt-[max(5.5rem,calc(env(safe-area-inset-top,0px)+4.5rem))] sm:px-6 sm:pb-20 sm:pt-24 md:min-h-screen md:px-16 md:pb-24 md:pt-[6.5rem] lg:px-24"
    >
      {/* Replace the simple slot inside SigmaHeroCurvedLoop when the new component is ready. */}
      <SigmaHeroCurvedLoop text={t.hero.eyebrow} />

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center text-center">
        <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col items-center">
          <SigmaHeroCurvedLoopSpacer />

          <div className="sigma-hero-content-group mx-auto flex w-full min-w-0 flex-col items-center text-center">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0.92, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <SigmaHeroTitleMark title={t.hero.title} />
            </motion.div>

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

            <div className="flex w-full min-w-0 max-w-xl flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
              <AnimatedContent
                className="w-full sm:w-auto"
                direction="horizontal"
                distance={200}
                duration={2}
                delay={0.2}
                ease="bounce.out"
                disappearEase="elastic.in(1, 0.3)"
                reverse
              >
                <MagneticButton
                  primary
                  liquid
                  isRtl={isRtl}
                  onClick={openPartnerIntentFlow}
                  fullWidthMobile
                >
                  {t.hero.primaryCta}
                </MagneticButton>
              </AnimatedContent>
              <AnimatedContent
                className="w-full sm:w-auto"
                direction="horizontal"
                distance={200}
                duration={2}
                delay={0.2}
                ease="bounce.out"
                disappearEase="elastic.in(1, 0.3)"
              >
                <MagneticButton
                  liquid
                  isRtl={isRtl}
                  href={t.hero.secondaryHref}
                  fullWidthMobile
                >
                  {t.hero.secondaryCta}
                </MagneticButton>
              </AnimatedContent>
            </div>
          </div>
        </div>
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
      className="sigma-what-is-ripple relative z-10 scroll-mt-24 overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:scroll-mt-28 md:px-16 md:py-24 lg:px-24"
    >
      <div className="relative z-10 mx-auto max-w-[90rem]">
        <div className="sigma-liquid-card sigma-what-is-glass min-w-0 max-w-3xl px-5 py-5 sm:px-6 sm:py-6">
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

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {pillars.map((pillar, idx) => (
            <SigmaBorderGlow key={pillar.title} borderRadius={8}>
              <motion.div
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="sigma-liquid-card sigma-what-is-glass group px-6 py-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[rgba(29,137,187,0.38)] hover:bg-[rgba(10,18,40,0.58)] hover:shadow-[0_0_36px_rgba(29,58,187,0.14)]"
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
            </SigmaBorderGlow>
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
      className="sigma-landing-section-shell relative z-10 flex min-h-[min(92svh,720px)] scroll-mt-24 flex-col items-center justify-center overflow-hidden px-5 py-16 sm:min-h-[70svh] sm:px-6 sm:py-24 md:min-h-screen md:scroll-mt-28"
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
        <SigmaBorderGlow borderRadius={28}>
          <div className="sigma-liquid-card relative mx-auto w-full overflow-hidden rounded-[1.5rem] border border-[rgba(125,170,255,0.14)] bg-[linear-gradient(160deg,rgba(7,12,24,0.52)_0%,rgba(10,18,36,0.44)_48%,rgba(6,10,20,0.5)_100%)] px-5 py-6 text-center shadow-[0_18px_50px_rgba(2,8,22,0.28),inset_0_1px_0_rgba(210,228,255,0.08)] backdrop-blur-xl sm:rounded-[1.75rem] sm:px-10 sm:py-8 md:rounded-[28px]">
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
        </SigmaBorderGlow>
      </div>

      {/* Desktop = Dome Gallery behind panel. Mobile/reduced = static photo grid. */}
      <TeamDomeGallery />
    </section>
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
  const lightGlass = isNarrow && !reduceMotion;
  const simplifyGlass = reduceMotion;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.2 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isNarrow || reduceMotion || !cardRef.current) return;
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
    <SigmaBorderGlow borderRadius={0}>
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isNarrow || reduceMotion ? 0 : smoothRotateX,
        rotateY: isNarrow || reduceMotion ? 0 : smoothRotateY,
        transformStyle: isNarrow || reduceMotion ? "flat" : "preserve-3d",
      }}
      className="group relative h-full min-h-[16.75rem] w-full min-w-0 max-w-full"
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={0}
        borderWidth={0.055}
        brightness={simplifyGlass ? 11 : lightGlass ? 14 : 16}
        opacity={simplifyGlass ? 0.9 : lightGlass ? 0.92 : 0.93}
        blur={simplifyGlass ? 7 : lightGlass ? 8 : 10}
        displace={simplifyGlass ? 0 : lightGlass ? 0.2 : 0.32}
        backgroundOpacity={simplifyGlass ? 0.52 : lightGlass ? 0.44 : 0.4}
        saturation={simplifyGlass ? 1.06 : lightGlass ? 1.12 : 1.18}
        distortionScale={simplifyGlass ? 0 : lightGlass ? -52 : -78}
        redOffset={0}
        greenOffset={simplifyGlass ? 0 : lightGlass ? 3 : 5}
        blueOffset={simplifyGlass ? 0 : lightGlass ? 8 : 12}
        xChannel="R"
        yChannel="G"
        mixBlendMode="difference"
        forceFallback={simplifyGlass}
        className="sigma-fluid-glass sigma-capabilities-glass sharp-edge h-full min-h-[16.75rem] w-full min-w-0"
        contentClassName="!flex !h-full !min-h-[16.75rem] !w-full !flex-col !items-stretch !justify-start !p-6 sm:!p-8"
      >
        <div className="sigma-capabilities-glass__sheen" aria-hidden />
        {!simplifyGlass ? (
          <div className="sigma-capabilities-glass__refract" aria-hidden />
        ) : null}
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
          <p className="text-sm leading-relaxed text-[#d0d7df] md:text-[#c5ccd4]">{desc}</p>
        </div>
        <div className="absolute left-0 top-0 z-10 h-2 w-2 border-l border-t border-[#bde0fe]/70 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 z-10 h-2 w-2 border-b border-r border-[#bde0fe]/70 opacity-0 transition-opacity group-hover:opacity-100" />
      </GlassSurface>
    </motion.div>
    </SigmaBorderGlow>
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
  // Exchanges & Platforms + KOLs & Creators only (first two cards).
  const services = t.services.cards.slice(0, 2).map((card, i) => {
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
      className="sigma-landing-section-shell relative z-10 min-h-0 scroll-mt-24 overflow-hidden px-5 py-14 sm:px-6 sm:py-16 md:scroll-mt-28 md:px-12 md:py-20 lg:px-20"
    >
      <div className="relative z-10 mx-auto min-w-0 max-w-[1280px]">
        <div className="mx-auto mb-8 max-w-[52rem] md:mb-10">
          <div className="sigma-section-header-glass mx-auto px-5 py-4 text-center sm:px-7 sm:py-5 md:px-8 md:py-6">
            <p
              className={`mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-3 sm:text-[11px] ${localeEyebrow(language)}`}
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
          className="mx-auto grid min-w-0 max-w-4xl grid-cols-1 auto-rows-fr gap-6 md:grid-cols-2"
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
        <div className="mt-8 flex justify-center md:mt-10">
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
        <SigmaBorderGlow borderRadius={16}>
        <motion.div
          initial={{ opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="sigma-liquid-card relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#10131a]/95 via-[#0a0c12] to-[#07090f] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8 md:p-12 md:ps-14 md:pe-14"
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
        </SigmaBorderGlow>
      </div>
    </section>
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

      <SigmaSiteNavbar />
    </div>
  );
}
