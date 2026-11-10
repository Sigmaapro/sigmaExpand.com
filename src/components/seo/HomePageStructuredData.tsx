import { getHomePageJsonLdGraph } from "@/lib/home-page-jsonld";

/** Homepage Organization, brand, websites, and WebPage graph. */
export function HomePageStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomePageJsonLdGraph()) }}
    />
  );
}
