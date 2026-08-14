import type { ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { buildCryptoExchangeLandingModel } from "@/content/services/landing/cryptoExchangeLandingModel";
import { CryptoExchangeServiceHero } from "@/components/services/hero/CryptoExchangeServiceHero";
import { CryptoExchangeLandingBody } from "@/components/services/landing/CryptoExchangeLandingBody";

/**
 * Crypto Exchange imported service page.
 * Hero unchanged; remaining document content rendered via designed landing sections.
 */
export function CryptoExchangeServiceDraftPage({ document }: { document: ImportedServiceDocument }) {
  const lead = document.blocks[0]?.type === "paragraph" ? document.blocks[0].text : "";
  const intro = buildCryptoExchangeLandingModel(document).intro;

  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <div className="relative z-10">
        <CryptoExchangeServiceHero document={document} lead={lead} intro={intro} />
        <CryptoExchangeLandingBody document={document} />
      </div>
    </div>
  );
}
