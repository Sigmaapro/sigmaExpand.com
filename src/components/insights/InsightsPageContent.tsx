"use client";

import type { InsightPost } from "@/content/insights";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading } from "@/lib/localeTypography";
import { InsightsListingClient } from "./InsightsListingClient";

export function InsightsPageContent({
  posts,
  categories,
}: {
  posts: InsightPost[];
  categories: string[];
}) {
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="relative border-b border-white/[0.06] px-3 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p
            className={`font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c39bb] sm:text-[11px] ${localeEyebrow(lang)}`}
          >
            {t.insights.pageEyebrow}
          </p>
          <h1
            className={`font-display mt-3 text-[clamp(1.75rem,7vw,2.5rem)] font-semibold uppercase leading-[1.08] tracking-tight text-[#f8f9fa] text-balance sm:mt-4 sm:text-5xl md:text-6xl ${localeHeading(lang)}`}
          >
            {t.insights.pageTitle}
          </h1>
          <p
            className={`mt-4 max-w-2xl text-sm leading-relaxed text-[#adb5bd] text-pretty sm:mt-5 sm:text-base md:text-lg ${localeBody(lang)}`}
          >
            {t.insights.pageSubtitle}
          </p>
        </div>
      </section>
      <InsightsListingClient posts={posts} categories={categories} />
    </>
  );
}
