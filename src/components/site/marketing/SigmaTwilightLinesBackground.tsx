"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TwilightLines = dynamic(
  () => import("@/components/react-bits/TwilightLines").then((module) => module.TwilightLines),
  { ssr: false },
);

/** Twilight Lines palette for internal / landing routes. */
const REFERENCE = {
  lineCount: 2,
  waveAmplitude: 0.5,
  waveFrequency: 1.8,
  lineThickness: 0.05,
  lineGlow: 0.01,
  lineColor: "#4155cb",
  lineIntensity: 3,
  pulseColor: "#333acf",
  pulseSpeed: 0.25,
  pulseWidth: 35,
  pulseIntensity: 5.5,
  chromaticAberration: 0.05,
  backgroundColor: "#000000",
  opacity: 1,
  dpr: 1.5,
  dprMobile: 1,
} as const;

/**
 * Single global Twilight Lines atmosphere for internal routes.
 * Homepage continues to use SigmaGradientBlindsBackground.
 */
export function SigmaTwilightLinesBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dpr, setDpr] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const syncDpr = () => {
      const cap = window.innerWidth < 768 ? REFERENCE.dprMobile : REFERENCE.dpr;
      setDpr(Math.min(cap, window.devicePixelRatio || 1));
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#000000]"
      aria-hidden="true"
    >
      <TwilightLines
        className="h-full w-full"
        lineCount={REFERENCE.lineCount}
        waveAmplitude={REFERENCE.waveAmplitude}
        waveFrequency={REFERENCE.waveFrequency}
        lineThickness={REFERENCE.lineThickness}
        lineGlow={REFERENCE.lineGlow}
        lineColor={REFERENCE.lineColor}
        lineIntensity={REFERENCE.lineIntensity}
        pulseColor={REFERENCE.pulseColor}
        pulseSpeed={REFERENCE.pulseSpeed}
        pulseWidth={REFERENCE.pulseWidth}
        pulseIntensity={REFERENCE.pulseIntensity}
        chromaticAberration={REFERENCE.chromaticAberration}
        backgroundColor={REFERENCE.backgroundColor}
        opacity={REFERENCE.opacity}
        dpr={dpr}
        paused={paused}
        reduceMotion={reduceMotion}
        trackPointer="window"
      />
    </div>
  );
}
