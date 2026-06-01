import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { RiskDisclosurePageView } from "@/components/site/marketing/RiskDisclosurePageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("riskDisclosure");

export default function RiskDisclosurePage() {
  return (
    <InnerPageShell>
      <RiskDisclosurePageView />
    </InnerPageShell>
  );
}
