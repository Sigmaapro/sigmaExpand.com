import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TeamPageView } from "@/components/site/marketing/TeamPageView";
import { buildPageMetadata } from "@/content/seo";

const TEAM_TITLE = "Sigma Team | Crypto, Forex & Web3 Growth Operators";
const TEAM_DESCRIPTION =
  "Meet Sigma’s operators, Inner Circle partners, and contributors building growth infrastructure for crypto exchanges, forex brokers, KOLs, IBs, and Web3.";

const teamBaseMetadata = buildPageMetadata("team");

export const metadata: Metadata = {
  ...teamBaseMetadata,
  title: { absolute: TEAM_TITLE },
  description: TEAM_DESCRIPTION,
  openGraph: {
    ...teamBaseMetadata.openGraph,
    title: TEAM_TITLE,
    description: TEAM_DESCRIPTION,
  },
  twitter: {
    ...teamBaseMetadata.twitter,
    title: TEAM_TITLE,
    description: TEAM_DESCRIPTION,
  },
};

export default function TeamPage() {
  return (
    <InnerPageShell>
      <TeamPageView />
    </InnerPageShell>
  );
}
