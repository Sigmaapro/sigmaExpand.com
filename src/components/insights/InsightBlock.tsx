"use client";

import { useLanguage } from "@/context/LanguageContext";

export function InsightBlock({ content }: { content: string }) {
  const { t } = useLanguage();
  return (
    <aside
      className="relative my-10 overflow-hidden rounded-xl border border-[#1c39bb]/40 bg-gradient-to-br from-[#1c39bb]/14 via-[#0d1018] to-[#0a0c12] p-5 shadow-[0_0_40px_rgba(28,57,187,0.12)] sm:my-14 sm:p-8"
      aria-label={t.insights.insightAriaLabel}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1c39bb]/20 blur-3xl"
        aria-hidden
      />
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bde0fe]">
        {t.insights.insightBadge}
      </p>
      <p className="mt-4 text-[0.95rem] leading-[1.7] text-[#f1f3f5] text-pretty sm:text-base md:text-[17px]">
        {content}
      </p>
    </aside>
  );
}
