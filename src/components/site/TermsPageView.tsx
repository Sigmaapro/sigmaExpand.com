"use client";

import { useLanguage } from "@/context/LanguageContext";
import { termsPageContentByLang } from "@/content/global/termsPage";

export function TermsPageView() {
  const { language } = useLanguage();
  const c = termsPageContentByLang[language];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <header className="text-center">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
          {c.kicker}
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {c.headline}
        </h1>
        <p className="mt-4 text-xs text-[#6f7884]">
          {c.updatedLabel}: {c.updatedDate}
        </p>
      </header>
      <div className="mt-12 space-y-10">
        {c.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-lg font-semibold text-white">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
              {s.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
