import type { Metadata } from "next";
import { FaqStructuredData } from "@/components/seo/FaqStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { FaqPageView } from "@/components/site/marketing/FaqPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("faq");

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />
      <InnerPageShell>
        <FaqPageView />
      </InnerPageShell>
    </>
  );
}
