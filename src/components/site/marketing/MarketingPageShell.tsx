import type { ReactNode } from "react";
import { MarketingPageBackground } from "@/components/site/marketing/MarketingPageBackground";

type MarketingPageShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function MarketingPageShell({
  children,
  className = "",
  contentClassName = "mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10",
}: MarketingPageShellProps) {
  return (
    <div className={`relative isolate min-h-0 flex-1 overflow-hidden ${className}`.trim()}>
      <MarketingPageBackground />
      <div className={`relative z-10 ${contentClassName}`.trim()}>{children}</div>
    </div>
  );
}
