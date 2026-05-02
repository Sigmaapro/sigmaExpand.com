import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { PrivacyPageView } from "@/components/site/marketing/PrivacyPageView";
import { privacyPageMetaByLang } from "@/content/global/marketing/privacyContent";

const m = privacyPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function PrivacyPage() {
  return (
    <InnerPageShell>
      <PrivacyPageView />
    </InnerPageShell>
  );
}
