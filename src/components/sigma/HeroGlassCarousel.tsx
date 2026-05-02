"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { useLanguage } from "@/context/LanguageContext";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import { ROUTES } from "@/content/global/routes";
import { getAllInsightsPosts } from "@/content/insights";
import { proofByLang } from "@/content/proof";
import type { SiteTranslations } from "@/content/types";

const METRIC_ORDER = ["markets", "partners", "reach", "users", "volume"] as const;
const AUTO_MS = 3000;

const NETWORK_HREF = "/#network";
const CAPABILITIES_HREF = ROUTES.anchor.capabilities;

/** Fixed viewport height — identical for all slides (Insights reference); md+ card only. */
const SLIDE_VIEWPORT_H = "h-[21rem]";

const SCROLL_BODY =
  "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pr-0.5 [scrollbar-width:thin]";

export function HeroGlassCarousel({ t }: { t: SiteTranslations }) {
  const { language } = useLanguage();
  const H = getHomeSectionLinks(language);
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const insightPreview = getAllInsightsPosts().slice(0, 3);
  const proof = proofByLang[language] ?? proofByLang.EN;
  const ecosystemRows = t.services.cards.slice(0, 4);
  const orderedMetrics = METRIC_ORDER.map((id) => proof.metrics.find((m) => m.id === id)).filter(
    (m): m is NonNullable<typeof m> => m != null,
  );
  const hc = t.heroCarousel;

  const fadeMs = reduceMotion ? 0 : 0.32;
  const fadeTransition = { duration: fadeMs, ease: [0.25, 0.1, 0.25, 1] as const };

  const ecosystemCards =
    ecosystemRows.length > 0 ? ecosystemRows : (t.services.cards?.slice(0, 4) ?? []);
  const metricCells =
    orderedMetrics.length > 0
      ? orderedMetrics
      : proof.metrics.slice(0, METRIC_ORDER.length);

  useEffect(() => {
    if (reduceMotion || hoverPause) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % 3);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [reduceMotion, hoverPause]);

  const ctaForSlide = () => {
    if (active === 0) {
      return (
        <SectionDeepLink
          href={H.heroInsights.href}
          label={H.heroInsights.label}
          className="text-xs tracking-[0.14em] text-[#dce8f4] hover:text-white"
          external={/^https?:\/\//i.test(H.heroInsights.href)}
        />
      );
    }
    if (active === 1) {
      return (
        <SectionDeepLink
          href={CAPABILITIES_HREF}
          label={hc.ecosystemCtaLabel}
          className="text-xs tracking-[0.14em] text-[#dce8f4] hover:text-white"
        />
      );
    }
    return (
      <SectionDeepLink
        href={NETWORK_HREF}
        label={hc.proofCtaLabel}
        className="text-xs tracking-[0.14em] text-[#dce8f4] hover:text-white"
      />
    );
  };

  const slideHeader = (eyebrow: ReactNode, title: ReactNode) => (
    <div className="shrink-0">
      <div className="mb-2 flex min-h-[1.625rem] items-center justify-between">
        {eyebrow}
        <div className="h-px w-16 shrink-0 bg-gradient-to-r from-[#1c39bb]/70 to-transparent" />
      </div>
      <h3 className="mb-3 min-h-[2.75rem] font-display text-lg font-semibold leading-snug tracking-tight text-white lg:min-h-[3rem] lg:text-xl">
        <span className="line-clamp-2">{title}</span>
      </h3>
    </div>
  );

  return (
    <div
      className="relative z-10 flex min-h-0 flex-col"
      role="region"
      aria-label={hc.carouselAriaLabel}
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
    >
      <div className={`relative isolate z-[1] shrink-0 overflow-hidden ${SLIDE_VIEWPORT_H}`}>
        {/* Stacked slides: opacity-only crossfade — no unmount, no x-transform, fixed box */}
        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden"
          initial={false}
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={fadeTransition}
          style={{
            pointerEvents: active === 0 ? "auto" : "none",
            zIndex: active === 0 ? 2 : 1,
          }}
          aria-hidden={active !== 0}
        >
          {slideHeader(
            <span className="inline-flex max-w-[min(100%,14rem)] items-center rounded-full border border-[#bde0fe]/30 bg-[#bde0fe]/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9ebff]">
              {t.insights.pageEyebrow}
            </span>,
            t.insights.featuredLabel,
          )}
          <div className={SCROLL_BODY}>
            <div className="grid min-h-0 grid-rows-3 gap-1.5 [grid-template-rows:repeat(3,minmax(0,1fr))]">
              {insightPreview.length > 0 ? (
                insightPreview.map((post) => (
                  <article
                    key={post.slug}
                    className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-2 transition-colors duration-300 group-hover:border-white/[0.11] group-hover:bg-white/[0.03]"
                  >
                    <div className="mb-1 flex shrink-0 items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bde0fe]/90">
                        {post.category}
                      </span>
                      <span className="shrink-0 text-[10px] text-[#aab2ba]">{post.readTime}</span>
                    </div>
                    <h4 className="line-clamp-1 shrink-0 text-sm font-semibold text-[#edf1f5]">{post.title}</h4>
                    <p className="mt-0.5 line-clamp-2 min-h-0 text-[11px] leading-snug text-[#aeb5bd]">
                      {post.excerpt}
                    </p>
                  </article>
                ))
              ) : (
                <div className="row-span-3 flex min-h-0 items-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-[#aeb5bd]">
                  {t.insights.emptyState}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden"
          initial={false}
          animate={{ opacity: active === 1 ? 1 : 0 }}
          transition={fadeTransition}
          style={{
            pointerEvents: active === 1 ? "auto" : "none",
            zIndex: active === 1 ? 2 : 1,
          }}
          aria-hidden={active !== 1}
        >
          {slideHeader(
            <span className="inline-flex max-w-[min(100%,14rem)] items-center rounded-full border border-[#bde0fe]/30 bg-[#bde0fe]/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9ebff]">
              {t.services.sectionLabel}
            </span>,
            t.services.headline,
          )}
          <div className={SCROLL_BODY}>
            <div className="flex min-h-0 flex-col gap-1.5">
              {ecosystemCards.map((card) => (
                <div
                  key={card.title}
                  className="flex shrink-0 items-center overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-1.5 transition-colors duration-300 group-hover:border-white/[0.11] group-hover:bg-white/[0.03]"
                >
                  <p className="line-clamp-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#edf1f5] lg:text-[11px]">
                    {card.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col overflow-hidden"
          initial={false}
          animate={{ opacity: active === 2 ? 1 : 0 }}
          transition={fadeTransition}
          style={{
            pointerEvents: active === 2 ? "auto" : "none",
            zIndex: active === 2 ? 2 : 1,
          }}
          aria-hidden={active !== 2}
        >
          {slideHeader(
            <span className="inline-flex max-w-[min(100%,14rem)] items-center rounded-full border border-[#bde0fe]/30 bg-[#bde0fe]/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9ebff]">
              {proof.proofInNumbers.sectionLabel}
            </span>,
            proof.proofInNumbers.headline,
          )}
          <div className={SCROLL_BODY}>
            <div className="grid min-h-0 grid-cols-2 grid-rows-3 gap-1.5 [grid-template-rows:repeat(3,minmax(0,1fr))]">
              {metricCells.map((m) => (
                <div
                  key={m.id}
                  className="flex min-h-0 flex-col justify-center overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] px-2 py-1 transition-colors duration-300 group-hover:border-white/[0.11]"
                >
                  <p className="truncate text-sm font-semibold tabular-nums text-white">{m.value}</p>
                  <p className="mt-0.5 line-clamp-2 text-[8px] font-medium uppercase leading-tight tracking-[0.06em] text-[#aeb5bd] sm:text-[9px]">
                    {m.label}
                  </p>
                </div>
              ))}
              {metricCells.length % 2 === 1 ? (
                <div aria-hidden className="invisible min-h-0" />
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-1.5" role="group">
          {hc.paginationDotLabels.map((label, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              aria-label={label}
              aria-pressed={active === idx}
              onClick={() => setActive(idx)}
              className={`h-1.5 shrink-0 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/50 ${
                active === idx ? "w-5 bg-[#bde0fe]/70" : "w-1.5 bg-white/[0.25] hover:bg-white/40"
              }`}
            />
          ))}
        </div>
        {ctaForSlide()}
      </div>
    </div>
  );
}
