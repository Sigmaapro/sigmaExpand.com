"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { localeNav } from "@/lib/localeTypography";

export function SectionDeepLink({
  href,
  label,
  className,
  external,
  openInNewTab = false,
}: {
  href: string;
  label: string;
  className?: string;
  /** Same-origin routes omit this; use for insights URL if external */
  external?: boolean;
  /** Deprecated for internal routes; preserved for backward compatibility */
  openInNewTab?: boolean;
}) {
  const { lang } = useLanguage();
  const isExternal = external ?? /^https?:\/\//i.test(href);
  const cls = [
    "group inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] text-[11px] transition-colors",
    localeNav(lang),
    "text-[#c8d2dc] underline decoration-[#6ea8ff]/45 underline-offset-[5px] drop-shadow-[0_0_14px_rgba(110,168,255,0.22)]",
    "md:text-[#7d8692] md:no-underline md:decoration-transparent md:drop-shadow-none",
    "hover:text-[#bde0fe]",
    className ?? "",
  ].join(" ");

  const inner = (
    <>
      <span>{label}</span>
      <ArrowUpRight
        className="size-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-180"
        strokeWidth={2}
        aria-hidden
      />
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  const allowNewTab = openInNewTab && !href.startsWith("/");
  return <Link href={href} className={cls} {...(allowNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</Link>;
}
