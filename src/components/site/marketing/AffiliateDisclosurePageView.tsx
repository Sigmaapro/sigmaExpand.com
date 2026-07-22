"use client";

import { LegalPolicyPageView } from "@/components/site/marketing/LegalPolicyPageView";
import { affiliateDisclosureContentByLang } from "@/content/global/marketing/affiliateDisclosureContent";

export function AffiliateDisclosurePageView() {
  return <LegalPolicyPageView byLang={affiliateDisclosureContentByLang} />;
}
