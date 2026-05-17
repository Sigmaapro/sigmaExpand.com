import { SEO_PAGES } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Single JSON-LD graph: Organization ↔ WebSite ↔ WebPage (publisher + isPartOf).
 * Satisfies tools that require `publisher` on WebSite/WebPage, not a lone Organization node.
 * Origin resolves via {@link getSiteUrl} (NEXT_PUBLIC_SITE_URL or production fallback).
 */
export function getPublisherJsonLdGraph() {
  const origin = getSiteUrl().replace(/\/$/, "");
  const base = `${origin}/`;
  const orgId = `${origin}/#organization`;
  const siteId = `${origin}/#website`;
  const pageId = `${origin}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Sigma",
        url: base,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/logo.png`,
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: base,
        name: "Sigma",
        publisher: {
          "@id": orgId,
        },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: base,
        name: SEO_PAGES.home.title,
        isPartOf: {
          "@id": siteId,
        },
        publisher: {
          "@id": orgId,
        },
      },
    ],
  };
}
