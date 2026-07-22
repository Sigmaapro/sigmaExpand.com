import Link from "next/link";
import type { ServiceCtaBlock } from "@/content/services";

type ServiceFinalCtaProps = {
  cta: ServiceCtaBlock;
};

export function ServiceFinalCta({ cta }: ServiceFinalCtaProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(147,197,253,0.14)] bg-[linear-gradient(155deg,rgba(8,20,55,0.55),rgba(5,12,30,0.4))] px-6 py-10 text-center shadow-[0_24px_64px_rgba(2,8,22,0.35)] backdrop-blur-xl sm:px-10 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(28,57,187,0.2),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl">
        {cta.eyebrow ? (
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#93C5FD]">
            {cta.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white text-balance md:text-3xl">
          {cta.title}
        </h2>
        {cta.description ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {cta.description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={cta.primaryHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
          >
            {cta.primaryLabel}
          </Link>
          {cta.secondaryHref && cta.secondaryLabel ? (
            <Link
              href={cta.secondaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/45 hover:bg-[#1c39bb]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
            >
              {cta.secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
