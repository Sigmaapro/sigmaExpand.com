"use client";

import dynamic from "next/dynamic";

const ColorBends = dynamic(
  () => import("@/components/react-bits/ColorBends").then((module) => module.ColorBends),
  { ssr: false },
);

/** Single global React Bits Color Bends background used by every route. */
export function SigmaColorBendsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05070e]" aria-hidden="true">
      <ColorBends
        className="h-full w-full"
        colors={["#55b0f7"]}
        transparent
        rotation={90}
        speed={0.2}
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
      />
    </div>
  );
}
