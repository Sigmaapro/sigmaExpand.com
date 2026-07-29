"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const Ferrofluid = dynamic(() => import("@/components/react-bits/Ferrofluid"), {
  ssr: false,
});

const FERRO_COLORS = ["#3B82F6", "#04255B", "#062949"] as const;

/**
 * Capabilities section only — official React Bits Ferrofluid.
 * Does not affect hero or other homepage sections.
 */
export function CapabilitiesFerrofluidBackground() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#041528]" />

      {reduceMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(59,130,246,0.28) 0%, transparent 55%), linear-gradient(165deg, #062949 0%, #04255B 48%, #031020 100%)",
          }}
        />
      ) : (
        <div className="absolute inset-0 opacity-[0.92]">
          <Ferrofluid
            colors={[...FERRO_COLORS]}
            speed={0.42}
            scale={1.45}
            turbulence={0.85}
            fluidity={0.14}
            rimWidth={0.22}
            sharpness={2.2}
            shimmer={1.15}
            glow={1.65}
            flowDirection="down"
            opacity={0.88}
            mouseInteraction
            mouseStrength={0.55}
            mouseRadius={0.32}
            mouseDampening={0.18}
            mixBlendMode="screen"
          />
        </div>
      )}

      {/* Soft vignette so content stays readable */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_45%,transparent_30%,rgba(4,21,40,0.55)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#041528]/55 via-transparent to-[#041528]/7"
        aria-hidden
      />
    </div>
  );
}
