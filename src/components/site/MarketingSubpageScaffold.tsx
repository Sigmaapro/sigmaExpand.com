"use client";

type Props = {
  children: React.ReactNode;
};

/**
 * Shared frame for SEO marketing subpages: mesh background, content surface, bottom CTA.
 * Does not alter global header/footer (InnerPageShell).
 */
export function MarketingSubpageScaffold({ children }: Props) {
  return (
    <div className="relative min-h-0 flex-1">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -inset-[20%] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(28,57,187,0.12),transparent_70%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(189,224,254,0.04),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.07] sm:opacity-[0.1] bg-sigma-mesh" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
