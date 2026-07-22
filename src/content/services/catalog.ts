import type {
  ServiceCatalog,
  ServiceDefinition,
  ServiceKey,
  ServiceSlug,
} from "./types";

const SERVICE_SLUGS = [
  "crypto-exchange-marketing",
  "crypto-marketing-agency",
  "ib-affiliate-growth",
  "kol-infrastructure",
  "market-maker-introductions",
  "regional-market-expansion",
  "web3-growth-agency",
] as const satisfies readonly ServiceSlug[];

function stubService(
  partial: Pick<
    ServiceDefinition,
    | "slug"
    | "key"
    | "order"
    | "icon"
    | "visualType"
    | "title"
    | "shortLabel"
    | "eyebrow"
    | "lead"
    | "intro"
    | "keywords"
    | "relatedSlugs"
  > &
    Partial<Pick<ServiceDefinition, "enabled" | "riskDisclosure" | "visual">>,
): ServiceDefinition {
  const href = `/services/${partial.slug}` as const;
  return {
    enabled: partial.enabled ?? true,
    href,
    audiences: [
      {
        id: "operators",
        title: "Growth operators",
        description:
          "Teams responsible for acquisition, retention, and regional distribution across crypto and financial platforms.",
        icon: "activity",
      },
      {
        id: "founders",
        title: "Founders & product leads",
        description:
          "Leaders who need execution infrastructure rather than one-off campaign bursts.",
        icon: "sparkles",
      },
      {
        id: "partners",
        title: "Partners & networks",
        description:
          "KOLs, IBs, BDs, and affiliates who need structured systems, clear economics, and reliable support.",
        icon: "network",
      },
    ],
    problems: [
      {
        id: "fragmented",
        title: "Fragmented execution",
        description:
          "Channels, creators, and partners operate in silos without a shared operating cadence.",
      },
      {
        id: "unclear-attribution",
        title: "Unclear attribution",
        description:
          "Spend and activity are hard to connect to users, volume, retention, or regional share.",
      },
      {
        id: "fragile-scale",
        title: "Fragile scale",
        description:
          "Campaigns spike briefly, then collapse when infrastructure and ownership are missing.",
      },
    ],
    process: [
      {
        id: "diagnose",
        step: 1,
        title: "Diagnose",
        description:
          "Map current channels, constraints, and north-star metrics before committing spend.",
      },
      {
        id: "architect",
        step: 2,
        title: "Architect",
        description:
          "Design the operating system: partners, funnels, localization, and instrumentation.",
      },
      {
        id: "activate",
        step: 3,
        title: "Activate",
        description:
          "Launch with clear ownership, telemetry, and regional sequencing.",
      },
      {
        id: "compound",
        step: 4,
        title: "Compound",
        description:
          "Iterate on what converts, retire noise, and expand markets with repeatable playbooks.",
      },
    ],
    modules: [
      {
        id: "distribution",
        title: "Distribution systems",
        description:
          "Structured creator, affiliate, and community surfaces aligned to product milestones.",
        bullets: [
          "Channel architecture by region and audience",
          "Creative and messaging systems that stay on-brand",
          "Partner quality controls and activation cadence",
        ],
        icon: "layers",
      },
      {
        id: "conversion",
        title: "Conversion infrastructure",
        description:
          "Funnels, onboarding, and retention loops designed for measurable outcomes.",
        bullets: [
          "Localized landing and nurture paths",
          "VIP / partner onboarding workflows",
          "Retention loops tied to product telemetry",
        ],
        icon: "cpu",
      },
      {
        id: "governance",
        title: "Operating governance",
        description:
          "Clear ownership, reporting, and escalation so growth remains controllable at scale.",
        bullets: [
          "Weekly operating reviews",
          "Transparent partner economics",
          "Risk-aware messaging and compliance framing",
        ],
        icon: "shield",
      },
    ],
    metrics: [
      {
        id: "activation",
        label: "Activation readiness",
        value: "Day-one",
        detail: "Partner and funnel systems ready before spend ramps.",
      },
      {
        id: "coverage",
        label: "Regional coverage",
        value: "Multi-market",
        detail: "Sequenced expansion across priority locales.",
      },
      {
        id: "instrumentation",
        label: "Instrumentation",
        value: "Full-funnel",
        detail: "Attribution and reporting tied to operator metrics.",
      },
    ],
    comparisons: [
      {
        id: "agency-vs-infrastructure",
        title: "Campaign agency vs growth infrastructure",
        description:
          "A concise comparison of short-cycle campaigns versus durable operating systems.",
        columns: [
          { id: "campaign", label: "Campaign agency" },
          { id: "infrastructure", label: "Sigma infrastructure" },
        ],
        rows: [
          {
            id: "horizon",
            feature: "Time horizon",
            cells: { campaign: "Burst / burst-fade", infrastructure: "Compounding systems" },
          },
          {
            id: "ownership",
            feature: "Ownership",
            cells: { campaign: "Vendor-led bursts", infrastructure: "Shared operating cadence" },
          },
          {
            id: "measurement",
            feature: "Measurement",
            cells: { campaign: "Vanity reach", infrastructure: "Users, volume, retention" },
          },
          {
            id: "reuse",
            feature: "Reuse",
            cells: { campaign: "Rebuild every launch", infrastructure: "Playbooks & partners reuse" },
          },
        ],
      },
    ],
    tables: [
      {
        id: "delivery-surfaces",
        title: "Typical delivery surfaces",
        description: "Example operating surfaces included in a structured engagement.",
        columns: [
          { id: "surface", label: "Surface" },
          { id: "owner", label: "Owner" },
          { id: "cadence", label: "Cadence" },
          { id: "signal", label: "Primary signal" },
        ],
        rows: [
          {
            id: "creators",
            cells: {
              surface: "Creator / KOL activation",
              owner: "Sigma + partner",
              cadence: "Weekly",
              signal: "Qualified traffic",
            },
          },
          {
            id: "affiliates",
            cells: {
              surface: "IB / affiliate network",
              owner: "Sigma + BD",
              cadence: "Ongoing",
              signal: "Retained partners",
            },
          },
          {
            id: "localization",
            cells: {
              surface: "Localization & funnels",
              owner: "Shared",
              cadence: "Sprint",
              signal: "Conversion rate",
            },
          },
        ],
      },
    ],
    regionalSections: [
      {
        id: "priority-markets",
        regionLabel: "Priority markets",
        title: "Regional sequencing, not spray-and-pray",
        description:
          "Expansion is ordered by readiness: audience quality, partner density, compliance posture, and product fit.",
        bullets: [
          "Market shortlist with entry criteria",
          "Localized messaging and partner maps",
          "Activation order tied to capacity",
        ],
      },
    ],
    engagement: [
      {
        id: "intake",
        step: 1,
        title: "Intake & diagnostic",
        description: "Align on goals, constraints, and current distribution reality.",
      },
      {
        id: "blueprint",
        step: 2,
        title: "Operating blueprint",
        description: "Agree on surfaces, owners, metrics, and first-wave markets.",
      },
      {
        id: "launch",
        step: 3,
        title: "Controlled launch",
        description: "Activate with telemetry, partner quality gates, and weekly reviews.",
      },
    ],
    faq: [
      {
        id: "what-you-get",
        question: "What does an engagement typically include?",
        answer:
          "A structured operating system spanning distribution surfaces, conversion infrastructure, partner governance, and reporting — scoped to your product and markets.",
      },
      {
        id: "timeline",
        question: "How quickly can activation begin?",
        answer:
          "After diagnostic and blueprint alignment, first-wave activation is sequenced to readiness rather than arbitrary launch dates.",
      },
      {
        id: "outcomes",
        question: "Do you guarantee trading or financial outcomes?",
        answer:
          "No. Sigma provides growth infrastructure and operator support. Outcomes depend on product, market conditions, and partner execution. Sigma does not custody funds or provide investment advice.",
      },
    ],
    cta: {
      eyebrow: "Next step",
      title: "Build the operating system behind your growth",
      description:
        "Share your product, markets, and constraints — we will map the right infrastructure path.",
      primaryLabel: "Talk to Sigma",
      primaryHref: "/contact",
      secondaryLabel: "Explore all services",
      secondaryHref: "/services",
    },
    schema: {
      serviceType: partial.title,
      areaServed: "Worldwide",
      providerName: "Sigma",
    },
    visual: {
      accent: "persian",
      showGrid: true,
      heroDensity: "default",
      ...partial.visual,
    },
    seo: {
      title: `${partial.title} | Sigma`,
      description: partial.lead,
      ogTitle: `${partial.title} | Sigma`,
      ogDescription: partial.lead,
      twitterTitle: `${partial.title} | Sigma`,
      twitterDescription: partial.lead,
      canonicalPath: href,
    },
    riskDisclosure:
      partial.riskDisclosure ??
      "Sigma is a growth infrastructure network. Sigma is not a broker, exchange, investment fund, fund manager, or licensed financial advisor. Sigma does not hold, custody, or trade user funds, and does not guarantee trading profits, withdrawals, or financial outcomes.",
    slug: partial.slug,
    key: partial.key,
    order: partial.order,
    icon: partial.icon,
    visualType: partial.visualType,
    title: partial.title,
    shortLabel: partial.shortLabel,
    eyebrow: partial.eyebrow,
    lead: partial.lead,
    intro: partial.intro,
    keywords: partial.keywords,
    relatedSlugs: partial.relatedSlugs,
  };
}

