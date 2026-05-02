import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { PrivacyPageView } from "@/components/site/marketing/PrivacyPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <InnerPageShell>
      <PrivacyPageView />
    </InnerPageShell>
  );
}
