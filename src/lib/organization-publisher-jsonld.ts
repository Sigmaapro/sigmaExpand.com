/**
 * Organization publisher JSON-LD — production origin only (rich results / Search Console).
 */
export const ORGANIZATION_PUBLISHER_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sigma",
  url: "https://sigma-expand-com.vercel.app",
  logo: "https://sigma-expand-com.vercel.app/logo.png",
} as const;

/** Same entity without @context — embed under WebSite `publisher`. */
export const ORGANIZATION_PUBLISHER_NODE = {
  "@type": "Organization",
  name: "Sigma",
  url: "https://sigma-expand-com.vercel.app",
  logo: "https://sigma-expand-com.vercel.app/logo.png",
} as const;
