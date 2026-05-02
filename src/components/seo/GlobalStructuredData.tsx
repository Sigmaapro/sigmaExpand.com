import { SEO_PAGES } from "@/content/seo";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

/** WebSite JSON-LD (publisher Organization is emitted separately by {@link PublisherOrganizationJsonLd}). */
export function GlobalStructuredData() {
  const base = PRODUCTION_SITE_ORIGIN.replace(/\/$/, "");
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: "Sigma",
    url: base,
    description: SEO_PAGES.home.description,
    publisher: { "@id": `${base}/#organization` },
    inLanguage: ["en", "ar", "fa", "tr", "zh", "es", "ru"],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
