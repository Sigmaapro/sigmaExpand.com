"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  clientLogos,
  proofByLang,
  type ProofMetric,
  type ProofTestimonial,
} from "@/content/proof";
import LogoLoop, { type LogoItem } from "@/components/react-bits/LogoLoop";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { SectionTitleTypewriter } from "@/components/sigma/SectionTitleTypewriter";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import type { LangCode } from "@/content/types";
import { useLanguage } from "@/context/LanguageContext";
import { localeEyebrow, localeHeading, localeNav } from "@/lib/localeTypography";
import { SigmaBorderGlow } from "@/components/sigma/SigmaBorderGlow";

function LogoLoopCapsule({
  wordmark,
  lang,
}: {
  wordmark: string;
  lang: LangCode;
}) {
  return (
    <SigmaBorderGlow borderRadius={999} compact>
      <span className="sigma-logo-loop__capsule">
        <span className="sigma-logo-loop__sheen" aria-hidden />
        <span className="sigma-logo-loop__refract" aria-hidden />
        <span
          className={`sigma-logo-loop__mark font-display font-semibold uppercase tracking-[0.22em] ${localeNav(lang)}`}
        >
          {wordmark}
        </span>
      </span>
    </SigmaBorderGlow>
  );
}

function MetricCard({
  metric,
  index,
  lang,
  reduceMotion,
}: {
  metric: ProofMetric;
  index: number;
  lang: LangCode;
  reduceMotion: boolean;
}) {
  const isSampleCard = metric.id === "markets";

  const card = (
    <motion.article
      initial={reduceMotion ? false : { opacity: 1, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`sigma-liquid-card group relative flex min-h-0 w-full min-w-0 max-w-full flex-col rounded-lg border px-3.5 py-4 transition-[border-color,box-shadow,transform] duration-300 sm:px-6 sm:py-7 ${
        isSampleCard
          ? "min-h-[9.25rem] overflow-hidden rounded-[10px] border-[rgba(189,224,254,0.25)] bg-[linear-gradient(116deg,rgba(25,34,52,0.48),rgba(9,14,24,0.26)_62%,rgba(8,21,43,0.42))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_42px_rgba(2,8,22,0.34),0_0_24px_rgba(28,57,187,0.16)] backdrop-blur-xl backdrop-saturate-150 hover:border-[rgba(189,224,254,0.5)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_20px_50px_rgba(2,8,22,0.44),0_0_32px_rgba(28,57,187,0.26)] sm:min-h-[10.5rem]"
          : "border-white/[0.07] bg-gradient-to-b from-[#10141c]/95 to-[#0a0c12]/95 hover:border-[#1c39bb]/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      }`}
    >
      {isSampleCard ? (
        <>
          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(189,224,254,0.08)_0%,transparent_30%,rgba(147,197,253,0.055)_52%,transparent_72%)]"
            aria-hidden
          />
        </>
      ) : null}
      <p className="relative z-10 font-display text-[clamp(1.35rem,6.4vw,1.5rem)] font-semibold tabular-nums tracking-tight text-white sm:text-3xl md:text-[2rem]">
        {metric.value}
      </p>
      <p
        className={`relative z-10 mt-2.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-[#a8b2bd] sm:mt-3 sm:text-xs sm:tracking-[0.14em] md:text-[#8b939e] ${localeNav(lang)}`}
      >
        {metric.label}
      </p>
      {metric.note ? (
        <p className="relative z-10 mt-1.5 text-[11px] leading-relaxed text-[#9aa2ac] sm:mt-2 sm:text-[13px] md:text-[#6c757d]">
          {metric.note}
        </p>
      ) : null}
    </motion.article>
  );

  if (isSampleCard) return card;

  return (
    <SigmaBorderGlow borderRadius={8}>
      {card}
    </SigmaBorderGlow>
  );
}

