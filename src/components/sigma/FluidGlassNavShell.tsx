"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import GlassSurface from "@/components/react-bits/GlassSurface";
import { useIsMobile } from "@/hooks/useMedia";

type FluidGlassNavShellProps = {
  children: ReactNode;
  /** Outer navbar pill vs inner menu cluster */
  variant?: "shell" | "group";
  className?: string;
  contentClassName?: string;
  height?: number | string;
};

/**
 * Navbar Fluid Glass shell.
 *
 * React Bits Fluid Glass (https://reactbits.dev/components/fluid-glass) is a full-scene
 * WebGL demo (Canvas + GLB + ScrollControls) and cannot wrap interactive HTML without
 * covering page content. This shell applies the official free GlassSurface liquid-refraction
 * primitive, tuned to Fluid Glass “bar” transmission aesthetics for Sigma.
 *
 * Mobile keeps SVG refraction with lighter displace/blur (not a flat CSS-only swap).
 * Full CSS fallback is reserved for prefers-reduced-motion.
 */
export function FluidGlassNavShell({
  children,
  variant = "shell",
  className = "",
  contentClassName = "",
  height = "100%",
}: FluidGlassNavShellProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile(1024);
  const light = isMobile && !reduceMotion;

  const isShell = variant === "shell";

  return (
    <GlassSurface
      width="100%"
      height={height}
      borderRadius={isShell ? 28 : 999}
      borderWidth={isShell ? 0.06 : 0.05}
      brightness={reduceMotion ? 12 : light ? 15 : 18}
      opacity={reduceMotion ? 0.88 : light ? 0.9 : 0.92}
      blur={reduceMotion ? 6 : light ? 7 : 9}
      displace={reduceMotion ? 0 : light ? 0.22 : 0.35}
      backgroundOpacity={reduceMotion ? 0.55 : light ? 0.46 : 0.42}
      saturation={reduceMotion ? 1.05 : light ? 1.12 : 1.2}
      distortionScale={reduceMotion ? 0 : light ? -62 : -95}
      redOffset={0}
      greenOffset={reduceMotion ? 0 : light ? 4 : 6}
      blueOffset={reduceMotion ? 0 : light ? 9 : 14}
      xChannel="R"
      yChannel="G"
      mixBlendMode="difference"
      forceFallback={reduceMotion}
      className={`sigma-fluid-glass sigma-fluid-glass--${variant} ${className}`.trim()}
      contentClassName={contentClassName}
    >
      {children}
    </GlassSurface>
  );
}
