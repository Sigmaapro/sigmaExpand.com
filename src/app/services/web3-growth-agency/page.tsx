import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("web3GrowthAgency");

export default function Web3GrowthAgencyPage() {
  return <DocumentServicePage documentKey="web3GrowthAgency" />;
}