function TestimonialCard({
  item,
  index,
  lang,
  reduceMotion,
}: {
  item: ProofTestimonial;
  index: number;
  lang: LangCode;
  reduceMotion: boolean;
}) {
  const attribution = item.company ? `${item.role}, ${item.company}` : item.role;
  return (
    <SigmaBorderGlow borderRadius={12}>
      <motion.article
        initial={reduceMotion ? false : { opacity: 1, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="sigma-liquid-card flex min-h-0 w-full min-w-0 max-w-full flex-col rounded-xl border border-white/[0.07] bg-[#0c0f14]/90 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.28)] sm:p-7"
      >
        <blockquote className="min-w-0 flex-1 border-s-2 border-[#1c39bb]/45 ps-4 text-sm leading-relaxed text-[#e8eaed] sm:ps-5 sm:text-[15px] sm:leading-[1.68]">
          <span className="text-[#8a939e] md:text-[#6c757d]">“</span>
          {item.quote}
          <span className="text-[#8a939e] md:text-[#6c757d]">”</span>
        </blockquote>
        <div className="mt-8 border-t border-white/[0.06] pt-6">
          <p
            className={`text-[11px] uppercase leading-snug tracking-[0.12em] text-[#a8b0b8] sm:text-xs md:text-[#868e96] ${localeNav(lang)}`}
          >
            {attribution}
          </p>
        </div>
      </motion.article>
    </SigmaBorderGlow>
  );
}

export function ProofLayer({
  showTrustedBy = true,
  showProofInNumbers = true,
  showPartnerFeedback = true,
}: {
  /** Logo loop — preserved, hidden from the current homepage order. */
  showTrustedBy?: boolean;
  /** Metrics strip — the approved Proof by Numbers block. */
  showProofInNumbers?: boolean;
  /** Testimonials — can render independently for homepage order. */
  showPartnerFeedback?: boolean;
} = {}) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const proof = proofByLang[lang] ?? proofByLang.EN;
  const H = getHomeSectionLinks(lang);

  const trustedLoopLogos = useMemo<LogoItem[]>(
    () =>
      clientLogos.map((logo) => ({
        node: <LogoLoopCapsule wordmark={logo.wordmark} lang={lang} />,
        title: logo.wordmark,
        ariaLabel: logo.alt,
        ...(logo.href ? { href: logo.href } : {}),
      })),
    [lang],
  );

  return (
    <div className="sigma-landing-section-shell relative z-10">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.1]" aria-hidden />

      {/* Trusted by — scaled ~2× composition. Hidden on homepage until restored. */}
      {showTrustedBy ? (
      <section
        id="trusted-by"
        className="sigma-trusted-by relative scroll-mt-28 overflow-x-clip px-5 py-28 sm:px-6 sm:py-32 md:px-16 md:py-40 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem] text-center">
          <p
            className={`sigma-hero-eyebrow sigma-trusted-by__eyebrow mb-6 text-[1.125rem] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-7 sm:text-[1.25rem] ${localeEyebrow(lang)}`}
          >
            {proof.trustedBy.sectionLabel}
          </p>
          <h3
            className={`sigma-trusted-by__heading mx-auto max-w-full px-0 font-display text-[clamp(1.85rem,6.5vw,2.85rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:max-w-4xl sm:text-4xl sm:tracking-tight sm:leading-tight md:text-5xl lg:text-6xl ${localeHeading(lang)}`}
          >
            {proof.trustedBy.headline}
          </h3>
          <div className="mx-auto mt-20 min-w-0 w-full max-w-6xl sm:mt-24 md:max-w-7xl">
            {reduceMotion ? (
              <ul
                className="sigma-logo-loop sigma-logo-loop--static flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-8"
                role="list"
                aria-label={proof.trustedBy.headline}
              >
                {clientLogos.map((logo) => (
                  <li key={logo.id} className="min-w-0">
                    <LogoLoopCapsule wordmark={logo.wordmark} lang={lang} />
                  </li>
                ))}
              </ul>
            ) : (
              <LogoLoop
                className="sigma-logo-loop"
                logos={trustedLoopLogos}
                speed={38}
                direction="left"
                gap={100}
                logoHeight={28}
                pauseOnHover
                fadeOut
                fadeOutColor="#070b16"
                ariaLabel={proof.trustedBy.headline}
              />
            )}
          </div>
        </div>
      </section>
      ) : null}

      {/* Proof in numbers — `id="network"` preserves navbar scroll target */}
      {showProofInNumbers ? (
      <section
        id="network"
        className="relative scroll-mt-28 px-5 py-14 sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem]">
          <div className="mx-auto mb-10 max-w-[52rem] sm:mb-12">
            <div className="sigma-section-header-glass mx-auto px-5 py-5 text-center sm:px-7 sm:py-6 md:px-8 md:py-7">
              <p
                className={`sigma-hero-eyebrow mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(lang)}`}
              >
                {proof.proofInNumbers.sectionLabel}
              </p>
              <SectionTitleTypewriter
                text={proof.proofInNumbers.headline}
                className={`mx-auto text-center font-display text-[clamp(1.05rem,3.8vw,1.45rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-2xl sm:tracking-tight sm:leading-tight md:text-3xl ${localeHeading(lang)}`}
              />
            </div>
          </div>
          <div
            id="metrics"
            className="grid min-w-0 grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5"
          >
            {proof.metrics.map((m, i) => (
              <MetricCard key={m.id} metric={m} index={i} lang={lang} reduceMotion={reduceMotion} />
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <SectionDeepLink href={H.proof.href} label={H.proof.label} openInNewTab />
          </div>
        </div>
      </section>
      ) : null}

      {/* Partner feedback — existing implementation; homepage order may place it later. */}
      {showPartnerFeedback ? (
      <section
        id="testimonials"
        className="relative scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem]">
          <div className="mx-auto mb-10 max-w-[52rem] sm:mb-12">
            <div className="sigma-section-header-glass mx-auto px-5 py-5 text-center sm:px-7 sm:py-6 md:px-8 md:py-7">
              <p
                className={`sigma-hero-eyebrow mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(lang)}`}
              >
                {proof.partnerFeedback.sectionLabel}
              </p>
              <SectionTitleTypewriter
                text={proof.partnerFeedback.headline}
                as="h3"
                className={`mx-auto text-center font-display text-[clamp(1.05rem,3.8vw,1.45rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-2xl sm:tracking-tight sm:leading-tight md:text-3xl ${localeHeading(lang)}`}
              />
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {proof.testimonials.map((item, idx) => (
              <TestimonialCard
                key={item.id}
                item={item}
                index={idx}
                lang={lang}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>
      ) : null}
    </div>
  );
}
