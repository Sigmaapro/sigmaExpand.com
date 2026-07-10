"use client";

import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { privacyPageContentByLang } from "@/content/global/marketing/privacyContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading, localeMeta } from "@/lib/localeTypography";

export function PrivacyPageView() {
  const { language } = useLanguage();
  const c = pickLang(privacyPageContentByLang, language);

  return (
    <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <article className="mx-auto max-w-3xl">
        <PageIntroGlassCard
          eyebrow={c.kicker}
          title={c.headline}
          eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
          titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
        >
          <p className={`mt-4 text-xs text-[#6f7884] ${localeMeta(language)}`}>
            {c.updatedLabel}: {c.updatedDate}
          </p>
        </PageIntroGlassCard>
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
    </MarketingPageShell>
  );
}
