import type { ReactNode } from "react";

type ServiceSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function ServiceSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: ServiceSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 py-10 md:py-12 ${className}`.trim()}
    >
      {(eyebrow || title || description) && (
        <header className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c39bb] sm:text-[11px]">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white text-balance md:text-3xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children ? <div className={title || description || eyebrow ? "mt-8 md:mt-10" : undefined}>{children}</div> : null}
    </section>
  );
}
