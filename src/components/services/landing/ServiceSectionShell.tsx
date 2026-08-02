import type { ReactNode } from "react";

type ServiceSectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Visually quieter atmosphere (radial glow). */
  atmosphere?: "none" | "soft" | "violet";
  /** Use when the section has no H2 (e.g. intro paragraph). */
  ariaLabel?: string;
};

/**
 * Shared section frame for service landing pages.
 * No card chrome — spacing and optional atmosphere only.
 */
export function ServiceSectionShell({
  id,
  children,
  className = "",
  atmosphere = "none",
  ariaLabel,
}: ServiceSectionShellProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 border-t border-white/[0.06] ${className}`}
      aria-labelledby={ariaLabel ? undefined : `${id}-heading`}
      aria-label={ariaLabel}
    >
      {atmosphere !== "none" ? (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 ${
            atmosphere === "violet"
              ? "bg-[radial-gradient(60%_50%_at_50%_0%,rgba(79,29,187,0.12),transparent_70%)]"
              : "bg-[radial-gradient(55%_45%_at_50%_0%,rgba(29,137,187,0.08),transparent_68%)]"
          }`}
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        {children}
      </div>
    </section>
  );
}
