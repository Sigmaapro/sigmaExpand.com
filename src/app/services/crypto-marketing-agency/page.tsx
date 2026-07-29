import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("cryptoMarketingAgency");

export default function CryptoMarketingAgencyPage() {
  return <DocumentServicePage documentKey="cryptoMarketingAgency" />;
}
