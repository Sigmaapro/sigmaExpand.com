"use client";

import Link from "next/link";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { MagneticButton } from "@/components/sigma/SigmaCtaButton";
import { ROUTES } from "@/content/global/routes";

type CemCtaActionsProps = {
  primaryLabel: string;
  secondaryLabel: string;
  partnerLabel: string;
  /** hero = boot dock hierarchy; final = command interface; legacy equal stack unused */
  layout?: "hero" | "final";
};

/**
 * Preserves approved CTA labels.
 * Hero/final: one primary + two quieter secondary actions (command-dock).
 */
export function CemCtaActions({
  primaryLabel,
  secondaryLabel,
  partnerLabel,
  layout = "hero",
}: CemCtaActionsProps) {
  return (
    <div className={layout === "final" ? "cem-cta-dock cem-cta-dock--final" : "cem-cta-dock"}>
      <MagneticButton primary href={ROUTES.contact} fullWidthMobile>
        {primaryLabel}
      </MagneticButton>
      <div className="cem-cta-dock__secondary">
        <Link href={ROUTES.contact} className="cem-cta-dock__link">
          {secondaryLabel}
        </Link>
        <PartnerIntentTriggerButton className="cem-cta-dock__partner">
          {partnerLabel}
        </PartnerIntentTriggerButton>
      </div>
    </div>
  );
}

export function CemTextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="font-display text-sm font-medium text-[#bde0fe] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bde0fe]/45"
    >
      {children}
    </Link>
  );
}
