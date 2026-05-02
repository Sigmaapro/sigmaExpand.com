import { faqPageContentByLang } from "@/content/global/marketing/faqContent";
import { getCanonicalUrl } from "@/content/seo";

/** FAQPage schema (English FAQ copy — stable for crawlers). */
export function FaqStructuredData() {
  const items = faqPageContentByLang.EN.items;
  const url = getCanonicalUrl("/faq");

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url,
    name: "Sigma FAQ",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
