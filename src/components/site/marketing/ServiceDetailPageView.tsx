"use client";

import Link from "next/link";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import {
  getServiceDetailContent,
  type ServiceDetailKey,
} from "@/content/global/marketing/serviceDetailContent";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function ServiceDetailPageView({ serviceKey }: { serviceKey: ServiceDetailKey }) {
  const { language } = useLanguage();
  const c = getServiceDetailContent(serviceKey, language);

  return (
    <MarketingSubpageScaffold>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <p
            className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}
          >
            {c.eyebrow}
          </p>
          <h1
            className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
          >
            {c.title}
          </h1>
          <p className={`mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}>
            {c.intro}
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{c.body}</p>
          <p className={`mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{c.support}</p>
          <ul className="mt-6 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {c.complianceNote ? (
            <p className={`mt-5 rounded-xl border border-[#1c39bb]/30 bg-[#1c39bb]/10 p-4 text-sm leading-relaxed text-[#d6dbe1] ${localeBody(language)}`}>
              {c.complianceNote}
            </p>
          ) : null}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={c.primaryCtaHref}
            className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
          >
            {c.primaryCtaLabel}
          </Link>
          {c.secondaryCtaHref && c.secondaryCtaLabel ? (
            <Link
              href={c.secondaryCtaHref}
              className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
            >
              {c.secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </article>
    </MarketingSubpageScaffold>
  );
}
