"use client";

import { FaqAccordion } from "@/components/site/FaqAccordion";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { faqPageContentByLang } from "@/content/global/marketing/faqContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";

export function FaqPageView() {
  const { language } = useLanguage();
  const c = pickLang(faqPageContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <header className="text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {c.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#b6bcc4]">{c.intro}</p>
        </header>
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-[#07090f]/40 p-4 backdrop-blur-sm sm:p-6">
          <FaqAccordion items={c.items} />
        </div>
      </div>
    </MarketingSubpageScaffold>
  );
}
