import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TeamPageView } from "@/components/site/marketing/TeamPageView";
import { teamPageMetaByLang } from "@/content/global/marketing/teamContent";

const m = teamPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function TeamPage() {
  return (
    <InnerPageShell>
      <TeamPageView />
    </InnerPageShell>
  );
}
