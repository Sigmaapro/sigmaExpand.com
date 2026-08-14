"use client";

import Link from "next/link";
import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { riskDisclosureContentByLang } from "@/content/global/marketing/riskDisclosureContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeEyebrow, localeHeading, localeMeta } from "@/lib/localeTypography";

export function RiskDisclosurePageView() {
  const { language } = useLanguage();
  const c = pickLang(riskDisclosureContentByLang, language);

  return (
    <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <article className="mx-auto max-w-4xl">
        <PageIntroGlassCard
          eyebrow={c.kicker}
          title={c.title}
          description={c.headline}
          eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
          titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
          descriptionClassName={`mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}
        >
          <p className={`mt-4 text-xs text-[#6f7884] ${localeMeta(language)}`}>
            {c.updatedLabel}: {c.updatedDate}
          </p>
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <PartnerIntentTriggerButton
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
            ariaLabel={c.primaryCtaLabel}
          >
            {c.primaryCtaLabel}
          </PartnerIntentTriggerButton>
          <Link
            href={c.secondaryCtaHref}
            className={`sigma-framer-liquid-button inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
          >
            {c.secondaryCtaLabel}
          </Link>
        </div>
      </article>
    </MarketingPageShell>
  );
}
