"use client";

import { FaqAccordion } from "@/components/site/FaqAccordion";
import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { faqPageContentByLang } from "@/content/global/marketing/faqContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function FaqPageView() {
  const { language } = useLanguage();
  const c = pickLang(faqPageContentByLang, language);

  return (
    <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <PageIntroGlassCard
          eyebrow={c.kicker}
          title={c.headline}
          description={c.intro}
          eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
          titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
          descriptionClassName={`mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#b6bcc4] ${localeBody(language)}`}
        />
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-[#07090f]/40 p-4 backdrop-blur-sm sm:p-6">
          <FaqAccordion items={c.items} />
        </div>
      </div>
    </MarketingPageShell>
  );
}
