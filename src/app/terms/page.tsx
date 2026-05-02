import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TermsPageView } from "@/components/site/TermsPageView";
import { termsPageMetaByLang } from "@/content/global/termsPage";

const m = termsPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function TermsPage() {
  return (
    <InnerPageShell>
      <TermsPageView />
    </InnerPageShell>
  );
}
