"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";

type ServiceGrowthLoopProps = {
  title: string;
  intro: string;
  steps: LabeledItem[];
  outro: string | null;
  sectionId?: string;
};

const PANEL_PATHS = [
  // acquisition — converging rays
  "M20 80 L80 40 M20 80 L80 80 M20 80 L80 120",
  // distribution — network nodes
  "M40 40 L80 80 L40 120 M80 80 L140 50 M80 80 L140 110",
  // activation — funnel
  "M30 30 L150 30 L110 90 L70 90 Z M70 90 L90 140 L110 90",
  // retention — loop
  "M60 80 A40 40 0 1 1 100 80 M100 80 L115 65 M100 80 L115 95",
  // volume — rising bars
  "M40 140 V90 M70 140 V60 M100 140 V40 M130 140 V70",
];

/**
 * Aceternity Sticky Scroll Reveal — adapted for growth-loop stages.
 * Same sticky SVG panel on all viewports; mobile stacks panel above steps.
 */
export function ServiceGrowthLoop({
  title,
  intro,
  steps,
  outro,
  sectionId = "growth-loop",
}: ServiceGrowthLoopProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reduceMotion) return;
    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [reduceMotion, steps.length]);

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-28 border-t border-white/[0.06]"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="mx-auto max-w-[1720px] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <header className="mb-10 max-w-[52rem] md:mb-14">
          <h2
            id={`${sectionId}-heading`}
            className="font-display text-[clamp(1.65rem,1.35rem+1.1vw,2.75rem)] font-semibold tracking-[-0.02em] text-white text-balance"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-[46rem] text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-[#cfd6de]">
            {intro}
          </p>
        </header>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div
            className={`order-first self-start lg:order-none ${
              reduceMotion ? "" : "sticky top-[max(5.5rem,env(safe-area-inset-top)+4.5rem)] lg:top-[28vh]"
            }`}
          >
            <div className="relative flex h-[min(14rem,36svh)] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.1] bg-[#05070c]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-[min(18rem,40svh)] lg:h-[min(22rem,42vh)]">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_40%,rgba(29,58,187,0.22),transparent_70%)]"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 180 160"
                className="relative z-[1] h-[70%] w-[70%] text-[#1D89BB]"
                aria-hidden="true"
              >
                <path
                  d={PANEL_PATHS[active] ?? PANEL_PATHS[0]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              </svg>
              <p className="absolute bottom-4 left-0 right-0 px-3 text-center font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bde0fe]/80 sm:bottom-5 sm:text-xs sm:tracking-[0.22em]">
                {steps[active]?.title}
              </p>
            </div>
          </div>

          <ol className={`m-0 list-none space-y-10 p-0 lg:space-y-24 ${reduceMotion ? "" : "lg:pb-32"}`}>
            {steps.map((step, i) => (
              <li
                key={step.full}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={`transition-opacity duration-300 ${
                  reduceMotion || active === i ? "opacity-100" : "opacity-45"
                }`}
              >
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-2 font-display text-xl font-semibold tracking-tight sm:mt-3 sm:text-2xl ${
                    reduceMotion || active === i ? "text-white" : "text-[#cfd6de]"
                  }`}
                >
                  {step.title}
                </h3>
                {step.body ? (
                  <p className="mt-3 max-w-[34rem] text-sm leading-relaxed text-[#b6bcc4] sm:mt-4 md:text-[15px]">
                    {step.body}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        {outro ? (
          <p className="mt-12 max-w-[46rem] text-[15px] leading-relaxed text-[#cfd6de] md:mt-16 md:text-base">
            {outro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
