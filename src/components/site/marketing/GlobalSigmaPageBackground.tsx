"use client";

import { usePathname } from "next/navigation";
import { SigmaGradientBlindsBackground } from "@/components/site/marketing/SigmaGradientBlindsBackground";
import { SigmaTwilightLinesBackground } from "@/components/site/marketing/SigmaTwilightLinesBackground";

/**
 * Homepage locales keep Gradient Blinds.
 * Internal team app uses a solid dark surface.
 * Every other public route uses React Bits Pro Twilight Lines.
 */
export function GlobalSigmaPageBackground() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/ar";
  const isInternalApp = pathname.startsWith("/internal");
  const isExhibit = pathname.startsWith("/token2049");

  if (isInternalApp || isExhibit) return null;

  return isHomepage ? <SigmaGradientBlindsBackground /> : <SigmaTwilightLinesBackground />;
}
