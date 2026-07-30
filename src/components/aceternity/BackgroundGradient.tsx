"use client";

import { memo, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import "./BackgroundGradient.css";

export type BackgroundGradientProps = {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
};

/**
 * Aceternity-style animated card gradient, tuned for SIGMA brand colors.
 * @see https://ui.aceternity.com/components/background-gradient
 */
export const BackgroundGradient = memo(function BackgroundGradient({
  children,
  className = "",
  containerClassName = "",
  animate = true,
}: BackgroundGradientProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const shouldAnimate = animate && !reduceMotion;

  return (
    <div
      className={["sigma-bg-gradient", "group", containerClassName].filter(Boolean).join(" ")}
      data-animate={shouldAnimate ? "true" : "false"}
    >
      <span className="sigma-bg-gradient__layer sigma-bg-gradient__layer--soft" aria-hidden />
      <span className="sigma-bg-gradient__layer sigma-bg-gradient__layer--edge" aria-hidden />
      <div className={["sigma-bg-gradient__content", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </div>
  );
});
