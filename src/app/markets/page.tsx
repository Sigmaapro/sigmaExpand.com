import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { MarketsIndexPageView } from "@/components/site/marketing/MarketsIndexPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("markets");

export default function MarketsPage() {
  return (
    <InnerPageShell>
      <MarketsIndexPageView />
    </InnerPageShell>
  );
}
