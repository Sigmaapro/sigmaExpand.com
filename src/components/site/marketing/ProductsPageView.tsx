"use client";

import Link from "next/link";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { productsContentByLang } from "@/content/global/marketing/productsContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function ProductsPageView() {
  const { language } = useLanguage();
  const c = pickLang(productsContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.kicker}
          </p>
          <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}>
            {c.title}
          </h1>
          <p className={`mx-auto mt-5 text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}>{c.intro}</p>
          <p className={`mx-auto mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{c.positioning}</p>
        </header>

        <ul className="mt-12 space-y-4">
          {c.sections.map((section) => (
            <li key={section.title} className="rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
              <h2 className={`font-display text-lg font-semibold text-white ${localeHeading(language)}`}>{section.title}</h2>
              <p className={`mt-3 text-sm leading-relaxed text-[#b6bcc4] ${localeBody(language)}`}>{section.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={c.primaryCtaHref}
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
          >
            {c.primaryCtaLabel}
          </Link>
          <PartnerIntentTriggerButton
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
            ariaLabel={c.secondaryCtaLabel}
          >
            {c.secondaryCtaLabel}
          </PartnerIntentTriggerButton>
        </div>
      </article>
    </MarketingSubpageScaffold>
  );
}
