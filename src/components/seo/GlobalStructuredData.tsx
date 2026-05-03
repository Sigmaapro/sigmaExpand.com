import { getPublisherJsonLdGraph } from "@/lib/organization-publisher-jsonld";

/** Organization + WebSite + WebPage `@graph` (publisher linked for SEO audits). */
export function GlobalStructuredData() {
  const graph = getPublisherJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
