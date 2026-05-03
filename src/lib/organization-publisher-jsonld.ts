import { SEO_PAGES } from "@/content/seo";

/**
 * Production origin for publisher / @id references (rich results, SEO audits).
 * Must match public deployment host for Google’s publisher checks.
 */
const ORIGIN = "https://sigma-expand-com.vercel.app";
const BASE = `${ORIGIN}/`;
const ORG_ID = `${ORIGIN}/#organization`;
const SITE_ID = `${ORIGIN}/#website`;
const PAGE_ID = `${ORIGIN}/#webpage`;

/**
 * Single JSON-LD graph: Organization ↔ WebSite ↔ WebPage (publisher + isPartOf).
 * Satisfies tools that require `publisher` on WebSite/WebPage, not a lone Organization node.
 */
export function getPublisherJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Sigma",
        url: BASE,
        logo: {
          "@type": "ImageObject",
          url: `${ORIGIN}/logo.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: BASE,
        name: "Sigma",
        publisher: {
          "@id": ORG_ID,
        },
      },
      {
        "@type": "WebPage",
        "@id": PAGE_ID,
        url: BASE,
        name: SEO_PAGES.home.title,
        isPartOf: {
          "@id": SITE_ID,
        },
        publisher: {
          "@id": ORG_ID,
        },
      },
    ],
  };
}
