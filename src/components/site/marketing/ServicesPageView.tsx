"use client";

import Link from "next/link";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { ROUTES } from "@/content/global/routes";
import { servicesPageContentByLang } from "@/content/global/marketing/servicesContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function ServicesPageView() {
  const { language } = useLanguage();
  const c = pickLang(servicesPageContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.kicker}
          </p>
          <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}>
            {c.headline}
          </h1>
          <p className={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}>
            {c.intro}
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            Service Routes
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {[
              { label: "Scale Your Platform", href: ROUTES.servicesPlatformGrowth },
              { label: "Build Your Financial Creator Infrastructure", href: ROUTES.servicesKolInfrastructure },
              { label: "Apply as a Sigma Partner", href: ROUTES.servicesIbProgram },
              { label: "Find Better Market Access", href: ROUTES.servicesTraderNetwork },
              { label: "Token Launch & Listing Services", href: ROUTES.servicesTokenLaunch },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#d8dde3] transition-colors hover:border-[#1c39bb]/40 hover:bg-[#1c39bb]/12 hover:text-white ${localeBody(language)}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 space-y-8">
          {c.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8"
            >
              <p
                className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}
              >
                {s.eyebrow}
              </p>
              <h2 className={`font-display mt-2 text-xl font-semibold text-white md:text-2xl ${localeHeading(language)}`}>
                {s.title}
              </h2>
              <p className={`mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>
                {s.description}
              </p>
              <ul className="mt-6 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </MarketingSubpageScaffold>
  );
}
