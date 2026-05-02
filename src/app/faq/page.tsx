import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { FaqPageView } from "@/components/site/marketing/FaqPageView";
import { faqPageMetaByLang } from "@/content/global/marketing/faqContent";

const m = faqPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function FaqPage() {
  return (
    <InnerPageShell>
      <FaqPageView />
    </InnerPageShell>
  );
}
