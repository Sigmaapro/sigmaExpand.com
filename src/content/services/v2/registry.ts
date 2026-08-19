import type { FinalServiceSlug } from "@/content/services/finalServices";
import { WEB3_BUSINESS_DEVELOPMENT_STRATEGIC_PARTNERSHIPS_V2 } from "@/content/services/landing/web3BusinessDevelopmentStrategicPartnerships";
import type { ServiceV2Content } from "./types";

const SERVICE_V2_BY_SLUG: Partial<Record<FinalServiceSlug, ServiceV2Content>> = {
  "web3-business-development-strategic-partnerships":
    WEB3_BUSINESS_DEVELOPMENT_STRATEGIC_PARTNERSHIPS_V2,
};

export function getServiceV2Content(slug: string): ServiceV2Content | undefined {
  return SERVICE_V2_BY_SLUG[slug as FinalServiceSlug];
}

export function isServiceV2Slug(slug: string): boolean {
  return getServiceV2Content(slug) !== undefined;
}
