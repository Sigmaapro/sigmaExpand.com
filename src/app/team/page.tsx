import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TeamPageView } from "@/components/site/marketing/TeamPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("team");

export default function TeamPage() {
  return (
    <InnerPageShell>
      <TeamPageView />
    </InnerPageShell>
  );
}
