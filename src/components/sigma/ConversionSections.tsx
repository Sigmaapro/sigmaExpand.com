"use client";

import { motion } from "framer-motion";
import { getConversion } from "@/content/conversion";
import type { LangCode } from "@/content/types";
import { MagneticButton } from "@/components/sigma/SigmaCtaButton";
import { localeEyebrow, localeHeading, localeMutedTrack } from "@/lib/localeTypography";

export function MidConversionCta({
  isRtl,
  lang,
}: {
  isRtl: boolean;
  lang: LangCode;
}) {
  const c = getConversion(lang).mid;
  return (
    <section
      id="conversion-mid"
      className="relative z-10 scroll-mt-28 border-t border-white/[0.06] px-5 py-12 sm:px-6 sm:py-14 md:px-16 md:py-16 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1c39bb]/[0.07] via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto min-w-0 max-w-3xl rounded-xl border border-white/[0.08] bg-[#0c0f16]/95 px-4 py-8 text-center shadow-[0_0_60px_rgba(28,57,187,0.12)] sm:px-10 sm:py-12"
      >
        <p
          className={`sigma-hero-eyebrow mb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(lang)}`}
        >
          {c.label}
        </p>
        <p
          className={`max-w-full font-display text-[clamp(1.1rem,4vw,1.65rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-3xl sm:tracking-tight sm:leading-tight md:text-[2rem] ${localeHeading(lang)}`}
        >
          {c.headline}
        </p>
        <p
          className={`mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#adb5bd] sm:text-[15px] sm:leading-relaxed ${localeMutedTrack(lang)}`}
        >
          {c.supporting}
        </p>
        <div className="mt-8 flex w-full justify-center px-1 sm:px-0">
          <MagneticButton primary href={c.primaryHref} isRtl={isRtl} fullWidthMobile>
            {c.primaryLabel}
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

export function FinalConversionCta({
  isRtl,
  lang,
  onBookCall,
}: {
  isRtl: boolean;
  lang: LangCode;
  onBookCall: () => void;
}) {
  const c = getConversion(lang).final;
  return (
    <section
      id="conversion-final"
      className="relative z-10 scroll-mt-24 border-t border-white/[0.08] bg-gradient-to-b from-[#0d1018] via-[#0a0c12] to-[#080a0f] px-5 py-16 sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-3xl bg-[#1c39bb]/[0.12] blur-3xl" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto min-w-0 w-full max-w-3xl px-1 text-center sm:px-0"
      >
        <p
          className={`max-w-full font-display text-[clamp(1.1rem,4.2vw,1.75rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:text-4xl sm:tracking-tight sm:leading-[1.1] md:text-5xl ${localeHeading(lang)}`}
        >
          {c.headline}
        </p>
        <p
          className={`mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] sm:text-base md:text-lg ${localeMutedTrack(lang)}`}
        >
          {c.supporting}
        </p>
        <div className="mx-auto mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <MagneticButton primary href={c.primaryHref} isRtl={isRtl} fullWidthMobile>
            {c.primaryLabel}
          </MagneticButton>
          <MagneticButton onClick={onBookCall} isRtl={isRtl} fullWidthMobile>
            {c.secondaryLabel}
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
