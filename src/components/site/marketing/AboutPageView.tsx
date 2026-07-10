"use client";

import Link from "next/link";
import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import { aboutPageContentByLang } from "@/content/global/marketing/aboutContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeEyebrow, localeHeading, localeMeta, localeNav } from "@/lib/localeTypography";

export function AboutPageView() {
  const { language } = useLanguage();
  const c = pickLang(aboutPageContentByLang, language);

  return (
    <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <article className="mx-auto max-w-3xl">
        <PageIntroGlassCard
          eyebrow={c.kicker}
          title={c.headline}
          description={c.subhead}
          eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
          titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
          descriptionClassName={`mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}
        >
          <p className={`mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-[#8f98a3] md:text-sm ${localeMeta(language)}`}>
            {c.bodyLine}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {c.identity.map((item) => (
              <span
                key={item}
                className={`rounded-full border border-[#1c39bb]/40 bg-[#1c39bb]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bde0fe] ${localeMeta(language)}`}
              >
                {item}
              </span>
            ))}
          </div>
        </PageIntroGlassCard>

        <section className="mt-14 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.whySigmaExists.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.whySigmaExists.title}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.whySigmaExists.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.story.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.story.title}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.founderNote.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.founderNote.title}
          </h2>
          <blockquote className="mt-5 whitespace-pre-line border-s-2 border-[#1c39bb]/45 ps-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.founderNote.quote}
          </blockquote>
          <p className={`mt-4 text-xs uppercase tracking-[0.12em] text-[#8f98a3] ${localeMeta(language)}`}>
            {c.founderNote.attribution}
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.coreTeam.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.coreTeam.title}
          </h2>
          <p className={`mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>{c.coreTeam.intro}</p>
          <ul className="mt-6 space-y-4">
            {c.coreTeam.members.map((member) => (
              <li key={member.name} className="rounded-xl border border-white/[0.06] bg-[#05070c]/80 p-4">
                <h3 className={`font-display text-base font-semibold text-white ${localeHeading(language)}`}>{member.name}</h3>
                <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c39bb] ${localeMeta(language)}`}>
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
          <p className={`mt-5 text-sm leading-relaxed text-[#b6bcc4] ${localeBody(language)}`}>{c.coreTeam.extendedNetwork}</p>
          <p className={`mt-3 text-xs leading-relaxed text-[#8f98a3] ${localeMeta(language)}`}>{c.coreTeam.ndaLine}</p>
          <div className="mt-5">
            <Link
              href={c.coreTeam.ctaHref}
              className={`inline-flex items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
            >
              {c.coreTeam.ctaLabel}
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.industryPov.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.industryPov.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{c.industryPov.intro}</p>
          <ol className="mt-5 list-decimal space-y-3 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.industryPov.principles.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.insideNetwork.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.insideNetwork.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{c.insideNetwork.body}</p>
          <div className="mt-5 space-y-4">
            {c.insideNetwork.operatingPoints.map((point) => (
              <div key={point.title} className="rounded-xl border border-white/[0.06] bg-[#05070c]/75 p-4">
                <h3 className={`font-display text-sm font-semibold uppercase tracking-[0.12em] text-white ${localeNav(language)}`}>
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.vision.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.vision.title}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.vision.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.recognition.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.recognition.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{c.recognition.body}</p>
          <div className="mt-5">
            <Link
              href={c.recognition.ctaHref}
              className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
            >
              {c.recognition.ctaLabel}
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.transparency.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.transparency.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{c.transparency.body}</p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-6 backdrop-blur-md sm:p-8">
          <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.invitation.eyebrow}
          </p>
          <h2 className={`font-display mt-2 text-lg font-semibold text-white ${localeHeading(language)}`}>
            {c.invitation.title}
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{c.invitation.body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PartnerIntentTriggerButton
              className={`inline-flex items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeCta(language)}`}
              ariaLabel={c.invitation.primaryCtaLabel}
            >
              {c.invitation.primaryCtaLabel}
            </PartnerIntentTriggerButton>
            <Link
              href={c.invitation.secondaryCtaHref}
              className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}
            >
              {c.invitation.secondaryCtaLabel}
            </Link>
          </div>
        </section>
      </article>
    </MarketingPageShell>
  );
}
