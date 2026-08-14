"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Channel = { title: string; body: string };

type ServiceChannelStackProps = {
  title: string;
  intro: string;
  items: Channel[];
  sectionId?: string;
};

/**
 * ReactBits Scroll Stack — same sticky stack chrome on all viewports.
 */
export function ServiceChannelStack({
  title,
  intro,
  items,
  sectionId = "channels",
}: ServiceChannelStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reduceMotion) return;
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1))[0];
        if (!top) return;
        const idx = Number((top.target as HTMLElement).dataset.index);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.4] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [reduceMotion, items.length]);

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

        <div
          className="relative mx-auto max-w-3xl"
          style={{ minHeight: reduceMotion ? undefined : `${items.length * 36}vh` }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-index={i}
              className={reduceMotion ? "mb-5" : "sticky top-[max(5.5rem,env(safe-area-inset-top)+4.25rem)] mb-[12vh] sm:top-[22vh] sm:mb-[18vh]"}
              style={
                reduceMotion
                  ? undefined
                  : {
                      zIndex: i + 1,
                      transform: `scale(${1 - (items.length - 1 - i) * 0.012})`,
                    }
              }
            >
              <ChannelCard item={item} index={i} elevated={active === i || reduceMotion} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelCard({
  item,
  index,
  elevated,
}: {
  item: Channel;
  index: number;
  elevated: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border bg-[#080b12]/95 p-6 shadow-[0_20px_50px_rgba(2,8,22,0.45)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 sm:p-8 ${
        elevated
          ? "border-[#1D89BB]/40 shadow-[0_24px_60px_rgba(2,8,22,0.55),0_0_0_1px_rgba(29,137,187,0.12)]"
          : "border-white/[0.1]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <svg viewBox="0 0 64 40" className="h-8 w-12 text-[#1D3ABB]/70" aria-hidden="true">
          <path
            d="M4 28 C16 8, 28 8, 40 22 S56 36, 60 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{item.body}</p>
    </article>
  );
}
