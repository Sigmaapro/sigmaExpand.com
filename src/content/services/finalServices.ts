import type { ServiceIconName } from "./types";

/**
 * Client-approved final service catalog (Phase 2).
 * Titles and disclaimer are exact — do not rewrite.
 */

export const SERVICE_DISCLAIMER =
  "Sigmaa provides B2B marketing, growth, technology, research and business-development services. Sigmaa does not provide investment advice, execute transactions, hold customer assets, operate as a broker or market maker, solicit investments, or guarantee listings, liquidity, trading activity or commercial outcomes. Certain services are subject to client eligibility, applicable regulations, target-market restrictions and third-party approval.";

export const SERVICE_PLACEHOLDER_NOTE =
  "This service is reserved in the final catalog. Its editorial source has not been supplied, so the route stays content-pending — no substitute copy has been published.";

export type FinalServiceSlug =
  | "web3-business-development-strategic-partnerships"
  | "kol-influencer-marketing"
  | "crypto-exchange-growth-market-development"
  | "web3-growth-strategy-market-expansion"
  | "affiliate-partner-program-management"
  | "web3-marketing-strategy-campaign-management"
  | "community-management"
  | "web3-content-social-media-marketing"
  | "web3-branding-personal-brand-development"
  | "pr-media-relations"
  | "seo-ai-search-optimization"
  | "web3-market-research-competitive-intelligence"
  | "exchange-listing-readiness-partner-introductions"
  | "web3-crm-automation-product-solutions"
  | "web3-ecosystem-strategy-advisory";

export type FinalService = {
  order: number;
  title: string;
  slug: FinalServiceSlug;
  href: `/services/${FinalServiceSlug}`;
  /** Visual system only — not client copy */
  icon: ServiceIconName;
};

const ICONS: ServiceIconName[] = [
  "network",
  "sparkles",
  "activity",
  "globe",
  "layers",
  "shield",
  "cpu",
  "code2",
  "sparkles",
  "network",
  "cpu",
  "globe",
  "layers",
  "activity",
  "shield",
];

export const FINAL_SERVICES: readonly FinalService[] = [
  {
    order: 1,
    title: "Web3 Business Development & Strategic Partnerships",
    slug: "web3-business-development-strategic-partnerships",
    href: "/services/web3-business-development-strategic-partnerships",
    icon: ICONS[0]!,
  },
  {
    order: 2,
    title: "KOL & Influencer Marketing",
    slug: "kol-influencer-marketing",
    href: "/services/kol-influencer-marketing",
    icon: ICONS[1]!,
  },
  {
    order: 3,
    title: "Crypto Exchange Growth & Market Development",
    slug: "crypto-exchange-growth-market-development",
    href: "/services/crypto-exchange-growth-market-development",
    icon: ICONS[2]!,
  },
  {
    order: 4,
    title: "Web3 Growth Strategy & Market Expansion",
    slug: "web3-growth-strategy-market-expansion",
    href: "/services/web3-growth-strategy-market-expansion",
    icon: ICONS[3]!,
  },
  {
    order: 5,
    title: "Affiliate & Partner Program Management",
    slug: "affiliate-partner-program-management",
    href: "/services/affiliate-partner-program-management",
    icon: ICONS[4]!,
  },
  {
    order: 6,
    title: "Web3 Marketing Strategy & Campaign Management",
    slug: "web3-marketing-strategy-campaign-management",
    href: "/services/web3-marketing-strategy-campaign-management",
    icon: ICONS[5]!,
  },
  {
    order: 7,
    title: "Community Management",
    slug: "community-management",
    href: "/services/community-management",
    icon: ICONS[6]!,
  },
  {
    order: 8,
    title: "Web3 Content & Social Media Marketing",
    slug: "web3-content-social-media-marketing",
    href: "/services/web3-content-social-media-marketing",
    icon: ICONS[7]!,
  },
  {
    order: 9,
    title: "Web3 Branding & Personal Brand Development",
    slug: "web3-branding-personal-brand-development",
    href: "/services/web3-branding-personal-brand-development",
    icon: ICONS[8]!,
  },
  {
    order: 10,
    title: "PR & Media Relations",
    slug: "pr-media-relations",
    href: "/services/pr-media-relations",
    icon: ICONS[9]!,
  },
  {
    order: 11,
    title: "SEO & AI Search Optimization",
    slug: "seo-ai-search-optimization",
    href: "/services/seo-ai-search-optimization",
    icon: ICONS[10]!,
  },
  {
    order: 12,
    title: "Web3 Market Research & Competitive Intelligence",
    slug: "web3-market-research-competitive-intelligence",
    href: "/services/web3-market-research-competitive-intelligence",
    icon: ICONS[11]!,
  },
  {
    order: 13,
    title: "Exchange Listing Readiness & Partner Introductions",
    slug: "exchange-listing-readiness-partner-introductions",
    href: "/services/exchange-listing-readiness-partner-introductions",
    icon: ICONS[12]!,
  },
  {
    order: 14,
    title: "Web3 CRM, Automation & Product Solutions",
    slug: "web3-crm-automation-product-solutions",
    href: "/services/web3-crm-automation-product-solutions",
    icon: ICONS[13]!,
  },
  {
    order: 15,
    title: "Web3 Ecosystem Strategy & Advisory",
    slug: "web3-ecosystem-strategy-advisory",
    href: "/services/web3-ecosystem-strategy-advisory",
    icon: ICONS[14]!,
  },
] as const;

const bySlug = new Map<FinalServiceSlug, FinalService>(
  FINAL_SERVICES.map((service) => [service.slug, service]),
);

export function getFinalServices(): readonly FinalService[] {
  return FINAL_SERVICES;
}

export function getFinalServiceBySlug(slug: string): FinalService | undefined {
  if (!isFinalServiceSlug(slug)) return undefined;
  return bySlug.get(slug);
}

export function isFinalServiceSlug(value: string): value is FinalServiceSlug {
  return bySlug.has(value as FinalServiceSlug);
}

export function getFinalServiceSlugs(): readonly FinalServiceSlug[] {
  return FINAL_SERVICES.map((service) => service.slug);
}
