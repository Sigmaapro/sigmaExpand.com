import { SEO_PAGES } from "@/content/seo";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

/** Organization + WebSite JSON-LD for every page (injected from root layout). */
export function GlobalStructuredData() {
  /** Stable publisher URLs for rich results — never deployment preview hosts. */
  const base = PRODUCTION_SITE_ORIGIN.replace(/\/$/, "");
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Sigma",
    url: base,
    logo: `${base}/logo.png`,
    description: SEO_PAGES.home.description,
  };
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
    "@graph": [org, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
