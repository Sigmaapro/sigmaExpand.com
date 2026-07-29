"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GradientBlinds = dynamic(
  () => import("@/components/react-bits/GradientBlinds"),
  { ssr: false },
);

export const SIGMA_GRADIENT_BLINDS_COLORS = ["#1D89BB", "#1D3ABB", "#4F1DBB"] as const;

/** Single shared preset — used by `/services` and homepage identically. */
const SHARED_CONFIG = {
  shaderOpacity: 0.42,
  dprCap: 1.25,
  angle: 18,
  noise: 0.08,
  blindCount: 12,
  blindMinWidth: 72,
  mouseDampening: 0.2,
  spotlightRadius: 0.6,
  spotlightSoftness: 1.35,
  spotlightOpacity: 0.38,
  timeScale: 1,
  veil: "linear-gradient(180deg, rgba(5,7,14,0.55) 0%, rgba(5,7,14,0.35) 40%, rgba(5,7,14,0.7) 100%)",
  fallback: `
    radial-gradient(ellipse 70% 50% at 20% 15%, rgba(29, 137, 187, 0.22), transparent 55%),
    radial-gradient(ellipse 55% 45% at 80% 25%, rgba(29, 58, 187, 0.18), transparent 50%),
    radial-gradient(ellipse 50% 40% at 55% 85%, rgba(79, 29, 187, 0.14), transparent 55%),
    #05070e
  `,
} as const;

type SigmaGradientBlindsBackgroundProps = {
  className?: string;
  zIndexClassName?: string;
};

/**
 * Shared fixed Gradient Blinds background (React Bits + ogl).
 * One config for every consumer — no route-specific overrides.
 */
export function SigmaGradientBlindsBackground({
  className = "",
  zIndexClassName = "z-0",
}: SigmaGradientBlindsBackgroundProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const syncDpr = () => {
      setDpr(Math.min(SHARED_CONFIG.dprCap, window.devicePixelRatio || 1));
    };
    syncDpr();
    window.addEventListener("resize", syncDpr, { passive: true });

    const syncVisibility = () => setPaused(document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("resize", syncDpr);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden bg-[#05070e] ${zIndexClassName} ${className}`.trim()}
      aria-hidden
    >
      {reduceMotion ? (
        <div className="absolute inset-0" style={{ background: SHARED_CONFIG.fallback }} />
      ) : (
        <div className="absolute inset-0" style={{ opacity: SHARED_CONFIG.shaderOpacity }}>
          <GradientBlinds
            className="h-full w-full"
            dpr={dpr}
            paused={paused}
            gradientColors={[...SIGMA_GRADIENT_BLINDS_COLORS]}
            angle={SHARED_CONFIG.angle}
            noise={SHARED_CONFIG.noise}
            blindCount={SHARED_CONFIG.blindCount}
            blindMinWidth={SHARED_CONFIG.blindMinWidth}
            mouseDampening={SHARED_CONFIG.mouseDampening}
            mirrorGradient={false}
            spotlightRadius={SHARED_CONFIG.spotlightRadius}
            spotlightSoftness={SHARED_CONFIG.spotlightSoftness}
            spotlightOpacity={SHARED_CONFIG.spotlightOpacity}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="normal"
            trackPointer="window"
            timeScale={SHARED_CONFIG.timeScale}
          />
        </div>
      )}
      <div className="absolute inset-0" style={{ background: SHARED_CONFIG.veil }} />
    </div>
  );
}
