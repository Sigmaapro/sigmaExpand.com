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
  const simplify = reduceMotion || isMobile;

  const isShell = variant === "shell";

  return (
    <GlassSurface
      width="100%"
      height={height}
      borderRadius={isShell ? 28 : 999}
      borderWidth={isShell ? 0.06 : 0.05}
      brightness={simplify ? 12 : 18}
      opacity={simplify ? 0.88 : 0.92}
      blur={simplify ? 6 : 9}
      displace={simplify ? 0 : 0.35}
      backgroundOpacity={simplify ? 0.55 : 0.42}
      saturation={simplify ? 1.05 : 1.2}
      distortionScale={simplify ? 0 : -95}
      redOffset={0}
      greenOffset={simplify ? 0 : 6}
      blueOffset={simplify ? 0 : 14}
      xChannel="R"
      yChannel="G"
      mixBlendMode="difference"
      forceFallback={simplify}
      className={`sigma-fluid-glass sigma-fluid-glass--${variant} ${className}`.trim()}
      contentClassName={contentClassName}
    >
      {children}
    </GlassSurface>
  );
}
