"use client";

type Props = {
  children: React.ReactNode;
};

/**
 * Shared frame for SEO marketing subpages.
 * Page background comes from root GlobalSigmaPageBackground (/services blinds).
 */
export function MarketingSubpageScaffold({ children }: Props) {
  return (
    <div className="relative min-h-0 flex-1">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
