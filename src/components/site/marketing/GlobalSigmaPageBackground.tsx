"use client";

import { usePathname } from "next/navigation";
import { SigmaGradientBlindsBackground } from "@/components/site/marketing/SigmaGradientBlindsBackground";
import { SigmaTwilightLinesBackground } from "@/components/site/marketing/SigmaTwilightLinesBackground";

/**
 * Homepage locales keep Gradient Blinds.
 * Every other internal route uses React Bits Pro Twilight Lines.
 */
export function GlobalSigmaPageBackground() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/ar";

  return isHomepage ? <SigmaGradientBlindsBackground /> : <SigmaTwilightLinesBackground />;
}
