"use client";

import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading, localeMeta } from "@/lib/localeTypography";
import type { LangCode } from "@/content/types";
import type { LegalSection } from "@/content/global/marketing/affiliateDisclosureContent";

type LegalPolicyPageContent = {
  kicker: string;
  headline: string;
  summary?: string;
  effectiveLabel?: string;
  effectiveDate?: string;
  updatedLabel?: string;
  updatedDate?: string;
  sections: LegalSection[];
};

type Props = {
  byLang: Record<LangCode, LegalPolicyPageContent>;
};

export function LegalPolicyPageView({ byLang }: Props) {
  const { language } = useLanguage();
  const c = byLang[language] ?? byLang.EN;
  const dateLabel = c.effectiveLabel ?? c.updatedLabel;
  const dateValue = c.effectiveDate ?? c.updatedDate;

  return (
    <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <article className="mx-auto max-w-3xl">
        <PageIntroGlassCard
          eyebrow={c.kicker}
          title={c.headline}
          description={c.summary}
          eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
          titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
          descriptionClassName={`mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}
        >
          {dateLabel && dateValue ? (
            <p className={`mt-4 text-xs text-[#6f7884] ${localeMeta(language)}`}>
              {dateLabel}: {dateValue}
            </p>
          ) : null}
        </PageIntroGlassCard>
        <div className="mt-12 space-y-8">
          {c.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
              <h2 className={`font-display text-lg font-semibold text-white ${localeHeading(language)}`}>{section.title}</h2>
              <p className={`mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{section.body}</p>
              {section.items ? (
                <ul className={`mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </MarketingPageShell>
  );
}
