"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ServiceGrowthTimelineProps = {
  title: string;
  headers: string[];
  rows: string[][];
  sectionId?: string;
};

/**
 * Aceternity Timeline — stage names from the growth-stage table (no fabricated dates).
 */
export function ServiceGrowthTimeline({
  title,
  headers,
  rows,
  sectionId = "growth-stages",
}: ServiceGrowthTimelineProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reduceMotion) return;
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const idx = Number((top.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.25, 0.55] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [reduceMotion, rows.length]);

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-28 border-t border-white/[0.06]"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="mx-auto max-w-[1720px] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <h2
          id={`${sectionId}-heading`}
          className="mb-12 max-w-[52rem] font-display text-[clamp(1.65rem,1.35rem+1.1vw,2.75rem)] font-semibold tracking-[-0.02em] text-white text-balance md:mb-16"
        >
          {title}
        </h2>

        <ol className="relative mx-auto max-w-3xl space-y-0">
          <div
            className="pointer-events-none absolute bottom-4 left-[0.7rem] top-4 w-px bg-white/[0.1] md:left-[0.85rem]"
            aria-hidden="true"
          >
            <div
              className="w-px origin-top bg-gradient-to-b from-[#1D89BB] via-[#1D3ABB] to-[#4F1DBB] transition-[height] duration-500 ease-out motion-reduce:transition-none"
              style={{ height: `${((active + 1) / Math.max(rows.length, 1)) * 100}%` }}
            />
          </div>

          {rows.map((row, i) => {
            const emphasized = reduceMotion || active === i;
            return (
              <li
                key={row[0]}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-4 py-6 md:gap-6 md:py-8"
              >
                <span
                  className={`mt-1.5 size-3.5 rounded-full border-2 ${
                    active >= i || reduceMotion
                      ? "border-[#1D89BB] bg-[#1D89BB]"
                      : "border-white/25 bg-[#07090f]"
                  }`}
                  aria-hidden="true"
                />
                <article
                  className={`rounded-2xl border p-5 transition-[border-color,opacity] duration-300 sm:p-6 ${
                    emphasized
                      ? "border-[#1D89BB]/35 bg-[#07090f]/80 opacity-100"
                      : "border-white/[0.09] bg-[#07090f]/45 opacity-70"
                  }`}
                >
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{row[0]}</h3>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
                        {headers[1]}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[#cfd6de]">{row[1]}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
                        {headers[2]}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[#b6bcc4]">{row[2]}</dd>
                    </div>
                  </dl>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
