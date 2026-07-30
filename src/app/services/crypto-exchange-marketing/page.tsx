import type { Metadata } from "next";
import { OfficialServicePage, getOfficialServiceMetadata } from "@/components/services/OfficialServicePage";

export const metadata: Metadata = getOfficialServiceMetadata("crypto-exchange-marketing");

export default function CryptoExchangeMarketingPage() {
  return <OfficialServicePage slug="crypto-exchange-marketing" />;
}
