"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";
import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";

type ServiceAudienceBentoProps = {
  title: string;
  intro: string;
  items: LabeledItem[];
};

const AUDIENCE_IMAGES = [
  "/images/services/audience/emerging-exchanges.png",
  "/images/services/audience/scaling-exchanges.png",
  "/images/services/audience/brokers.png",
  "/images/services/audience/specialized-platforms.png",
] as const;

const IMAGE_TRANSITION = {
  duration: 0.46,
  ease: [0.22, 1, 0.36, 1],
} as const;

function clampIndex(value: number, itemCount: number) {
  return Math.min(itemCount - 1, Math.max(0, value));
}

/**
 * Interactive audience showcase.
 *
 * The imported document remains the source of truth for all copy. The left
 * column acts as the navigation and the transparent illustration stage stays
 * synchronized through hover, focus, click, and scroll progress.
 */
export function ServiceAudienceBento({ title, intro, items }: ServiceAudienceBentoProps) {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start 74%", "end 26%"],
  });

  useEffect(() => {
    if (items.length < 2) return;

    return scrollYProgress.on("change", (progress) => {
      const nextIndex = clampIndex(
        Math.floor(Math.min(progress, 0.9999) * items.length),
        items.length,
      );
      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    });
  }, [items.length, scrollYProgress]);

  if (items.length === 0) return null;

  const safeActiveIndex = clampIndex(activeIndex, items.length);
  const activeItem = items[safeActiveIndex] ?? items[0];
  const activeImage = AUDIENCE_IMAGES[safeActiveIndex] ?? AUDIENCE_IMAGES[0];

  return (
    <ServiceSectionShell id="audience" atmosphere="soft">
      <ServiceSectionHeading id="audience" title={title} intro={intro} />

      <div ref={showcaseRef} className="relative mt-10 min-h-0 sm:mt-12 md:mt-12 md:min-h-[155svh]">
        <div className="relative md:sticky md:top-24 md:flex md:min-h-[calc(100svh-8rem)] md:items-center">
          <div className="grid w-full gap-8 sm:gap-10 md:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] md:items-center md:gap-10 lg:gap-16 xl:grid-cols-[minmax(22rem,0.82fr)_minmax(0,1.18fr)]">
            <div className="relative z-10 order-2 md:order-1">
              <div
                className="absolute bottom-1 left-0 top-1 w-px bg-white/[0.12]"
                aria-hidden="true"
              >
                <motion.div
                  className="absolute left-0 top-0 w-px origin-top bg-[#1D89BB] shadow-[0_0_18px_rgba(29,137,187,0.9)]"
                  animate={{ height: `${((safeActiveIndex + 1) / items.length) * 100}%` }}
                  transition={
                    reducedMotion ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }
                  }
                />
              </div>

              <div role="tablist" aria-label={title} className="space-y-1 pl-7 sm:pl-9">
                {items.map((item, index) => {
                  const isActive = index === safeActiveIndex;

                  return (
                    <motion.button
                      key={item.full}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="audience-visual"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group relative block w-full border-b border-white/[0.09] py-5 text-left outline-none last:border-b-0 sm:py-7 focus-visible:ring-2 focus-visible:ring-[#55B0F7]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050914]"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.58 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.25 }}
                    >
                      <span
                        className={`absolute -left-7 top-0 h-full w-px transition-opacity duration-300 sm:-left-9 ${
                          isActive
                            ? "bg-[#55B0F7] opacity-100 shadow-[0_0_16px_rgba(85,176,247,0.9)]"
                            : "opacity-0"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55B0F7]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-3 block font-display text-[clamp(1.25rem,1.05rem+0.65vw,1.8rem)] font-semibold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#dff2ff]">
                        {item.title}
                      </span>
                      <span className="mt-3 block max-w-[32rem] text-[clamp(0.95rem,0.89rem+0.18vw,1.08rem)] leading-[1.75] text-[#cfd6de]">
                        {item.body}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative order-1 flex min-h-[16rem] items-center justify-center sm:min-h-[22rem] md:order-2 md:min-h-[min(48rem,calc(100svh-9rem))]">
              <div
                className="pointer-events-none absolute inset-[7%] rounded-full bg-[radial-gradient(circle,rgba(29,137,187,0.18),rgba(29,137,187,0.06)_38%,transparent_72%)] blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-[18%] rounded-full border border-[#55B0F7]/[0.08] opacity-70"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={safeActiveIndex}
                  id="audience-visual"
                  role="tabpanel"
                  aria-label={`${activeItem.title} illustration`}
                  className="relative aspect-[3/2] w-full max-w-[58rem]"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 1.015 }}
                  transition={reducedMotion ? { duration: 0 } : IMAGE_TRANSITION}
                >
                  <Image
                    src={activeImage}
                    alt=""
                    fill
                    priority={safeActiveIndex === 0}
                    sizes="(min-width: 1280px) 60vw, (min-width: 768px) 55vw, 100vw"
                    className="object-contain drop-shadow-[0_24px_52px_rgba(3,82,160,0.28)]"
                  />
                  <figcaption className="sr-only">
                    {activeItem.title}: {activeItem.body}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Active audience: {activeItem.title}
      </p>
    </ServiceSectionShell>
  );
}
