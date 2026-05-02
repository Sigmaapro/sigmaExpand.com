import type { Metadata } from "next";
import { ContactSubpageView } from "@/components/site/ContactSubpageView";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { contactSubpageMetaByLang } from "@/content/global/marketing/contactSubpageContent";

const m = contactSubpageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function ContactPage() {
  return (
    <InnerPageShell>
      <ContactSubpageView />
    </InnerPageShell>
  );
}
