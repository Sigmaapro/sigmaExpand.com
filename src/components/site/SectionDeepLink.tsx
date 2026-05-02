"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionDeepLink({
  href,
  label,
  className,
  external,
}: {
  href: string;
  label: string;
  className?: string;
  /** Same-origin routes omit this; use for insights URL if external */
  external?: boolean;
}) {
  const isExternal = external ?? /^https?:\/\//i.test(href);
  const cls = [
    "group inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] text-[11px] text-[#7d8692] transition-colors hover:text-[#bde0fe]",
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

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
