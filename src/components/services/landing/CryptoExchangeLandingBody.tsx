import dynamic from "next/dynamic";
import type { ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { buildCryptoExchangeLandingModel } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceIntroStatement } from "@/components/services/landing/ServiceIntroStatement";
import { ServiceWhatIsSection } from "@/components/services/landing/ServiceWhatIsSection";
import { ServiceAudienceBento } from "@/components/services/landing/ServiceAudienceBento";
import { ServiceProblemGrid } from "@/components/services/landing/ServiceProblemGrid";
import { ServiceCapabilitiesBento } from "@/components/services/landing/ServiceCapabilitiesBento";
import { ServiceMetricsGrid } from "@/components/services/landing/ServiceMetricsGrid";
import { ServiceRegionalMap } from "@/components/services/landing/ServiceRegionalMap";
import { ServiceAcquisitionFlow } from "@/components/services/landing/ServiceAcquisitionFlow";
import { ServiceConversionFlow } from "@/components/services/landing/ServiceConversionFlow";
import { ServiceBrokersSection } from "@/components/services/landing/ServiceBrokersSection";
import { ServiceRiskSection } from "@/components/services/landing/ServiceRiskSection";

const ServiceGrowthLoop = dynamic(
  () =>
    import("@/components/services/landing/ServiceGrowthLoop").then((m) => m.ServiceGrowthLoop),
  { ssr: true },
);
const ServiceGrowthTimeline = dynamic(
  () =>
    import("@/components/services/landing/ServiceGrowthTimeline").then((m) => m.ServiceGrowthTimeline),
  { ssr: true },
);
const ServiceChannelStack = dynamic(
  () =>
    import("@/components/services/landing/ServiceChannelStack").then((m) => m.ServiceChannelStack),
  { ssr: true },
);
const ServiceComparison = dynamic(
  () =>
    import("@/components/services/landing/ServiceComparison").then((m) => m.ServiceComparison),
  { ssr: true },
);
const ServiceAudienceMarquee = dynamic(
  () =>
    import("@/components/services/landing/ServiceAudienceMarquee").then((m) => m.ServiceAudienceMarquee),
  { ssr: true },
);
const ServiceEngagementStepper = dynamic(
  () =>
    import("@/components/services/landing/ServiceEngagementStepper").then(
      (m) => m.ServiceEngagementStepper,
    ),
  { ssr: true },
);
const ServiceFaq = dynamic(
  () => import("@/components/services/landing/ServiceFaq").then((m) => m.ServiceFaq),
  { ssr: true },
);
const ServiceFinalCta = dynamic(
  () => import("@/components/services/landing/ServiceFinalCta").then((m) => m.ServiceFinalCta),
  { ssr: true },
);

/**
 * Designed body for crypto-exchange-growth-market-development (below Hero).
 * Consumes exact imported document text via buildCryptoExchangeLandingModel.
 */
export function CryptoExchangeLandingBody({ document }: { document: ImportedServiceDocument }) {
  const model = buildCryptoExchangeLandingModel(document);

  return (
    <div className="relative z-10">
      {model.intro ? <ServiceIntroStatement text={model.intro} /> : null}

      <ServiceWhatIsSection title={model.whatIs.title} paragraphs={model.whatIs.paragraphs} />

      <ServiceAudienceBento
        title={model.audience.title}
        intro={model.audience.intro}
        items={model.audience.items}
      />

      <ServiceProblemGrid
        title={model.problems.title}
        intro={model.problems.intro}
        items={model.problems.items}
        closingNote={model.problems.closingNote}
      />

      <ServiceGrowthLoop
        title={model.growthLoop.title}
        intro={model.growthLoop.intro}
        steps={model.growthLoop.steps}
        outro={model.growthLoop.outro}
      />

      <ServiceCapabilitiesBento title={model.services.title} items={model.services.items} />

      <ServiceGrowthTimeline
        title={model.growthStages.title}
        headers={model.growthStages.headers}
        rows={model.growthStages.rows}
      />

      <ServiceMetricsGrid
        title={model.metrics.title}
        intro={model.metrics.intro}
        items={model.metrics.items}
      />

      <ServiceChannelStack
        title={model.channels.title}
        intro={model.channels.intro}
        items={model.channels.items}
      />

      <ServiceRegionalMap
        title={model.regional.title}
        intro={model.regional.intro}
        regions={model.regional.regions}
        outro={model.regional.outro}
      />

      <ServiceAcquisitionFlow
        title={model.acquisition.title}
        intro={model.acquisition.intro}
        stages={model.acquisition.stages}
      />

      <ServiceConversionFlow
        title={model.trafficToVolume.title}
        body={model.trafficToVolume.body}
      />

      <ServiceComparison
        title={model.comparison.title}
        headers={model.comparison.headers}
        rows={model.comparison.rows}
      />

      <ServiceAudienceMarquee
        title={model.whoWorksWith.title}
        body={model.whoWorksWith.body}
        categories={model.audience.items}
      />

      <ServiceBrokersSection title={model.brokers.title} paragraphs={model.brokers.paragraphs} />

      <ServiceEngagementStepper title={model.engagements.title} steps={model.engagements.steps} />

      <ServiceRiskSection title={model.risk.title} body={model.risk.body} />

      <ServiceFaq title={model.faq.title} items={model.faq.items} />

      <ServiceFinalCta
        title={model.finalCta.title}
        body={model.finalCta.body}
        primaryCta={model.finalCta.primaryCta}
        secondaryCta={model.finalCta.secondaryCta}
      />
    </div>
  );
}
