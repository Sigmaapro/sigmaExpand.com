"use client";

import { usePathname } from "next/navigation";
import { SigmaColorBendsBackground } from "@/components/site/marketing/SigmaColorBendsBackground";
import { SigmaGradientBlindsBackground } from "@/components/site/marketing/SigmaGradientBlindsBackground";

/**
 * Keep the existing Color Bends background for inner routes and use the
 * Sigma Gradient Blinds treatment on the two homepage locales.
 */
export function GlobalSigmaPageBackground() {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/ar";

  return isHomepage ? <SigmaGradientBlindsBackground /> : <SigmaColorBendsBackground />;
}
