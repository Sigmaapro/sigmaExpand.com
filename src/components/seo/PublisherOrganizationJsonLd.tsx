import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

/**
 * Organization publisher JSON-LD — stable production URLs for rich results
 * (`PRODUCTION_SITE_ORIGIN` matches the deployed host, e.g. sigma-expand-com.vercel.app).
 */
export function PublisherOrganizationJsonLd() {
  const base = PRODUCTION_SITE_ORIGIN.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Sigma",
    url: base,
    logo: `${base}/logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
