"use client";

import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";

export function MarketRegionPageView({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <MarketingSubpageScaffold>
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 md:py-16">
        <header>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            Markets
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {heading}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#b6bcc4] md:text-base">
            {description}
          </p>
        </header>
      </div>
    </MarketingSubpageScaffold>
  );
}
