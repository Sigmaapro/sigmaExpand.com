"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { CryptoExchangeHeroPrimaryCta } from "@/components/services/hero/CryptoExchangeHeroPrimaryCta";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceFinalCtaProps = {
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

/**
 * Aceternity Spotlight New atmosphere + reused Hero liquid-glass CTA.
 */
export function ServiceFinalCta({ title, body, primaryCta, secondaryCta }: ServiceFinalCtaProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const secondaryParts = secondaryCta
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <ServiceSectionShell id="final-cta" atmosphere="violet" className="overflow-hidden">
      <div className="relative mx-auto max-w-[52rem] py-6 text-center md:py-10">
        {!reduceMotion ? (
          <>
            <div
              className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#1D89BB]/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#4F1DBB]/22 blur-3xl"
              aria-hidden="true"
            />
          </>
        ) : null}

        <ServiceSectionHeading id="final-cta" title={title} align="center" className="relative mx-auto mb-6 md:mb-8" />
        <p className="relative mx-auto max-w-[40rem] text-[15px] leading-relaxed text-[#cfd6de] md:text-base">
          {body}
        </p>

        <div className="relative mt-10 flex flex-col items-center gap-5">
          <CryptoExchangeHeroPrimaryCta label={primaryCta} href="/contact" />
          {secondaryParts.length > 0 ? (
            <ul className="m-0 flex list-none flex-col items-center gap-3 p-0 sm:flex-row sm:gap-7">
              {secondaryParts.map((part) => (
                <li key={part}>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-[#cfd6de] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
                  >
                    {part}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </ServiceSectionShell>
  );
}
