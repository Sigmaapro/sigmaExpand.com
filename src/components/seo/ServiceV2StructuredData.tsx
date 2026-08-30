import type { ServiceV2Content } from "@/content/services/v2/types";
import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Service + BreadcrumbList (+ FAQPage when approved FAQ items exist) for V2 service routes.
 * Uses only approved V2 fields; provider links the global Organization `@id`.
 */
export function ServiceV2StructuredData({ content }: { content: ServiceV2Content }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const path = `/services/${content.slug}`;
  const serviceUrl = getCanonicalUrl(path);
  const servicesUrl = getCanonicalUrl("/services");
  const organizationId = `${base}/#organization`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    description: content.meta.description,
    url: serviceUrl,
    serviceType: content.title,
    provider: {
      "@type": "Organization",
      "@id": organizationId,
      name: "Sigma",
      url: `${base}/`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Services", item: servicesUrl },
      { "@type": "ListItem", position: 3, name: content.title, item: serviceUrl },
    ],
  };

  const faqItems =
    content.faq?.items.filter((item) => item.question.trim().length > 0 && item.answer.trim().length > 0) ??
    [];

  const faq =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: serviceUrl,
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      ) : null}
    </>
  );
}
