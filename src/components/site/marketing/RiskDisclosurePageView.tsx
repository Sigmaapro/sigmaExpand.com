"use client";

import Link from "next/link";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { riskDisclosureContentByLang } from "@/content/global/marketing/riskDisclosureContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function RiskDisclosurePageView() {
  const { language } = useLanguage();
  const c = pickLang(riskDisclosureContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <header className="text-center">
          <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.kicker}
          </p>
          <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}>
            {c.title}
          </h1>
          <p className={`mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}>{c.headline}</p>
        </header>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <div className="space-y-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <PartnerIntentTriggerButton
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
            ariaLabel={c.primaryCtaLabel}
          >
            {c.primaryCtaLabel}
          </PartnerIntentTriggerButton>
          <Link
            href={c.secondaryCtaHref}
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
          >
            {c.secondaryCtaLabel}
          </Link>
        </div>
      </article>
    </MarketingSubpageScaffold>
  );
}
