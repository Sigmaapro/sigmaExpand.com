import type { ReactNode } from "react";
import Link from "next/link";

/** Shared Service V2 type + contrast tokens. */
export const v2Type = {
  h1: "font-display text-[clamp(2.1rem,1.4rem+2.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white text-balance",
  h2: "font-display text-[clamp(1.7rem,1.4rem+1.15vw,2.75rem)] font-semibold tracking-[-0.02em] text-white text-balance",
  h3: "font-display text-lg font-semibold tracking-tight text-white md:text-xl",
  lead: "max-w-[40rem] text-[0.98rem] leading-[1.65] text-[rgba(238,243,250,0.92)] text-pretty sm:text-[1.0625rem]",
  body: "max-w-[40rem] text-[0.9375rem] leading-[1.65] text-[rgba(228,235,245,0.9)] sm:text-[0.98rem]",
  muted: "max-w-[40rem] text-[0.875rem] leading-[1.62] text-[rgba(198,210,226,0.82)] sm:text-[0.9375rem]",
  meta: "font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-[#b4ccff] sm:text-[12px] sm:leading-none sm:tracking-[0.16em]",
  measure: "max-w-[40rem]",
} as const;

type ServiceV2LinkCtaProps = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
};

export function ServiceV2LinkCta({ href, label, variant = "primary" }: ServiceV2LinkCtaProps) {
  const className =
    variant === "primary"
      ? "inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-[#6d82ff]/80 bg-[#344BFC]/40 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:border-[#9eb0ff] hover:bg-[#344BFC]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/70 sm:px-6 sm:tracking-[0.12em]"
      : "inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-white/28 bg-black/20 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[rgba(235,240,248,0.92)] transition-colors hover:border-white/45 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/70 sm:px-6 sm:tracking-[0.12em]";

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function ServiceV2Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return <p className={`${v2Type.meta} ${className}`}>{children}</p>;
}

type ServiceV2HeadingProps = {
  id: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function ServiceV2Heading({
  id,
  title,
  intro,
  align = "left",
  className = "",
}: ServiceV2HeadingProps) {
  const centered = align === "center";
  return (
    <header className={`mb-10 md:mb-14 ${centered ? "mx-auto text-center" : ""} ${className}`}>
      <h2 id={`${id}-heading`} className={v2Type.h2}>
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 ${v2Type.lead} ${centered ? "mx-auto" : ""}`}>{intro}</p>
      ) : null}
    </header>
  );
}

type ServiceV2SectionTone = "copy" | "veil" | "open";

type ServiceV2SectionProps = {
  id: string;
  children: ReactNode;
  tone?: ServiceV2SectionTone;
  ariaLabel?: string;
  className?: string;
};

const TONE_SCRIM: Record<ServiceV2SectionTone, string> = {
  copy: "bg-[radial-gradient(120%_95%_at_6%_12%,rgba(5,7,14,0.9),rgba(5,7,14,0.58)_38%,rgba(5,7,14,0.22)_68%,transparent_86%)] max-md:bg-[linear-gradient(180deg,rgba(5,7,14,0.86)_0%,rgba(5,7,14,0.68)_62%,rgba(5,7,14,0.4)_100%)]",
  veil: "bg-[radial-gradient(115%_100%_at_8%_8%,rgba(5,7,14,0.94),rgba(5,7,14,0.66)_42%,rgba(5,7,14,0.28)_70%,transparent_88%)] max-md:bg-[linear-gradient(180deg,rgba(5,7,14,0.9)_0%,rgba(5,7,14,0.74)_64%,rgba(5,7,14,0.45)_100%)]",
  open: "bg-[radial-gradient(80%_55%_at_50%_0%,rgba(5,7,14,0.22),transparent_72%)]",
};

export function ServiceV2Section({
  id,
  children,
  tone = "copy",
  ariaLabel,
  className = "",
}: ServiceV2SectionProps) {
  return (
    <section
      id={id}
      className={`relative z-[1] scroll-mt-28 ${className}`}
      aria-labelledby={ariaLabel ? undefined : `${id}-heading`}
      aria-label={ariaLabel}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
        aria-hidden="true"
      />
      <div className={`pointer-events-none absolute inset-0 ${TONE_SCRIM[tone]}`} aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-16 sm:px-5 md:px-6 md:py-24 lg:px-10">
        {children}
      </div>
    </section>
  );
}
