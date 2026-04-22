"use client";

import dynamic from "next/dynamic";
import { motion, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { FloatingParticles } from "./FloatingParticles";
import { HeroBackdrop } from "./HeroBackdrop";
import { useScrollBridge } from "@/context/ScrollBridge";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMedia";
import { Hero3DFallback } from "./Hero3DFallback";

const SigmaHeroCanvas = dynamic(() => import("./SigmaHeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(52vh,520px)] w-full max-w-[420px] items-center justify-center md:h-[min(62vh,580px)]">
      <div className="h-px w-28 animate-pulse bg-gradient-to-r from-transparent via-persian/50 to-transparent" />
    </div>
  ),
});

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const staggerItem = {
  hidden: { opacity: 1, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { t, isRtl } = useLanguage();
  const h = t.hero;
  const { heroRef, heroScrollProgress } = useScrollBridge();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const heroOpacity = useTransform(
    heroScrollProgress,
    [0, 0.72],
    [1, 0],
    { clamp: true },
  );
  const heroScale = useTransform(
    heroScrollProgress,
    [0, 0.72],
    [1, 0.96],
    { clamp: true },
  );
  const contentY = useTransform(
    heroScrollProgress,
    [0, 0.55],
    [0, -20],
    { clamp: true },
  );

  return (
    <section ref={heroRef} className="relative h-[220vh]">
      <div className="sigma-gradient-bg sticky top-0 flex min-h-screen flex-col overflow-hidden lg:justify-center">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <HeroBackdrop reduced={reduced} />
          <div className="absolute inset-0 sigma-grid opacity-[0.16]" />
          <FloatingParticles reduced={reduced} atmosphere />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-20 pt-24 md:px-8 md:pb-24 md:pt-28 lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-x-14 lg:gap-y-10 lg:px-10 xl:max-w-[72rem] xl:gap-x-16"
        >
          <motion.div
            style={{ y: contentY }}
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className={`relative z-20 flex min-w-0 flex-col items-center text-center lg:max-w-xl lg:justify-self-end lg:items-start lg:pr-4 ${isRtl ? "lg:text-right" : "lg:text-left"}`}
          >
            <motion.p
              variants={staggerItem}
              className="mb-3 max-w-md font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-cadet/85 md:text-xs"
            >
              {h.eyebrow}
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="font-display text-[clamp(3.25rem,10vw,7rem)] font-bold leading-[0.9] tracking-[0] text-white"
            >
              {h.title}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="mt-6 max-w-lg font-display text-lg font-medium leading-snug text-white/95 md:text-xl"
            >
              {h.subtitle}
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <MagneticButton
                variant="primary"
                className="w-full min-w-[200px] sm:w-auto"
                href={h.primaryHref}
              >
                {h.primaryCta}
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                className="w-full min-w-[200px] sm:w-auto"
                href={h.secondaryHref}
              >
                {h.secondaryCta}
              </MagneticButton>
            </motion.div>
          </motion.div>

          <div className="relative z-10 mt-14 flex min-h-0 w-full min-w-0 flex-1 items-center justify-center lg:mt-0 lg:max-h-[min(72vh,640px)] lg:justify-self-start lg:pl-2">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(70vw,320px)] w-[min(70vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-none bg-persian/18 blur-[90px] md:h-[380px] md:w-[380px]" />
            {isMobile || reduced ? <Hero3DFallback /> : <SigmaHeroCanvas />}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-10">
          <span className="font-body text-[10px] uppercase tracking-[0.38em] text-cadet/45">
            {h.scrollHint}
          </span>
          <div className="relative h-12 w-px overflow-hidden rounded-full bg-cadet/20">
            {!reduced ? (
              <motion.span
                className="absolute left-0 right-0 top-0 h-1/2 bg-gradient-to-b from-uranian/90 via-persian/40 to-transparent"
                animate={{ y: ["-100%", "120%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                  repeatDelay: 0.2,
                }}
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-b from-uranian/50 to-transparent" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
