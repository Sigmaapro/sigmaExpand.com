import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("kolInfrastructure");

export default function KolInfrastructureServicePage() {
  return <DocumentServicePage documentKey="kolInfrastructure" />;
}
