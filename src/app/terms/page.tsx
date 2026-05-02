import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TermsPageView } from "@/components/site/TermsPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("terms");

export default function TermsPage() {
  return (
    <InnerPageShell>
      <TermsPageView />
    </InnerPageShell>
  );
}
