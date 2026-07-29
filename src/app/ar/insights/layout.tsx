import type { ReactNode } from "react";
import { MarketingFooter } from "@/components/site/MarketingFooter";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { RtlScriptSurface } from "@/components/site/RtlScriptSurface";

export default function ArabicInsightsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen overflow-x-clip bg-transparent font-body text-cadet antialiased">
      <div className="relative z-10 flex min-h-screen flex-col">
        <MarketingHeader />
        <RtlScriptSurface className="flex-1">{children}</RtlScriptSurface>
        <MarketingFooter />
      </div>
    </div>
  );
}
