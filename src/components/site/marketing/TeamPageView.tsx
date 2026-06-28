"use client";

import Image from "next/image";
import Link from "next/link";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import { PartnerIntentTriggerButton } from "@/components/partner/PartnerIntentModal";
import type { TeamMember } from "@/content/global/marketing/teamContent";
import { teamPageContentByLang } from "@/content/global/marketing/teamContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading, localeMeta } from "@/lib/localeTypography";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SG";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

function MemberTile({
  member,
  language,
  tone,
}: {
  member: TeamMember;
  language: ReturnType<typeof useLanguage>["language"];
  tone: "core" | "secondary";
}) {
  const initials = member.initials ?? initialsFromName(member.name);
  const avatarSize = tone === "core" ? "h-16 w-16 sm:h-[72px] sm:w-[72px]" : "h-14 w-14 sm:h-16 sm:w-16";
  const titleSize = tone === "core" ? "text-base sm:text-[17px]" : "text-sm sm:text-base";
  const roleSize = tone === "core" ? "text-[11px]" : "text-[10px]";

  return (
    <article
      className={
        tone === "core"
          ? "rounded-2xl border border-[#1c39bb]/34 bg-[#1c39bb]/12 p-4 sm:p-5"
          : "rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4"
      }
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`relative shrink-0 overflow-hidden rounded-2xl border ${
            tone === "core" ? "border-[#1c39bb]/40 bg-[#121b32]" : "border-white/[0.12] bg-[#121621]"
          } ${avatarSize}`}
        >
          {member.imageSrc ? (
            <Image src={member.imageSrc} alt={member.name} fill className="object-cover" sizes="72px" />
          ) : (
            <span
              className={`flex h-full w-full items-center justify-center font-semibold uppercase tracking-[0.08em] ${
                tone === "core" ? "text-sm text-[#d0e0ff]" : "text-xs text-[#b7c0cc]"
              }`}
              aria-hidden
            >
              {initials}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className={`truncate font-display font-semibold text-white ${titleSize} ${localeHeading(language)}`}>{member.name}</h3>
          {member.role ? (
            <p className={`mt-1 uppercase tracking-[0.12em] text-[#9aa5b3] ${roleSize} ${localeMeta(language)}`}>{member.role}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function TeamPageView() {
  const { language } = useLanguage();
  const c = pickLang(teamPageContentByLang, language);

  return (
    <MarketingSubpageScaffold>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <header className="mx-auto max-w-2xl text-center">
          <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb] ${localeEyebrow(language)}`}>
            {c.kicker}
          </p>
          <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}>
            {language === "EN" ? "Sigma Team" : c.headline}
          </h1>
          <p className={`mx-auto mt-5 text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}>{c.intro}</p>
        </header>

        <section className="mt-12 rounded-3xl border border-white/[0.08] bg-[#07090f]/70 p-6 shadow-[0_20px_65px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8 lg:p-10">
          <header className="mb-6 border-b border-white/[0.06] pb-5">
            <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1c39bb] ${localeEyebrow(language)}`}>
              {c.boardKicker}
            </p>
            <h2 className={`mt-2 font-display text-xl font-semibold text-white sm:text-2xl ${localeHeading(language)}`}>
              {c.sigmaLabel}
            </h2>
            <p className={`mt-2 text-sm text-[#9aa4af] ${localeBody(language)}`}>{c.boardTitle}</p>
          </header>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#1c39bb]/25 bg-[#0b0f18]/80 p-5 sm:p-6">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9bb4ff] ${localeMeta(language)}`}>{c.coreLabel}</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {c.coreMembers.map((member) => (
                  <MemberTile key={member.id} member={member} language={language} tone="core" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d15]/75 p-5 sm:p-6">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8c0cb] ${localeMeta(language)}`}>{c.innerCircleLabel}</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.innerCircleMembers.map((member) => (
                  <MemberTile key={member.id} member={member} language={language} tone="secondary" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#090c13]/75 p-5 sm:p-6">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] text-[#acb7c6] ${localeMeta(language)}`}>{c.contributorsLabel}</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.contributorsMembers.map((member) => (
                  <MemberTile key={member.id} member={member} language={language} tone="secondary" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-8">
          <p className={`text-sm leading-relaxed text-[#b6bcc4] ${localeBody(language)}`}>{c.extendedNetwork}</p>
          <p className={`mt-3 text-xs leading-relaxed text-[#8f98a3] ${localeMeta(language)}`}>{c.ndaLine}</p>
          <div className="mt-5">
            <PartnerIntentTriggerButton
              className={`inline-flex items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 ${localeMeta(language)}`}
              ariaLabel={c.ctaLabel}
            >
              {c.ctaLabel}
            </PartnerIntentTriggerButton>
          </div>
        </section>
      </div>
    </MarketingSubpageScaffold>
  );
}
