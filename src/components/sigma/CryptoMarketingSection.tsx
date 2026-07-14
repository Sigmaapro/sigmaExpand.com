"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { RegionalMarketMap } from "@/components/sigma/RegionalMarketMap";
import {
  APPROVED_MARKET_PLACE_TOKENS,
  extractApprovedPlaceTokens,
  RegionCountryPills,
  RegionMarqueeBand,
  offsetPlaceTokens,
} from "@/components/sigma/RegionMarqueeBand";
import { useLanguage } from "@/context/LanguageContext";
import {
  getCryptoAgency,
  type CryptoMarketTabKey,
} from "@/content/sections/cryptoAgency";
import {
  localeCta,
  localeEyebrow,
  localeHeading,
} from "@/lib/localeTypography";

/** Premium once-per-viewport title typewriter. Copy unchanged. */
function useSectionTitleTypewriter(
  fullText: string,
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
) {
  const [typed, setTyped] = useState(enabled ? "" : fullText);
  const [done, setDone] = useState(!enabled);
  const [started, setStarted] = useState(!enabled);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setTyped(fullText);
      setDone(true);
      setStarted(true);
      return;
    }

    setTyped("");
    setDone(false);
    setStarted(false);
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, fullText, sectionRef]);

  useEffect(() => {
    if (!enabled || !started) return;

    const id = ++runIdRef.current;
    let i = 0;
    setTyped("");
    setDone(false);

    const stepMs = Math.min(
      42,
      Math.max(22, Math.floor(1800 / Math.max(fullText.length, 1))),
    );
    const timer = window.setInterval(() => {
      if (runIdRef.current !== id) return;
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        window.clearInterval(timer);
        setDone(true);
      }
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [enabled, started, fullText]);

  return { typed, done, showCursor: enabled && started && !done };
}

export function CryptoMarketingSection() {
  const { lang, isRtl } = useLanguage();
  const c = getCryptoAgency(lang);
  const [active, setActive] = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabs = c.tabs;
  const tab = tabs[active] ?? tabs[0]!;

  const { typed, done, showCursor } = useSectionTitleTypewriter(
    c.title,
    !reduceMotion,
    sectionRef,
  );

  const countryTokens = useMemo(() => {
    const blob = [
      c.description,
      ...tabs.flatMap((t) => [t.panelTitle, t.description, ...t.bullets]),
    ].join(" ");
    const found = new Set(extractApprovedPlaceTokens(blob));
    return APPROVED_MARKET_PLACE_TOKENS.filter((token) => found.has(token));
  }, [c.description, tabs]);

  const fadeEase = [0.22, 1, 0.36, 1] as const;
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: fadeEase };

  const selectKey = useCallback(
    (key: CryptoMarketTabKey) => {
      const index = tabs.findIndex((t) => t.key === key);
      if (index < 0 || index === active) return;
      setSlideDir(index > active ? 1 : -1);
      setActive(index);
    },
    [active, tabs],
  );

  const dirMul = isRtl ? -1 : 1;
  const panelEnterX = reduceMotion ? 0 : slideDir * 18 * dirMul;
  const panelExitX = reduceMotion ? 0 : -slideDir * 14 * dirMul;

  return (
    <section
      ref={sectionRef}
      id="crypto-agency-marketing"
      className="relative z-10 scroll-mt-24 overflow-hidden border-t border-white/[0.04] border-b border-white/[0.06] bg-[#080a0f]/95 backdrop-blur-sm md:scroll-mt-28"
      aria-labelledby="crypto-agency-marketing-heading"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.14]" aria-hidden />

      <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 md:px-16 md:pb-12 md:pt-14 lg:px-24">
        {/* Section intro — page background, not inside glass */}
        <div className="min-w-0">
          <p
            className={`sigma-hero-eyebrow mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(lang)}`}
          >
            {c.eyebrow}
          </p>
          <h2
            id="crypto-agency-marketing-heading"
            className={`relative max-w-full font-display text-[clamp(1.125rem,4.2vw,1.75rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight md:text-4xl ${localeHeading(lang)}`}
          >
            <span className="invisible select-none" aria-hidden>
              {c.title}
            </span>
            <span
              className="absolute inset-0"
              aria-hidden={!done && !reduceMotion}
            >
              {reduceMotion || done ? c.title : typed}
              {showCursor ? (
                <span
                  className="ms-0.5 inline-block h-[0.92em] w-[0.08em] translate-y-[0.08em] bg-[#38bdf8] align-baseline opacity-90 animate-pulse"
                  aria-hidden
                />
              ) : null}
            </span>
            {!reduceMotion && !done ? (
              <span className="sr-only">{c.title}</span>
            ) : null}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:text-[#b6bcc4]">
            {c.description}
          </p>
        </div>

        {/* Glass card — map + detail only */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#bde0fe]/[0.12] bg-[#0a0f18]/[0.55] shadow-[0_18px_56px_rgba(0,0,0,0.42),0_0_40px_rgba(28,57,187,0.12)] backdrop-blur-xl sm:mt-9 md:mt-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(189,224,254,0.05)_0%,rgba(28,57,187,0.04)_42%,transparent_72%)]" />

          <div className="relative z-10 grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="min-w-0 border-b border-white/[0.06] px-4 py-6 sm:px-6 sm:py-8 lg:border-b-0 lg:border-e lg:border-white/[0.06] lg:px-8 lg:py-10">
              <RegionalMarketMap
                tabs={tabs}
                activeKey={tab.key}
                onSelectKey={selectKey}
                regionsAriaLabel={c.regionsAriaLabel}
                lang={lang}
              />
            </div>

            <div className="relative min-h-[min(100%,280px)] px-5 py-8 sm:min-h-[300px] sm:p-10 md:min-h-[320px] md:px-12 md:py-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${lang}-${tab.key}`}
                  id={`crypto-market-panel-${tab.key}`}
                  role="region"
                  aria-label={tab.panelTitle}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                    x: panelEnterX,
                    y: reduceMotion ? 0 : 6,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: reduceMotion ? 1 : 0,
                    x: panelExitX,
                    y: reduceMotion ? 0 : -4,
                  }}
                  transition={transition}
                  className="min-w-0"
                >
                  <h3
                    className={`font-display text-xl font-semibold tracking-tight text-white text-balance sm:text-2xl md:text-[1.65rem] ${localeHeading(lang)}`}
                  >
                    {tab.panelTitle}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#cfd6de] [overflow-wrap:anywhere] md:text-[15px] md:leading-relaxed md:text-[#aeb5bd]">
                    {tab.description}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm leading-relaxed text-[#e8eaed] md:text-[15px]">
                    {tab.bullets.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#1c39bb]/45 bg-[#1c39bb]/12">
                          <Check
                            className="size-3 text-[#bde0fe]"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                        </span>
                        <span className="min-w-0 break-words text-[#d8dde3] [overflow-wrap:anywhere]">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      href={tab.href}
                      className={`inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/22 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(28,57,187,0.28)] transition-[background,box-shadow,border-color] hover:border-[#2a4acd]/70 hover:bg-[#1c39bb]/38 hover:shadow-[0_12px_40px_rgba(28,57,187,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/50 ${localeCta(lang)}`}
                    >
                      {c.cta}
                      <ArrowUpRight
                        className="size-4 shrink-0 opacity-90 rtl:-scale-x-100"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {countryTokens.length > 0 ? (
        <div className="relative z-10 flex w-full max-w-[100vw] flex-col gap-1 pt-2 sm:gap-1.5 sm:pt-3 md:gap-2">
          <RegionMarqueeBand
            direction="ltr"
            durationSec={52}
            framed={false}
            compact
          >
            <RegionCountryPills countries={countryTokens} />
          </RegionMarqueeBand>
          <RegionMarqueeBand
            direction="rtl"
            durationSec={58}
            framed={false}
            compact
          >
            <RegionCountryPills countries={offsetPlaceTokens(countryTokens, 5)} />
          </RegionMarqueeBand>
          <RegionMarqueeBand
            direction="ltr"
            durationSec={64}
            framed={false}
            compact
          >
            <RegionCountryPills countries={offsetPlaceTokens(countryTokens, 9)} />
          </RegionMarqueeBand>
        </div>
      ) : null}

      <div
        className="relative z-10 h-6 bg-gradient-to-b from-[#080a0f]/70 to-transparent sm:h-8 md:h-10"
        aria-hidden
      />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #crypto-agency-marketing .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
