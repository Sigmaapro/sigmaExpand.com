"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";

type ServiceProblemItem = {
  title: string;
  body: string;
};

type ServiceProblemGridProps = {
  title: string;
  intro: string;
  items: ServiceProblemItem[];
  closingNote: string | null;
};

type ProblemCardLayout = {
  left: string;
  top: string;
  width: string;
  height: string;
  contentTop: string;
  contentRight: string;
  contentBottom: string;
  contentLeft: string;
};

const PROBLEM_IMAGE = "/images/services/problems/exchange-underperformance.png";

/**
 * Coordinates follow the supplied transparent 1536×1024 artwork. The outer
 * boxes stay aligned with the artwork while the inner insets keep live copy
 * clear of the five circular icons.
 */
const PROBLEM_CARD_LAYOUTS: ProblemCardLayout[] = [
  {
    left: "10.9%",
    top: "28.1%",
    width: "21%",
    height: "27.8%",
    contentTop: "14%",
    contentRight: "6%",
    contentBottom: "8%",
    contentLeft: "20%",
  },
  {
    left: "43.2%",
    top: "12.2%",
    width: "19.2%",
    height: "27.5%",
    contentTop: "18%",
    contentRight: "8%",
    contentBottom: "8%",
    contentLeft: "13%",
  },
  {
    left: "71.5%",
    top: "28.5%",
    width: "20.6%",
    height: "27.7%",
    contentTop: "14%",
    contentRight: "7%",
    contentBottom: "8%",
    contentLeft: "13%",
  },
  {
    left: "7.6%",
    top: "58.9%",
    width: "21.5%",
    height: "29.5%",
    contentTop: "14%",
    contentRight: "7%",
    contentBottom: "7%",
    contentLeft: "16%",
  },
  {
    left: "72.7%",
    top: "59.3%",
    width: "22.6%",
    height: "29.2%",
    contentTop: "14%",
    contentRight: "7%",
    contentBottom: "7%",
    contentLeft: "13%",
  },
];

function ProblemCard({
  number,
  title,
  description,
  layout,
  progress,
  reducedMotion,
  index,
}: {
  number: string;
  title: string;
  description: string;
  layout: ProblemCardLayout;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  index: number;
}) {
  const start = 0.22 + index * 0.045;
  const translateY = useTransform(progress, [start, start + 0.28], [-82, 0]);
  const opacity = useTransform(progress, [start, start + 0.14], [0, 1]);

  return (
    <motion.article
      className="absolute z-10 min-w-0"
      style={{
        left: layout.left,
        top: layout.top,
        width: layout.width,
        height: layout.height,
        y: reducedMotion ? 0 : translateY,
        opacity: reducedMotion ? 1 : opacity,
      }}
    >
      <div
        className="absolute flex min-w-0 flex-col"
        style={{
          top: layout.contentTop,
          right: layout.contentRight,
          bottom: layout.contentBottom,
          left: layout.contentLeft,
        }}
      >
        <span className="shrink-0 font-display text-[clamp(0.56rem,0.68vw,0.82rem)] font-semibold uppercase tracking-[0.18em] text-[#1D89BB]">
          {number}
        </span>
        <h3 className="mt-[7%] max-w-full font-display text-[clamp(0.68rem,1.02vw,1.22rem)] font-semibold leading-[1.12] tracking-[-0.015em] text-white">
          {title}
        </h3>
        <p className="mt-[7%] max-w-full text-[clamp(0.52rem,0.69vw,0.84rem)] leading-[1.45] text-white/70">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Scroll-led exchange underperformance composition.
 * Same image + overlaid cards on all viewports; narrow screens pan horizontally.
 */
export function ServiceProblemGrid({ title, intro, items, closingNote }: ServiceProblemGridProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 82%", "end 18%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 28,
    mass: 0.55,
  });
  const imageY = useTransform(progress, [0, 0.34], [150, 0]);
  const imageOpacity = useTransform(progress, [0, 0.2], [0.3, 1]);

  return (
    <ServiceSectionShell id="underperforms" atmosphere="soft">
      <header className="mx-auto mb-10 max-w-[42rem] text-center md:mb-14">
        <h2
          id="underperforms-heading"
          className="font-display text-[clamp(1.65rem,1.35rem+1.1vw,2.75rem)] font-semibold tracking-[-0.02em] text-white text-balance"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[42rem] text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-[#cfd6de] text-pretty">
          {intro}
        </p>
      </header>

      <div ref={stageRef} className="relative md:min-h-[176svh]" aria-labelledby="underperforms-heading">
        <div className="md:sticky md:top-20 md:flex md:min-h-[calc(100svh-6rem)] md:items-center">
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <div className="relative mx-auto aspect-[3/2] w-full min-w-[36rem] max-w-[1440px] sm:min-w-0">
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-[1.5rem]"
                style={{
                  y: reducedMotion ? 0 : imageY,
                  opacity: reducedMotion ? 1 : imageOpacity,
                }}
              >
                <Image
                  src={PROBLEM_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 1536px) 1440px, (max-width: 640px) 36rem, 100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {items.slice(0, PROBLEM_CARD_LAYOUTS.length).map((item, index) => (
                <ProblemCard
                  key={item.title}
                  number={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  description={item.body}
                  layout={PROBLEM_CARD_LAYOUTS[index]}
                  progress={progress}
                  reducedMotion={reducedMotion}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {closingNote ? (
        <p className="relative z-10 mx-auto mt-12 max-w-[48rem] border-t border-white/[0.08] pt-8 text-sm leading-relaxed text-[#9aa3ad] md:mt-16 md:text-[15px]">
          {closingNote}
        </p>
      ) : null}
    </ServiceSectionShell>
  );
}
