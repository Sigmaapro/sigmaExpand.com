"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MagicRings = dynamic(() => import("@/components/react-bits/MagicRings"), {
  ssr: false,
});

const GLARE_DURATION_MS = 3200;
const GLARE_INTERVAL_MS = 3000;
const GLARE_INITIAL_DELAY_MS = 900;

type SigmaHeroTitleMarkProps = {
  title: string;
  className?: string;
};

/**
 * Homepage hero title: one large Magic Ring behind metallic SIGMA.
 * Glare is glyph-clipped via background-clip:text and auto-sweeps on a timer.
 */
export function SigmaHeroTitleMark({ title, className = "" }: SigmaHeroTitleMarkProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [glareActive, setGlareActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setGlareActive(false);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;

    const schedule = (delay: number, fn: () => void) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
    };

    const startSweep = () => {
      setGlareActive(true);
      schedule(GLARE_DURATION_MS, () => {
        setGlareActive(false);
        schedule(GLARE_INTERVAL_MS, startSweep);
      });
    };

    schedule(GLARE_INITIAL_DELAY_MS, startSweep);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return (
    <div
      className={`sigma-hero-title-mark relative mb-1 flex w-full max-w-5xl items-center justify-center sm:mb-1.5 md:mb-2 ${className}`.trim()}
    >
      {/* Inner anchor keeps ring centered on the title when bottom padding is tighter */}
      <div className="relative flex items-center justify-center">
        <div
          className="sigma-hero-magic-ring pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {reduceMotion ? (
            <div className="sigma-hero-magic-ring-fallback absolute inset-[8%] rounded-full" />
          ) : (
            <MagicRings
              color="#1D89BB"
              colorTwo="#1D3ABB"
              ringCount={1}
              speed={0.28}
              attenuation={12}
              lineThickness={2.1}
              baseRadius={0.4}
              radiusStep={0}
              scaleRate={0.045}
              opacity={0.92}
              blur={0}
              noiseAmount={0.02}
              rotation={0}
              ringGap={1.15}
              fadeIn={0.9}
              fadeOut={0.5}
              followMouse={false}
              mouseInfluence={0}
              hoverScale={1}
              parallax={0}
              clickBurst={false}
              paused={false}
            />
          )}
        </div>

        <h1 className="sigma-hero-title relative z-10 break-words text-center text-[clamp(2rem,10vw,3.75rem)] font-semibold uppercase leading-[1.05] text-balance [overflow-wrap:anywhere] sm:text-7xl sm:leading-none md:text-9xl lg:text-[7.5rem] xl:text-[8.25rem]">
          <span
            className={
              glareActive && !reduceMotion
                ? "sigma-hero-metallic sigma-hero-metallic--glare"
                : "sigma-hero-metallic"
            }
          >
            {title}
          </span>
        </h1>
      </div>
    </div>
  );
}
