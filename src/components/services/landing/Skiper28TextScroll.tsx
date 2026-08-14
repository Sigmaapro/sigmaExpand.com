"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Skiper28TextScrollProps = {
  id: string;
  title: string;
  paragraphs: string[];
};

/** Skiper28-style perspective text scene driven by the section's scroll progress. */
export function Skiper28TextScroll({ id, title, paragraphs }: Skiper28TextScrollProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 92%", "end 18%"],
  });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [52, 0]), {
    stiffness: 95,
    damping: 25,
    mass: 0.8,
  });
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [90, 0]), {
    stiffness: 95,
    damping: 25,
    mass: 0.8,
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.84, 1]), {
    stiffness: 95,
    damping: 25,
    mass: 0.8,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18], [0.48, 1]);

  return (
    <div
      ref={sceneRef}
      className="relative mx-auto min-h-[44rem] max-w-[92rem] overflow-hidden px-1 py-8 sm:px-4 md:min-h-[48rem] md:py-12"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="mx-auto max-w-[88rem] origin-top text-center"
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          y: reduceMotion ? 0 : translateY,
          scale: reduceMotion ? 1 : scale,
          opacity: reduceMotion ? 1 : opacity,
          transformStyle: "preserve-3d",
        }}
      >
        <h2
          id={`${id}-heading`}
          className="font-display text-[clamp(2rem,5.2vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white text-balance"
        >
          {title}
        </h2>

        <div className="mx-auto mt-12 max-w-[79rem] space-y-10 text-left sm:mt-16 md:mt-20 md:space-y-14">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-[clamp(1.05rem,1rem+0.65vw,1.7rem)] leading-[1.55] tracking-[-0.012em] text-[#cfd6de]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
