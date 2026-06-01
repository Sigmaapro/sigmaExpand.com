import { organizationSameAs } from "@/content/data/socials";
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
        alternateName: ["Sigma Team", "Sigma Network"],
        url: base,
        logo: `${origin}/logo.svg`,
        description:
          "Global financial growth infrastructure network for crypto exchanges, forex brokers, KOLs, IBs, and Web3 protocols.",
        founder: {
          "@type": "Person",
          name: "Omid Modaber",
        },
        sameAs: [...organizationSameAs],
        contactPoint: {
          "@type": "ContactPoint",
          email: "BD@sigmaa.pro",
          contactType: "Business Development",
          availableLanguage: ["English", "Arabic", "Persian", "Turkish", "Spanish", "Russian"],
        },
        areaServed: ["MENA", "GCC", "Turkey", "Europe", "LATAM", "CIS", "East Asia", "Persian-speaking markets"],
        knowsAbout: [
          "Crypto exchange marketing",
          "Forex broker marketing",
          "KOL marketing",
          "IB program design",
          "Token launch marketing",
          "Web3 growth",
          "Liquidity activation",
          "Crypto user acquisition",
        ],
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
