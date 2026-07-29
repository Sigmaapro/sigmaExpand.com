"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const RippleGrid = dynamic(() => import("@/components/react-bits/RippleGrid"), {
  ssr: false,
});

/**
 * What Is Sigma — official React Bits Ripple Grid intensity on dark navy.
 */
export function WhatIsSigmaRippleBackground() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#070b16]" />

      {reduceMotion ? (
        <div className="sigma-what-is-ripple-fallback absolute inset-0" />
      ) : (
        <div className="absolute inset-0">
          <RippleGrid
            enableRainbow={false}
            gridColor="#1D89BB"
            rippleIntensity={0.05}
            gridSize={10}
            gridThickness={15}
            fadeDistance={1.5}
            vignetteStrength={2}
            glowIntensity={0.1}
            opacity={1}
            gridRotation={0}
            mouseInteraction
            mouseInteractionRadius={1}
            timeScale={1}
            paused={false}
          />
        </div>
      )}

      {/* Very light navy wash only — keep ripple lines clearly visible */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_35%,rgba(7,11,22,0.35)_100%)]"
        aria-hidden
      />
    </div>
  );
}
