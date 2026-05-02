import type { Metadata } from "next";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { faqPageContent, faqPageMeta } from "@/content/pages/faq";

export const metadata: Metadata = {
  title: faqPageMeta.title,
  description: faqPageMeta.description,
};

export default function FaqPage() {
  const c = faqPageContent;
  return (
    <InnerPageShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <header className="text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {c.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#b6bcc4]">
            {c.intro}
          </p>
        </header>
        <div className="mt-12">
          <FaqAccordion items={c.items} />
        </div>
      </div>
    </InnerPageShell>
  );
}
