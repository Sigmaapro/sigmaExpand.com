"use client";

import { LegalPolicyPageView } from "@/components/site/marketing/LegalPolicyPageView";
import { cookiesPolicyContentByLang } from "@/content/global/marketing/cookiesContent";

export function CookiesPageView() {
  return <LegalPolicyPageView byLang={cookiesPolicyContentByLang} />;
}
