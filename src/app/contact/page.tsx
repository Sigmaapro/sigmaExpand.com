import type { Metadata } from "next";
import { ContactSubpageView } from "@/components/site/ContactSubpageView";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <InnerPageShell>
      <ContactSubpageView />
    </InnerPageShell>
  );
}
