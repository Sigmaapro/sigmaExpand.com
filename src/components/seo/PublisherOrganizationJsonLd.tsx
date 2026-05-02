import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

/** Standalone Organization publisher node (referenced by {@link GlobalStructuredData} WebSite). */
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
