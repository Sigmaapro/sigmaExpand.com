"use client";

import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import type { ComponentType } from "react";
import Link from "next/link";
import { getGlobalFooter, type FooterColumnLink } from "@/content/global/footer";
import type { LangCode } from "@/content/types";
import { socialLinks } from "@/content/socials";
import { useLanguage } from "@/context/LanguageContext";
import { localeFooter, localeNav } from "@/lib/localeTypography";

/** Footer social column — X, Instagram, Telegram, LinkedIn only */
const FOOTER_SOCIAL_ORDER = ["x", "instagram", "telegram", "linkedin"] as const;

type FooterSocialKey = (typeof FOOTER_SOCIAL_ORDER)[number];

const FOOTER_SOCIAL_ICON_MAP: Record<
  FooterSocialKey,
  ComponentType<{ className?: string }>
> = {
  x: FaXTwitter,
  instagram: FaInstagram,
  telegram: FaTelegram,
  linkedin: FaLinkedinIn,
};

function FooterColumnBlock({
  title,
  links,
  lang,
}: {
  title: string;
  links: FooterColumnLink[];
  lang: LangCode;
}) {
  const ar = localeFooter(lang);
  return (
    <div className="min-w-0">
      <p
        className={`font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a0aab4] md:text-[#8b939e] ${ar}`}
      >
        {title}
      </p>
      <ul className="mt-2 space-y-1.5 md:mt-3 md:space-y-2">
        {links.map((link) => {
          const common =
            `block break-words text-[13px] leading-snug text-[#cfd6de] transition-colors hover:text-[#bde0fe] md:text-[#b6bcc4] ${ar}`;
          if (link.disabled) {
            return (
              <li key={link.label}>
                <span className={`cursor-not-allowed opacity-45 ${common}`}>{link.label}</span>
              </li>
            );
          }
          const isExternal = link.external === true || link.href.startsWith("http");
          if (isExternal) {
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={common}
                >
                  {link.label}
                </a>
              </li>
            );
          }
          return (
            <li key={link.label}>
              <Link href={link.href} className={common}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function MarketingFooter() {
  const { language, isRtl } = useLanguage();
  const f = getGlobalFooter(language);
  const ar = localeFooter(language);

  return (
    <footer
      className="relative z-10 border-t border-white/[0.07] bg-[#07090f]/95 shadow-[0_-12px_48px_rgba(28,57,187,0.08)] backdrop-blur-xl"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px max-w-5xl bg-gradient-to-r from-transparent via-[#1c39bb]/35 to-transparent opacity-90" />

      <div className="mx-auto max-w-[90rem] px-5 pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] pt-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-md min-w-0 lg:max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center font-display text-[1.75rem] font-semibold leading-none text-white drop-shadow-[0_0_14px_rgba(189,224,254,0.18)]">
                Σ
              </span>
              <span
                className={`font-display text-sm font-semibold tracking-[0.14em] text-[#c5ccd3] normal-case ${localeNav(language)}`}
              >
                {f.brandWordmark}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#cfd6de] md:text-[#b6bcc4]">{f.brandTagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#8f98a3] md:text-[#6f7884]">{f.trustLine}</p>
            <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#05070c]/80 px-4 py-3">
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a0aab4] md:text-[#8b939e] ${ar}`}
              >
                {f.contactIntro}
              </p>
              <a
                href={`mailto:${f.email}`}
                className="mt-1 block text-sm font-medium text-[#bde0fe] underline-offset-4 hover:underline"
              >
                {f.email}
              </a>
            </div>
          </div>

          <nav
            aria-label={f.landmarkNav}
            className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-5 md:gap-x-6 md:gap-y-8 lg:contents"
          >
            <FooterColumnBlock
              title={f.columnPlatform.title}
              links={f.columnPlatform.links}
              lang={language}
            />
            <FooterColumnBlock
              title={f.columnCompany.title}
              links={f.columnCompany.links}
              lang={language}
            />
            <FooterColumnBlock
              title={f.columnResources.title}
              links={f.columnResources.links}
              lang={language}
            />
            <div className="min-w-0">
              <p
                className={`font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a0aab4] md:text-[#8b939e] ${ar}`}
              >
                {f.socialColumnTitle}
              </p>
              <ul
                className="mt-2 grid grid-cols-1 gap-x-2 gap-y-1.5 md:mt-3 md:gap-y-2"
                aria-label={f.landmarkSocial}
              >
                {FOOTER_SOCIAL_ORDER.map((key) => {
                  const Icon = FOOTER_SOCIAL_ICON_MAP[key];
                  const href = socialLinks[key].trim();
                  const enabled = href.length > 0;
                  const label = f.socialLabels[key];
                  return (
                    <li key={key} className="min-w-0">
                      {enabled ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex min-h-[40px] items-center gap-2 rounded-lg py-0.5 text-[13px] leading-snug text-[#cfd6de] transition-colors hover:text-white md:min-h-0 md:py-1 md:text-[#b6bcc4] ${ar}`}
                        >
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[#bde0fe] transition-colors group-hover:border-[#1c39bb]/40">
                            <Icon className="size-3.5" />
                          </span>
                          <span className="min-w-0 break-words">{label}</span>
                        </a>
                      ) : (
                        <span className="flex min-h-[40px] items-center gap-2 py-0.5 text-[13px] leading-snug text-[#6f7884] opacity-50 md:min-h-0 md:py-1">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.05] bg-white/[0.02]">
                            <Icon className="size-3.5" />
                          </span>
                          <span className="min-w-0 break-words">{label}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-[#8f98a3] md:text-[#6f7884]">{f.bottomCopyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
            <Link
              href={f.privacy.href}
              className={`text-[#a0aab4] transition-colors hover:text-[#bde0fe] md:text-[#8b939e] ${ar}`}
            >
              {f.privacy.label}
            </Link>
            {f.terms.disabled ? (
              <span className="cursor-not-allowed text-[#6f7884] opacity-50">{f.terms.label}</span>
            ) : (
              <Link
                href={f.terms.href}
                className={`text-[#a0aab4] transition-colors hover:text-[#bde0fe] md:text-[#8b939e] ${ar}`}
              >
                {f.terms.label}
              </Link>
            )}
            <span className="text-[#8f98a3] md:text-[#6f7884]">
              {f.statusLabel}:{" "}
              <span className="font-medium text-[#8fdbb6]">{f.statusValue}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
