"use client";

import Link from "next/link";
import type { InsightPost } from "@/content/insights";
import type { LangCode } from "@/content/types";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeHeading, localeMeta, localeNav } from "@/lib/localeTypography";

const DATE_LOCALE: Record<LangCode, string> = {
  EN: "en-US",
  TR: "tr-TR",
  ZH: "zh-CN",
  FA: "fa-IR",
  ES: "es-ES",
  RU: "ru-RU",
  AR: "ar-SA",
};

function formatDate(iso: string, locale: string) {
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function InsightHero({ post }: { post: InsightPost }) {
  const { t, lang } = useLanguage();
  return (
    <header className="border-b border-white/[0.06] px-3 pb-8 pt-6 sm:px-6 sm:pb-12 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <nav className={`text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6c757d] sm:text-[11px] ${localeNav(lang)}`}>
          <Link href="/insights" className="text-[#8b939e] hover:text-[#bde0fe]">
            {t.insights.backToInsights}
          </Link>
          <span className="mx-2 opacity-50" aria-hidden>
            /
          </span>
          <span className="text-[#adb5bd]">{post.category}</span>
        </nav>
        <h1
          className={`font-display mt-6 text-2xl font-semibold uppercase leading-[1.1] tracking-tight text-[#f8f9fa] text-balance sm:mt-8 sm:text-4xl md:text-5xl ${localeHeading(lang)}`}
        >
          {post.title}
        </h1>
        <p className={`mt-4 text-base leading-relaxed text-[#ced4da] text-pretty sm:mt-6 sm:text-lg md:text-xl ${localeBody(lang)}`}>
          {post.intro}
        </p>
        <div
          className={`mt-6 flex flex-col gap-2 text-[10px] uppercase tracking-[0.14em] text-[#868e96] sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:text-[11px] md:gap-4 ${localeMeta(lang)}`}
        >
          <span className="w-fit rounded-sm border border-[#1c39bb]/35 bg-[#1c39bb]/12 px-2 py-1 text-[#bde0fe]">
            {post.category}
          </span>
          <time dateTime={post.publishDate}>
            {formatDate(post.publishDate, DATE_LOCALE[lang])}
          </time>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span className="sm:inline">{post.author}</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </header>
  );
}
