import type { ReactNode } from "react";
import { MarketingFooter } from "@/components/site/MarketingFooter";
import { MarketingHeader } from "@/components/site/MarketingHeader";

export default function ArabicInsightsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-erie bg-sigma-mesh font-body text-cadet antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(28,57,187,0.12),transparent_50%)]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <MarketingHeader />
        <div className="flex-1">{children}</div>
        <MarketingFooter />
      </div>
    </div>
  );
}
