/**
 * Stable routes for marketing nav/footer — single source for hrefs (labels live in nav/footer content).
 */

/** WordPress CMS — destination for user-facing Insights / Blog / Articles navigation */
export const WORDPRESS_INSIGHTS_URL = "https://blog.sigmaa.pro";

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  team: "/team",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  insights: "/insights",
  /** Homepage anchors */
  anchor: {
    system: "/#about",
    capabilities: "/#capabilities",
    /** Proof / metrics strip — closest on-page target for “Network” narrative */
    network: "/#metrics",
    sigmaPro: "/#sigmapro",
    contactStrip: "/#contact",
    connect: "/#connect",
  },
} as const;
