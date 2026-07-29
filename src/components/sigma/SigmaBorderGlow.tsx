"use client";

import React, {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import "@/components/react-bits/BorderGlow.css";

/** Sigma-only Border Glow palette — no rainbow defaults. */
export const SIGMA_BORDER_GLOW_COLORS = ["#1D89BB", "#1D3ABB", "#4F1DBB"] as const;

export type SigmaBorderGlowProps = {
  /** Single existing card shell — glow is merged onto it (no outer layout box). */
  children: ReactElement;
  /** Match the card’s border radius in px (edge ring uses `border-radius: inherit`). */
  borderRadius: number;
  /** Extra class names merged onto the card (non-layout only). */
  className?: string;
  /** Compact capsules (Logo Loop) — slightly quieter edge. */
  compact?: boolean;
  /** @deprecated Ignored — edge-only ring has no interior glow radius. */
  glowRadius?: number;
  /** @deprecated Ignored — opacity is fixed in CSS for consistency. */
  glowIntensity?: number;
  /** @deprecated Ignored — interior fill removed. */
  fillOpacity?: number;
  /** @deprecated Ignored — pointer tracking disabled. */
  edgeSensitivity?: number;
  /** @deprecated Ignored — pointer tracking disabled. */
  coneSpread?: number;
};

/**
 * Shared homepage Border Glow — thin rotating edge highlight only.
 * No interior blobs, no pointer-tracking spotlights.
 * Inspired by React Bits Border Glow, restrained for Sigma.
 * Source: https://reactbits.dev/components/border-glow
 */
export function SigmaBorderGlow({
  children,
  borderRadius,
  className = "",
  compact = false,
}: SigmaBorderGlowProps) {
  const reduceMotion = useReducedMotion() ?? false;

  if (!isValidElement(children)) {
    throw new Error("SigmaBorderGlow expects a single React element child (the card shell).");
  }

  const child = children as ReactElement<{
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }>;

  const mergedClassName = [
    child.props.className,
    "sigma-border-glow",
    compact ? "sigma-border-glow--compact" : "",
    reduceMotion ? "sigma-border-glow--reduced" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    ...child.props.style,
    ["--sigma-border-radius" as string]:
      borderRadius >= 999 ? "9999px" : `${borderRadius}px`,
  };

  return cloneElement(child, {
    className: mergedClassName,
    style: mergedStyle,
    children: (
      <>
        <span className="sigma-border-glow__edge" aria-hidden />
        {child.props.children}
      </>
    ),
  });
}

export default SigmaBorderGlow;
