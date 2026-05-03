"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCryptoAgency } from "@/content/sections/cryptoAgency";

export function CryptoMarketingSection() {
  const { lang } = useLanguage();
  const c = getCryptoAgency(lang);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const tabs = c.tabs;
  const tab = tabs[active] ?? tabs[0]!;

  return (
    <section
      id="crypto-agency-marketing"
      className="relative z-10 scroll-mt-24 border-t border-white/[0.04] bg-[#080a0f]/95 px-5 py-16 backdrop-blur-sm sm:px-6 sm:py-20 md:scroll-mt-28 md:px-16 md:py-24 lg:px-24"
      aria-labelledby="crypto-agency-marketing-heading"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.14]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[90rem]">
        <p className="sigma-hero-eyebrow mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px]">
          {c.eyebrow}
        </p>
        <h2
          id="crypto-agency-marketing-heading"
          className="max-w-full font-display text-[clamp(1.125rem,4.2vw,1.75rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight md:text-4xl"
        >
          {c.title}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base md:text-[#b6bcc4]">
          {c.description}
        </p>

        {/* Tabs — horizontal scroll on narrow viewports */}
        <div className="relative mt-10 min-w-0">
          <div
            className="-mx-5 flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain px-5 pb-2 pt-1 [scrollbar-width:thin] md:mx-0 md:flex-wrap md:gap-3 md:overflow-visible md:px-0"
            role="tablist"
            aria-label={c.regionsAriaLabel}
          >
            {tabs.map((regionTab, i) => {
              const isActive = active === i;
              return (
                <button
                  key={regionTab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`crypto-market-tab-${regionTab.key}`}
                  aria-controls={`crypto-market-panel-${regionTab.key}`}
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 snap-start touch-manipulation items-center gap-2 rounded-full border px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] transition-[background,border-color,box-shadow,color] duration-200 md:py-3 md:text-[12px] ${
                    isActive
                      ? "border-[#1c39bb]/55 bg-[#1c39bb]/18 text-white shadow-[0_0_28px_rgba(28,57,187,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
                      : "border-white/[0.1] bg-[#0c1018]/60 text-[#c5ccd3] backdrop-blur-sm hover:border-[#bde0fe]/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden>
                    {regionTab.flag}
                  </span>
                  <span>{regionTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glass panel */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#bde0fe]/[0.12] bg-[#0a0f18]/[0.55] shadow-[0_18px_56px_rgba(0,0,0,0.42),0_0_40px_rgba(28,57,187,0.12)] backdrop-blur-xl md:mt-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(189,224,254,0.05)_0%,rgba(28,57,187,0.04)_42%,transparent_72%)]" />
          <div className="relative z-10 px-5 py-8 sm:p-10 md:px-12 md:py-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${lang}-${tab.key}`}
                id={`crypto-market-panel-${tab.key}`}
                role="tabpanel"
                aria-labelledby={`crypto-market-tab-${tab.key}`}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -6 }}
                transition={fade}
              >
                <h3 className="font-display text-xl font-semibold tracking-tight text-white text-balance sm:text-2xl md:text-[1.65rem]">
                  {tab.panelTitle}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-[15px] md:leading-relaxed md:text-[#aeb5bd]">
                  {tab.description}
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-relaxed text-[#e8eaed] md:text-[15px]">
                  {tab.bullets.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#1c39bb]/45 bg-[#1c39bb]/12">
                        <Check className="size-3 text-[#bde0fe]" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="min-w-0 text-[#d8dde3]">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link
                    href={tab.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/22 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(28,57,187,0.28)] transition-[background,box-shadow,border-color] hover:border-[#2a4acd]/70 hover:bg-[#1c39bb]/38 hover:shadow-[0_12px_40px_rgba(28,57,187,0.35)]"
                  >
                    {c.cta}
                    <ArrowUpRight className="size-4 opacity-90" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
