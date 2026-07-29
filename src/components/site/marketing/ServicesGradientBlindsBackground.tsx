"use client";

import { SigmaGradientBlindsBackground } from "@/components/site/marketing/SigmaGradientBlindsBackground";

/**
 * @deprecated Prefer root `GlobalSigmaPageBackground`. Kept as an alias of the same shared config.
 * Do not mount this alongside the root background — that would duplicate WebGL.
 */
export function ServicesGradientBlindsBackground() {
  return <SigmaGradientBlindsBackground />;
}
