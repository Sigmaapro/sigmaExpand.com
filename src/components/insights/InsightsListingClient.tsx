"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { InsightPost, InsightsListingCopy } from "@/content/insights";
import { InsightCard } from "./InsightCard";

export function InsightsListingClient({
  posts,
  categories,
  copy,
}: {
  posts: InsightPost[];
  categories: string[];
  copy: InsightsListingCopy;
}) {
  const [active, setActive] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);
  const featured = useMemo(
    () => posts.find((p) => p.featured) ?? posts[0],
    [posts],
  );
  const showFeatured = active === "all" && Boolean(featured);
  const gridPosts = useMemo(() => {
    if (!showFeatured) return filtered;
    return filtered.filter((p) => p.slug !== featured?.slug);
  }, [filtered, featured, showFeatured]);

  return (
    <div className="mx-auto max-w-[90rem] px-3 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
        <p className="max-w-xl text-sm leading-relaxed text-[#adb5bd] text-pretty">
          {copy.pageSubtitle}
        </p>
        <div
          className="flex flex-wrap gap-2 sm:justify-end"
          role="tablist"
          aria-label={copy.categoryTablistAriaLabel}
        >
          <button
            type="button"
            role="tab"
            aria-selected={active === "all"}
            onClick={() => setActive("all")}
            className={`touch-manipulation rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${
              active === "all"
                ? "border-[#1c39bb]/60 bg-[#1c39bb]/25 text-white"
                : "border-white/[0.1] bg-transparent text-[#8b939e] hover:border-white/20 hover:text-[#e9ecef]"
            }`}
          >
            {copy.filterAllLabel}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`touch-manipulation rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[11px] ${
                active === c
                  ? "border-[#1c39bb]/60 bg-[#1c39bb]/25 text-white"
                  : "border-white/[0.1] bg-transparent text-[#8b939e] hover:border-white/20 hover:text-[#e9ecef]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {showFeatured && featured ? (
        <article className="group mb-8 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d1016]/85 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
            <Link
              href={`/insights/${featured.slug}`}
              className="relative block aspect-[16/11] min-h-[200px] overflow-hidden bg-[#151a22] sm:aspect-[16/10] sm:min-h-[240px] md:aspect-auto md:min-h-[380px]"
            >
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent" />
            </Link>
            <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 md:p-10">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-[#1c39bb]/40 bg-[#1c39bb]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bde0fe]">
                  Featured · {featured.category}
                </span>
                <time
                  dateTime={featured.publishDate}
                  className="text-[10px] uppercase tracking-[0.12em] text-[#6c757d]"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(`${featured.publishDate}T12:00:00`))}
                </time>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#6c757d]">
                  · {featured.readTime}
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-[#f1f3f5] text-balance sm:text-2xl md:text-3xl">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="transition-colors hover:text-[#bde0fe]"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#adb5bd]">
                {featured.excerpt}
              </p>
              <Link
                href={`/insights/${featured.slug}`}
                className="mt-7 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bde0fe] transition-colors hover:text-white"
              >
                {copy.readLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </article>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-[#adb5bd]">
          No briefings in this view.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {gridPosts.map((post) => (
            <li key={post.slug}>
              <InsightCard post={post} readLabel={copy.readLabel} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
