import Image from "next/image";
import Link from "next/link";
import type { InsightPost } from "@/content/insights";
import type { LangCode } from "@/content/types";
import { localeBody, localeMeta, localeNav } from "@/lib/localeTypography";

const DATE_LOCALE: Record<LangCode, string> = {
  EN: "en-US",
  TR: "tr-TR",
  ZH: "zh-CN",
  FA: "fa-IR",
  ES: "es-ES",
  RU: "ru-RU",
  AR: "ar-SA",
};

function formatDate(iso: string, lang: LangCode) {
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function InsightCard({
  post,
  readLabel,
  lang,
  categoryLabel,
}: {
  post: InsightPost;
  readLabel: string;
  lang: LangCode;
  categoryLabel: string;
}) {
  return (
    <article className="group flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/[0.07] bg-[#0d1016]/80 transition-[border-color,box-shadow] duration-300 hover:border-[#1c39bb]/35 hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]">
      <Link href={`/insights/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#151a22]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent opacity-90" />
      </Link>
      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-sm border border-[#1c39bb]/40 bg-[#1c39bb]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bde0fe] ${localeMeta(lang)}`}
          >
            {categoryLabel}
          </span>
          <time
            dateTime={post.publishDate}
            className={`text-[10px] uppercase tracking-[0.12em] text-[#6c757d] ${localeMeta(lang)}`}
          >
            {formatDate(post.publishDate, lang)}
          </time>
          <span className={`text-[10px] uppercase tracking-[0.12em] text-[#6c757d] ${localeMeta(lang)}`}>
            · {post.readTime}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-[#f1f3f5] text-balance sm:text-xl">
          <Link
            href={`/insights/${post.slug}`}
            className="transition-colors hover:text-[#bde0fe]"
          >
            {post.title}
          </Link>
        </h3>
        <p className={`mt-3 min-h-0 flex-1 text-sm leading-relaxed text-[#adb5bd] ${localeBody(lang)}`}>
          {post.excerpt}
        </p>
        <Link
          href={`/insights/${post.slug}`}
          className={`mt-5 inline-flex min-h-10 w-fit items-center gap-1.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bde0fe] transition-colors hover:text-white ${localeNav(lang)}`}
        >
          {readLabel}
          <span aria-hidden className="translate-x-0 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
