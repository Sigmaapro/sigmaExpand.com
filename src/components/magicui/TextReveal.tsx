"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type FC } from "react";

export type TextRevealProps = {
  children: string;
  className?: string;
};

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
};

const Word: FC<WordProps> = ({ children, progress, range, reduceMotion }) => {
  const opacity = useTransform(progress, range, reduceMotion ? [1, 1] : [0.68, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block will-change-[opacity]">
      {children}
    </motion.span>
  );
};

/**
 * Magic UI Text Reveal — adapted for paragraph-sized service intro copy.
 * Source: https://magicui.design/docs/components/text-reveal
 *
 * Words reveal from muted → full as the user begins scrolling.
 * Single text nodes only (no duplicated SR content).
 */
export const TextReveal: FC<TextRevealProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 25%"],
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            reduceMotion={reduceMotion}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default TextReveal;
