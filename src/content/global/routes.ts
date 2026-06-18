/**
 * Stable routes for marketing nav/footer — single source for hrefs (labels live in nav/footer content).
 */

/** WordPress CMS — destination for user-facing Insights / Blog / Articles navigation */
export const WORDPRESS_INSIGHTS_URL = "https://blog.sigmaa.pro";

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  servicesPlatformGrowth: "/services/platform-growth",
  servicesKolInfrastructure: "/services/kol-infrastructure",
  servicesIbProgram: "/services/ib-program",
  servicesTraderNetwork: "/services/trader-network",
  servicesTokenLaunch: "/services/token-launch",
  markets: "/markets",
  products: "/products",
  riskDisclosure: "/risk-disclosure",
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
    /** Proof / metrics strip — primary section target for “Network” narrative */
    network: "/#network",
    sigmaPro: "/#sigmapro",
    contactStrip: "/#contact",
    connect: "/#connect",
  },
} as const;
