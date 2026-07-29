"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

type AnimatedContentProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  disappearEase?: string;
  initialOpacity?: number;
};

function resolveEase(value: string | undefined): Transition["ease"] {
  switch (value) {
    case "bounce.out":
      return [0.34, 1.56, 0.64, 1];
    case "elastic.in(1, 0.3)":
    case "elastic.in(1,+0.3)":
      return [0.7, -0.05, 1, 0.42];
    case "ease.out":
    case "power3.out":
      return [0.22, 1, 0.36, 1];
    default:
      return "easeOut";
  }
}

/** Lightweight local equivalent of React Bits Animated Content for the existing Framer Motion stack. */
export function AnimatedContent({
  children,
  className,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  disappearEase = "ease.out",
  initialOpacity = 0,
}: AnimatedContentProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const offset = reverse ? -distance : distance;
  const initial = {
    ...(direction === "horizontal" ? { x: offset } : { y: offset }),
    opacity: initialOpacity,
  };
  const visible = direction === "horizontal" ? { x: 0 } : { y: 0 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : initial}
      animate={reduceMotion ? undefined : { ...visible, opacity: 1 }}
      exit={reduceMotion ? undefined : { ...initial, opacity: 0 }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: resolveEase(ease),
      }}
      style={{
        // Keep the optional disappear easing available when a parent removes the wrapper.
        transitionTimingFunction: resolveEase(disappearEase) as string,
      }}
    >
      {children}
    </motion.div>
  );
}

