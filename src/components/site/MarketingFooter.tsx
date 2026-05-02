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
import { socialLinks } from "@/content/socials";
import { useLanguage } from "@/context/LanguageContext";

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
}: {
  title: string;
  links: FooterColumnLink[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b939e]">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => {
          const common =
            "text-[13px] leading-snug text-[#b6bcc4] transition-colors hover:text-[#bde0fe]";
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
              <Link href={link.href} className={`inline-block ${common}`}>
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

  return (
    <footer
      className="relative z-10 border-t border-white/[0.07] bg-[#07090f]/95 shadow-[0_-12px_48px_rgba(28,57,187,0.08)] backdrop-blur-xl"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px max-w-5xl bg-gradient-to-r from-transparent via-[#1c39bb]/35 to-transparent opacity-90" />

      <div className="mx-auto max-w-[90rem] px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center font-display text-[1.75rem] font-semibold leading-none text-white drop-shadow-[0_0_14px_rgba(189,224,254,0.18)]">
                Σ
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-[#c5ccd3]">
                Sigma
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4]">{f.brandTagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#6f7884]">{f.trustLine}</p>
            <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#05070c]/80 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b939e]">
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

          <nav aria-label={f.landmarkNav} className="grid gap-8 sm:grid-cols-2 lg:contents">
            <FooterColumnBlock title={f.columnPlatform.title} links={f.columnPlatform.links} />
            <FooterColumnBlock title={f.columnCompany.title} links={f.columnCompany.links} />
            <FooterColumnBlock title={f.columnResources.title} links={f.columnResources.links} />
            <div className="min-w-0">
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b939e]">
                {f.socialColumnTitle}
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-1" aria-label={f.landmarkSocial}>
                {FOOTER_SOCIAL_ORDER.map((key) => {
                  const Icon = FOOTER_SOCIAL_ICON_MAP[key];
                  const href = socialLinks[key].trim();
                  const enabled = href.length > 0;
                  const label = f.socialLabels[key];
                  return (
                    <li key={key}>
                      {enabled ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 rounded-lg py-1 text-[13px] text-[#b6bcc4] transition-colors hover:text-white"
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[#bde0fe] transition-colors group-hover:border-[#1c39bb]/40">
                            <Icon className="size-3.5" />
                          </span>
                          <span>{label}</span>
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 py-1 text-[13px] text-[#6f7884] opacity-50">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.05] bg-white/[0.02]">
                            <Icon className="size-3.5" />
                          </span>
                          {label}
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
          <p className="text-[11px] text-[#6f7884]">{f.bottomCopyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px]">
            <Link href={f.privacy.href} className="text-[#8b939e] transition-colors hover:text-[#bde0fe]">
              {f.privacy.label}
            </Link>
            {f.terms.disabled ? (
              <span className="cursor-not-allowed text-[#6f7884] opacity-50">{f.terms.label}</span>
            ) : (
              <Link href={f.terms.href} className="text-[#8b939e] transition-colors hover:text-[#bde0fe]">
                {f.terms.label}
              </Link>
            )}
            <span className="text-[#6f7884]">
              {f.statusLabel}:{" "}
              <span className="font-medium text-[#8fdbb6]">{f.statusValue}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
