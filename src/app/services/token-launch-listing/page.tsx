import type { Metadata } from "next";
import { OfficialServicePage, getOfficialServiceMetadata } from "@/components/services/OfficialServicePage";

export const metadata: Metadata = getOfficialServiceMetadata("token-launch-listing");

export default function TokenLaunchListingPage() {
  return <OfficialServicePage slug="token-launch-listing" />;
}
