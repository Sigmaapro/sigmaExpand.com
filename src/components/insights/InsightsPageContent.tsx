"use client";

import type { InsightPost } from "@/content/insights";
import { MarketingPageBackground } from "@/components/site/marketing/MarketingPageBackground";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
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
    <div className="relative isolate min-h-0 flex-1 overflow-hidden">
      <MarketingPageBackground />
      <div className="relative z-10">
        <section className="px-3 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-14 lg:px-10">
          <PageIntroGlassCard
            eyebrow={t.insights.pageEyebrow}
            title={t.insights.pageTitle}
            description={t.insights.pageSubtitle}
            eyebrowClassName={`font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-[#93C5FD] sm:text-[11px] ${localeEyebrow(lang)}`}
            titleClassName={`font-display mt-3 text-[clamp(1.75rem,7vw,2.5rem)] font-semibold uppercase leading-[1.08] tracking-tight text-[#f8f9fa] text-balance sm:mt-4 sm:text-5xl md:text-6xl ${localeHeading(lang)}`}
            descriptionClassName={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#adb5bd] text-pretty sm:mt-5 sm:text-base md:text-lg ${localeBody(lang)}`}
          />
        </section>
        <InsightsListingClient posts={posts} categories={categories} />
      </div>
    </div>
  );
}
