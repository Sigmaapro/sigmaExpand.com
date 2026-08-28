import type { FinalServiceSlug } from "@/content/services/finalServices";
import { WEB3_BUSINESS_DEVELOPMENT_STRATEGIC_PARTNERSHIPS_V2 } from "@/content/services/landing/web3BusinessDevelopmentStrategicPartnerships";
import {
  AFFILIATE_PARTNER_PROGRAM_MANAGEMENT_V2,
  COMMUNITY_MANAGEMENT_V2,
  CRYPTO_EXCHANGE_GROWTH_MARKET_DEVELOPMENT_V2,
  EXCHANGE_LISTING_READINESS_PARTNER_INTRODUCTIONS_V2,
  KOL_INFLUENCER_MARKETING_V2,
  PR_MEDIA_RELATIONS_V2,
  WEB3_BRANDING_PERSONAL_BRAND_DEVELOPMENT_V2,
  WEB3_CONTENT_SOCIAL_MEDIA_MARKETING_V2,
  WEB3_CRM_AUTOMATION_PRODUCT_SOLUTIONS_V2,
  WEB3_ECOSYSTEM_STRATEGY_ADVISORY_V2,
  WEB3_GROWTH_STRATEGY_MARKET_EXPANSION_V2,
  WEB3_MARKET_RESEARCH_COMPETITIVE_INTELLIGENCE_V2,
  WEB3_MARKETING_STRATEGY_CAMPAIGN_MANAGEMENT_V2,
} from "./pages";
import type { ServiceV2Content } from "./types";

const SERVICE_V2_BY_SLUG: Partial<Record<FinalServiceSlug, ServiceV2Content>> = {
  "web3-business-development-strategic-partnerships":
    WEB3_BUSINESS_DEVELOPMENT_STRATEGIC_PARTNERSHIPS_V2,
  "kol-influencer-marketing": KOL_INFLUENCER_MARKETING_V2,
  "crypto-exchange-growth-market-development": CRYPTO_EXCHANGE_GROWTH_MARKET_DEVELOPMENT_V2,
  "web3-growth-strategy-market-expansion": WEB3_GROWTH_STRATEGY_MARKET_EXPANSION_V2,
  "affiliate-partner-program-management": AFFILIATE_PARTNER_PROGRAM_MANAGEMENT_V2,
  "web3-marketing-strategy-campaign-management": WEB3_MARKETING_STRATEGY_CAMPAIGN_MANAGEMENT_V2,
  "community-management": COMMUNITY_MANAGEMENT_V2,
  "web3-content-social-media-marketing": WEB3_CONTENT_SOCIAL_MEDIA_MARKETING_V2,
  "web3-branding-personal-brand-development": WEB3_BRANDING_PERSONAL_BRAND_DEVELOPMENT_V2,
  "pr-media-relations": PR_MEDIA_RELATIONS_V2,
  "web3-market-research-competitive-intelligence": WEB3_MARKET_RESEARCH_COMPETITIVE_INTELLIGENCE_V2,
  "exchange-listing-readiness-partner-introductions":
    EXCHANGE_LISTING_READINESS_PARTNER_INTRODUCTIONS_V2,
  "web3-crm-automation-product-solutions": WEB3_CRM_AUTOMATION_PRODUCT_SOLUTIONS_V2,
  "web3-ecosystem-strategy-advisory": WEB3_ECOSYSTEM_STRATEGY_ADVISORY_V2,
};

export function getServiceV2Content(slug: string): ServiceV2Content | undefined {
  return SERVICE_V2_BY_SLUG[slug as FinalServiceSlug];
}

export function isServiceV2Slug(slug: string): boolean {
  return getServiceV2Content(slug) !== undefined;
}
