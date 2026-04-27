"use client";

import Link from "next/link";
import Image from "next/image";
import type { InsightPost } from "@/content/insights";
import type { LangCode } from "@/content/types";
import { useLanguage } from "@/context/LanguageContext";

const DATE_LOCALE: Record<LangCode, string> = {
  EN: "en-US",
  TR: "tr-TR",
  ZH: "zh-CN",
  FA: "fa-IR",
  ES: "es-ES",
  RU: "ru-RU",
};

function formatDate(iso: string, lang: LangCode) {
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

function getCategoryLabel(category: string, t: ReturnType<typeof useLanguage>["t"]) {
  if (category === "Growth") return t.insights.categories.growth;
  if (category === "Distribution") return t.insights.categories.distribution;
  if (category === "Liquidity") return t.insights.categories.liquidity;
  return category;
}

export function RelatedPosts({ posts }: { posts: InsightPost[] }) {
  const { t, lang } = useLanguage();
  if (posts.length === 0) return null;

  return (
    <section
      className="border-t border-white/[0.06] bg-[#07090f]/40"
      aria-labelledby="related-posts"
    >
      <div className="mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-16 lg:px-10">
        <h2
          id="related-posts"
          className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#1c39bb]"
        >
          {t.insights.relatedHeading}
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex min-h-[4.5rem] gap-3 rounded-lg border border-transparent p-2.5 transition-colors hover:border-white/[0.08] hover:bg-white/[0.02] sm:gap-4 sm:p-2"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-[#151a22] sm:h-28 sm:w-36">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover opacity-90 transition group-hover:opacity-100"
                    sizes="144px"
                  />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#6c757d]">
                    {getCategoryLabel(post.category, t)} · {formatDate(post.publishDate, lang)}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold leading-snug text-[#f1f3f5] transition group-hover:text-[#bde0fe]">
                    {post.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
