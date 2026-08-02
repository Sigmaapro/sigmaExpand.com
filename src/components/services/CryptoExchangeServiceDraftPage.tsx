import type { ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { CryptoExchangeServiceHero } from "@/components/services/hero/CryptoExchangeServiceHero";
import { CryptoExchangeLandingBody } from "@/components/services/landing/CryptoExchangeLandingBody";

/**
 * Crypto Exchange imported service page.
 * Hero unchanged; remaining document content rendered via designed landing sections.
 */
export function CryptoExchangeServiceDraftPage({ document }: { document: ImportedServiceDocument }) {
  const lead = document.blocks[0]?.type === "paragraph" ? document.blocks[0].text : "";

  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <CryptoExchangeServiceHero document={document} lead={lead} />
      <CryptoExchangeLandingBody document={document} />
    </div>
  );
}
