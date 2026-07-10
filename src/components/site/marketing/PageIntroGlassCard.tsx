import type { ReactNode } from "react";

function IntroGlassLayers() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(150deg,rgba(255,255,255,0.045)_0%,rgba(147,197,253,0.075)_26%,transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(520px_circle_at_50%_0%,rgba(147,197,253,0.12)_0%,rgba(56,96,188,0.08)_32%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(420px_circle_at_18%_12%,rgba(241,248,255,0.1)_0%,transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-[inherit] bg-gradient-to-r from-transparent via-[#93C5FD]/70 to-transparent"
      />
    </>
  );
}

type PageIntroGlassCardProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const GLASS_CARD_CLASS =
  "relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[rgba(147,197,253,0.16)] bg-[linear-gradient(155deg,rgba(7,11,21,0.42),rgba(12,22,42,0.48))] px-6 py-8 text-center shadow-[0_24px_64px_rgba(2,8,22,0.48),0_0_36px_rgba(56,96,188,0.16),0_0_0_1px_rgba(170,198,255,0.07)_inset] backdrop-blur-[22px] [backdrop-filter:saturate(1.08)_blur(22px)] sm:px-10 sm:py-10 md:py-12";

export function PageIntroGlassCard({
  eyebrow,
  title,
  description,
  children,
  className = "",
  eyebrowClassName = "font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD]",
  titleClassName = "font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl",
  descriptionClassName = "mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] md:text-base",
}: PageIntroGlassCardProps) {
  return (
    <header className={`${GLASS_CARD_CLASS} ${className}`.trim()}>
      <IntroGlassLayers />
      <div className="relative z-10">
        <p className={eyebrowClassName}>{eyebrow}</p>
        <h1 className={titleClassName}>{title}</h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
        {children}
      </div>
    </header>
  );
}
