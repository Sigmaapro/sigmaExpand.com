import Link from "next/link";
import type { ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { CryptoExchangeHeroPrimaryCta } from "@/components/services/hero/CryptoExchangeHeroPrimaryCta";
import "./CryptoExchangeHeroTitleGlass.css";

type CryptoExchangeServiceHeroProps = {
  document: ImportedServiceDocument;
  lead: string;
};

/** Presentational split of the exact secondary CTA string on the middle-dot separator. */
function secondaryCtaParts(secondaryCta: string): string[] {
  return secondaryCta
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Editorial Hero for crypto-exchange-growth-market-development.
 * Exact client copy only. Long intro paragraph lives below the Hero.
 */
export function CryptoExchangeServiceHero({ document, lead }: CryptoExchangeServiceHeroProps) {
  const label = document.primaryKeyword;
  const title = document.title;
  const secondaryParts = document.secondaryCta ? secondaryCtaParts(document.secondaryCta) : [];

  return (
    <section
      className="relative isolate min-h-0 overflow-x-clip pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.25rem))] md:min-h-[82svh]"
      aria-labelledby="crypto-exchange-service-hero-title"
    >
      <div className="relative z-10 mx-auto flex max-w-[1720px] flex-col justify-start gap-6 px-4 pb-12 pt-2 sm:px-6 md:min-h-[calc(82svh-5.25rem)] md:gap-8 md:pb-14 md:pt-4 lg:px-10">
        <p className="inline-flex items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1D89BB] sm:text-xs">
          <span className="h-px w-7 bg-[#1D89BB]/70" aria-hidden="true" />
          <span>{label}</span>
        </p>

        <div className="flex w-full justify-center">
          <div className="crypto-exchange-hero-title-glass w-full max-w-[77.5rem] px-[1.375rem] py-[1.375rem] sm:px-8 sm:py-8 md:px-10 md:py-9 lg:px-12 lg:py-10">
            <div className="crypto-exchange-hero-title-glass__sheen" aria-hidden="true" />
            <div className="crypto-exchange-hero-title-glass__liquid" aria-hidden="true" />
            <div className="crypto-exchange-hero-title-glass__grain" aria-hidden="true" />

            <h1
              id="crypto-exchange-service-hero-title"
              className="relative z-[1] m-0 w-full max-w-[34ch] text-center font-display text-[clamp(1.75rem,1.35rem+1.5vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white text-balance md:max-w-[28ch] lg:max-w-[26ch]"
            >
              {title}
            </h1>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[54rem] flex-col items-center pt-1 md:pt-2">
          <p className="max-w-[53.75rem] text-center text-[clamp(1.0625rem,1rem+0.3vw,1.3125rem)] font-medium leading-relaxed text-[#e8eef5] text-balance">
            {lead}
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-4 md:mt-8 md:gap-5">
            {document.primaryCta ? (
              <CryptoExchangeHeroPrimaryCta label={document.primaryCta} href="/contact" />
            ) : null}

            {secondaryParts.length > 0 ? (
              <ul className="mt-1 flex list-none flex-col items-center gap-3 p-0 sm:mt-0 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7 sm:gap-y-2">
                {secondaryParts.map((part) => (
                  <li key={part}>
                    <Link
                      href="/contact"
                      className="text-sm font-medium leading-relaxed text-[#cfd6de] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 md:text-[15px]"
                    >
                      {part}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
