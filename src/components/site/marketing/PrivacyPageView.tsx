"use client";

import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { privacyPageContentByLang } from "@/content/global/marketing/privacyContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading, localeMeta } from "@/lib/localeTypography";

export function PrivacyPageView() {
  const { language } = useLanguage();
  const c = pickLang(privacyPageContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <header className="text-center">
          <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.kicker}
          </p>
          <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}>
            {c.headline}
          </h1>
          <p className={`mt-4 text-xs text-[#6f7884] ${localeMeta(language)}`}>
            {c.updatedLabel}: {c.updatedDate}
          </p>
        </header>
        <div className="mt-12 space-y-8">
          {c.sections.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8"
            >
              <h2 className={`font-display text-lg font-semibold text-white ${localeHeading(language)}`}>{s.title}</h2>
              <p className={`mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </MarketingSubpageScaffold>
  );
}