/**
 * Foundation catalog — seven canonical services for the scalable architecture.
 * Placeholder structural content only; Word/doc import happens in later phases.
 */
export const SERVICES_CATALOG: ServiceCatalog = [
  stubService({
    slug: "crypto-exchange-marketing",
    key: "cryptoExchangeMarketing",
    order: 1,
    icon: "activity",
    visualType: "growth",
    title: "Crypto Exchange Marketing",
    shortLabel: "Exchange Marketing",
    eyebrow: "Platform growth",
    lead:
      "Operator-led acquisition, localization, and liquidity-aligned distribution for crypto exchanges and trading platforms.",
    intro:
      "Build durable user and volume growth with partner networks, regional funnels, and instrumentation designed for exchange operators — not one-off campaign bursts.",
    keywords: [
      "crypto exchange marketing",
      "exchange growth",
      "crypto user acquisition",
      "exchange localization",
    ],
    relatedSlugs: ["crypto-marketing-agency", "kol-infrastructure", "ib-affiliate-growth"],
  }),
  stubService({
    slug: "crypto-marketing-agency",
    key: "cryptoMarketingAgency",
    order: 2,
    icon: "sparkles",
    visualType: "default",
    title: "Crypto Marketing Agency",
    shortLabel: "Crypto Marketing",
    eyebrow: "Full-funnel growth",
    lead:
      "Full-funnel crypto marketing systems spanning creators, communities, paid surfaces, and retention loops.",
    intro:
      "Coordinate messaging, partners, and conversion infrastructure so crypto growth compounds across markets instead of resetting every quarter.",
    keywords: [
      "crypto marketing agency",
      "web3 marketing",
      "crypto growth agency",
      "crypto acquisition",
    ],
    relatedSlugs: ["web3-growth-agency", "crypto-exchange-marketing", "regional-market-expansion"],
  }),
  stubService({
    slug: "ib-affiliate-growth",
    key: "ibAffiliateGrowth",
    order: 3,
    icon: "network",
    visualType: "network",
    title: "IB & Affiliate Growth",
    shortLabel: "IB & Affiliates",
    eyebrow: "Partner economics",
    lead:
      "Structured IB and affiliate programs with commission architecture, onboarding, and retention systems.",
    intro:
      "Move from scattered referrals to a governed BD and affiliate operating system with clear economics, quality controls, and compounding partner retention.",
    keywords: [
      "crypto IB program",
      "forex IB network",
      "affiliate growth",
      "broker IB programs",
    ],
    relatedSlugs: ["crypto-exchange-marketing", "kol-infrastructure", "web3-growth-agency"],
  }),
  stubService({
    slug: "kol-infrastructure",
    key: "kolInfrastructure",
    order: 4,
    icon: "cpu",
    visualType: "infrastructure",
    title: "KOL Infrastructure",
    shortLabel: "KOL Infrastructure",
    eyebrow: "Creator systems",
    lead:
      "Creator infrastructure for crypto, forex, and Web3 — affiliate stacks, tools, SEO, and monetization systems.",
    intro:
      "Go beyond placements. Build the operating layer KOLs need: bots, sites, deals, partnerships, and quality distribution that compounds.",
    keywords: [
      "crypto KOL agency",
      "KOL infrastructure",
      "creator monetization",
      "SEO for KOLs",
    ],
    relatedSlugs: ["ib-affiliate-growth", "crypto-marketing-agency", "crypto-exchange-marketing"],
  }),
  stubService({
    slug: "market-maker-introductions",
    key: "marketMakerIntroductions",
    order: 5,
    icon: "layers",
    visualType: "liquidity",
    title: "Market Maker Introductions",
    shortLabel: "Market Makers",
    eyebrow: "Liquidity readiness",
    lead:
      "Structured introductions and coordination support for market-maker conversations around launch and listing readiness.",
    intro:
      "Align distribution, listing readiness, and market-maker conversations so liquidity planning sits inside a broader launch operating system — with clear non-guarantee framing.",
    keywords: [
      "market maker introduction",
      "crypto liquidity",
      "listing readiness",
      "token launch liquidity",
    ],
    relatedSlugs: ["crypto-exchange-marketing", "web3-growth-agency", "regional-market-expansion"],
    riskDisclosure:
      "Sigma may facilitate introductions and coordination support. Sigma does not guarantee listings, liquidity, spreads, inventory, trading outcomes, or market-maker agreements. All counterparties remain independent.",
  }),
  stubService({
    slug: "regional-market-expansion",
    key: "regionalMarketExpansion",
    order: 6,
    icon: "globe",
    visualType: "regional",
    title: "Regional Market Expansion",
    shortLabel: "Regional Expansion",
    eyebrow: "Market sequencing",
    lead:
      "Sequenced regional expansion with localization, partner maps, and activation capacity planning.",
    intro:
      "Enter markets in order of readiness. Combine localization, creator/IB density, and compliance-aware messaging so expansion is deliberate and measurable.",
    keywords: [
      "regional crypto expansion",
      "crypto localization",
      "multi-market growth",
      "regional distribution",
    ],
    relatedSlugs: ["crypto-marketing-agency", "web3-growth-agency", "kol-infrastructure"],
  }),
  stubService({
    slug: "web3-growth-agency",
    key: "web3GrowthAgency",
    order: 7,
    icon: "shield",
    visualType: "growth",
    title: "Web3 Growth Agency",
    shortLabel: "Web3 Growth",
    eyebrow: "Web3 distribution",
    lead:
      "Web3 growth infrastructure spanning community, creators, partnerships, and retention systems.",
    intro:
      "Treat Web3 growth as an operating system: distribution quality, partner governance, and retention loops that survive beyond a single launch window.",
    keywords: [
      "web3 growth agency",
      "web3 marketing",
      "crypto community growth",
      "web3 distribution",
    ],
    relatedSlugs: ["crypto-marketing-agency", "regional-market-expansion", "kol-infrastructure"],
  }),
];

const bySlug = new Map<ServiceSlug, ServiceDefinition>(
  SERVICES_CATALOG.map((service) => [service.slug, service]),
);

const byKey = new Map<ServiceKey, ServiceDefinition>(
  SERVICES_CATALOG.map((service) => [service.key, service]),
);

export function getAllServices(): ServiceDefinition[] {
  return [...SERVICES_CATALOG].sort((a, b) => a.order - b.order);
}

export function getEnabledServices(): ServiceDefinition[] {
  return getAllServices().filter((service) => service.enabled);
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  if (!isServiceSlug(slug)) return undefined;
  return bySlug.get(slug);
}

export function getServiceByKey(key: ServiceKey): ServiceDefinition | undefined {
  return byKey.get(key);
}

export function getRelatedServices(slug: ServiceSlug): ServiceDefinition[] {
  const service = bySlug.get(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((related) => bySlug.get(related))
    .filter((item): item is ServiceDefinition => Boolean(item && item.enabled));
}

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function getServiceSlugs(): readonly ServiceSlug[] {
  return SERVICE_SLUGS;
}
