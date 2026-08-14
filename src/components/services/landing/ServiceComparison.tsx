"use client";

import { CardSpotlight } from "@/components/services/landing/primitives/CardSpotlight";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceComparisonProps = {
  title: string;
  headers: string[];
  rows: string[][];
};

/**
 * Comparison from exact table headers/rows.
 * Same CardSpotlight treatment on all viewports; mobile stacks columns.
 */
export function ServiceComparison({ title, headers, rows }: ServiceComparisonProps) {
  const dimHeader = headers[0] ?? "Dimension";
  const leftHeader = headers[1] ?? "";
  const rightHeader = headers[2] ?? "";

  return (
    <ServiceSectionShell id="comparison" atmosphere="soft">
      <ServiceSectionHeading id="comparison" title={title} align="center" className="mx-auto" />

      <div className="mx-auto hidden max-w-5xl md:block">
        <div className="mb-4 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 px-2">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa3ad]">
            {dimHeader}
          </p>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa3ad]">
            {leftHeader}
          </p>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1D89BB]">
            {rightHeader}
          </p>
        </div>
        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4"
            >
              <div className="flex items-center rounded-xl border border-white/[0.08] bg-transparent px-4 py-4 font-display text-sm font-semibold text-white">
                {row[0]}
              </div>
              <CardSpotlight className="!p-4" radius={220} color="rgba(148,163,184,0.1)">
                <p className="text-sm leading-relaxed text-[#b6bcc4]">{row[1]}</p>
              </CardSpotlight>
              <CardSpotlight className="!border-[#1D89BB]/30 !p-4" radius={220} color="rgba(29,137,187,0.2)">
                <p className="text-sm leading-relaxed text-[#e8eef5]">{row[2]}</p>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-xl space-y-5 md:hidden">
        {rows.map((row) => (
          <article key={row[0]} className="space-y-3">
            <div className="rounded-xl border border-white/[0.08] bg-transparent px-4 py-3 font-display text-sm font-semibold text-white">
              {row[0]}
            </div>
            <CardSpotlight className="!p-4" radius={180} color="rgba(148,163,184,0.1)">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9aa3ad]">
                {leftHeader}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{row[1]}</p>
            </CardSpotlight>
            <CardSpotlight className="!border-[#1D89BB]/30 !p-4" radius={180} color="rgba(29,137,187,0.2)">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1D89BB]">
                {rightHeader}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#e8eef5]">{row[2]}</p>
            </CardSpotlight>
          </article>
        ))}
      </div>
    </ServiceSectionShell>
  );
}
