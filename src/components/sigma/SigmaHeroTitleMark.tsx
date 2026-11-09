"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GLARE_DURATION_MS = 3200;
const GLARE_INTERVAL_MS = 3000;
const GLARE_INITIAL_DELAY_MS = 900;

type SigmaHeroTitleMarkProps = {
  title: string;
  className?: string;
  /** When false, the wordmark stays visual and the page heading lives elsewhere. */
  asHeading?: boolean;
};

/**
 * Homepage hero title: metallic SIGMA with a glyph-clipped glare sweep.
 */
export function SigmaHeroTitleMark({ title, className = "", asHeading = true }: SigmaHeroTitleMarkProps) {
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

  const WordmarkTag = asHeading ? "h1" : "p";

  return (
    <div
      className={`sigma-hero-title-mark relative mb-1 flex w-full max-w-5xl items-center justify-center sm:mb-1.5 md:mb-2 ${className}`.trim()}
    >
      <div className="relative flex items-center justify-center">
        <WordmarkTag className="sigma-hero-title relative z-10 m-0 break-words text-center text-[clamp(2rem,10vw,3.75rem)] font-semibold uppercase leading-[1.05] text-balance [overflow-wrap:anywhere] sm:text-7xl sm:leading-none md:text-9xl lg:text-[7.5rem] xl:text-[8.25rem]">
          <span
            className={
              glareActive && !reduceMotion
                ? "sigma-hero-metallic sigma-hero-metallic--glare"
                : "sigma-hero-metallic"
            }
          >
            {title}
          </span>
        </WordmarkTag>
      </div>
    </div>
  );
}
