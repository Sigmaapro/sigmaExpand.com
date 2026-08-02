"use client";

import { useReducedMotion } from "framer-motion";
import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";
import { RegionMarqueeBand } from "@/components/sigma/RegionMarqueeBand";

type ServiceAudienceMarqueeProps = {
  title: string;
  body: string;
  /** Exact audience category titles from the document (Who This Page Is For). */
  categories: LabeledItem[];
};

/**
 * Magic UI Marquee — text chips from exact audience categories + accessible static list.
 */
export function ServiceAudienceMarquee({ title, body, categories }: ServiceAudienceMarqueeProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <ServiceSectionShell id="who-works-with" atmosphere="soft">
      <ServiceSectionHeading id="who-works-with" title={title} />
      <p className="mx-auto max-w-[48rem] text-[15px] leading-relaxed text-[#cfd6de] md:text-base">{body}</p>

      {reduceMotion ? null : (
        <div className="mt-10" aria-hidden="true">
          <RegionMarqueeBand direction="ltr" durationSec={48} framed={false} compact>
            {categories.map((c) => (
              <span
                key={c.title}
                className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#e8eef5]"
              >
                {c.title}
              </span>
            ))}
          </RegionMarqueeBand>
        </div>
      )}

      <ul className="mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <li
            key={`static-${c.title}`}
            className="rounded-xl border border-white/[0.08] bg-[#07090f]/55 px-4 py-3 font-display text-sm font-semibold text-white"
          >
            {c.title}
          </li>
        ))}
      </ul>
    </ServiceSectionShell>
  );
}
