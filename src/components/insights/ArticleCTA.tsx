"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function ArticleCTA({
  slot,
  href,
}: {
  slot: "mid" | "end";
  href: string;
}) {
  const { t } = useLanguage();
  const isInternal = href.startsWith("/");
  const className =
    "inline-flex min-h-12 w-full max-w-[20rem] touch-manipulation items-center justify-center border border-[#2a4ecf]/80 bg-[#1c39bb] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_40px_rgba(28,57,187,0.3)] transition-[background,box-shadow,border-color] hover:border-[#bde0fe]/40 hover:bg-[#152a8a] active:scale-[0.99] sm:w-auto sm:max-w-none sm:px-10";
  const heading =
    slot === "mid"
      ? t.insights.articleCtaMidHeading
      : t.insights.articleCtaEndHeading;
  const supporting =
    slot === "mid"
      ? t.insights.articleCtaMidSupporting
      : t.insights.articleCtaEndSupporting;
  const ctaLabel =
    slot === "mid" ? t.insights.articleCtaMidButton : t.insights.articleCtaEndButton;

  return (
    <div className="my-10 border-y border-white/[0.06] bg-[#080a0f]/40 py-10 sm:my-16 sm:py-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-3 text-center sm:px-4">
        <p className="font-display text-lg font-semibold leading-tight text-[#f1f3f5] text-balance sm:text-xl md:text-2xl">
          {heading}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#adb5bd] text-pretty sm:text-base">
          {supporting}
        </p>
        <div className="mt-6 flex w-full justify-center sm:mt-7">
          {isInternal ? (
            <Link href={href} className={className}>
              {ctaLabel}
            </Link>
          ) : (
            <a
              href={href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
