import {
  getRelatedServices,
  type ServiceDefinition,
} from "@/content/services";
import { ServiceAudienceGrid } from "./ServiceAudienceGrid";
import { ServiceBreadcrumbs } from "./ServiceBreadcrumbs";
import { ServiceComparisonTable } from "./ServiceComparisonTable";
import { ServiceDataTable } from "./ServiceDataTable";
import { ServiceEngagementSteps } from "./ServiceEngagementSteps";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServiceFinalCta } from "./ServiceFinalCta";
import { ServiceHero } from "./ServiceHero";
import { ServiceMetricsGrid } from "./ServiceMetricsGrid";
import { ServiceModuleGrid } from "./ServiceModuleGrid";
import { ServiceProblemGrid } from "./ServiceProblemGrid";
import { ServiceProcessTimeline } from "./ServiceProcessTimeline";
import { ServiceRelatedGrid } from "./ServiceRelatedGrid";
import { ServiceRiskDisclosure } from "./ServiceRiskDisclosure";
import { ServiceSection } from "./ServiceSection";

type ServicePageTemplateProps = {
  service: ServiceDefinition;
  showBreadcrumbs?: boolean;
};

/**
 * Data-driven service page renderer.
 * Sections render only when their content arrays/strings are present.
 */
export function ServicePageTemplate({
  service,
  showBreadcrumbs = true,
}: ServicePageTemplateProps) {
  const related = getRelatedServices(service.slug);

  return (
    <article className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      {showBreadcrumbs ? (
        <div className="mb-8 md:mb-10">
          <ServiceBreadcrumbs currentLabel={service.shortLabel} />
        </div>
      ) : null}

      <ServiceHero service={service} />

      {service.intro ? (
        <ServiceSection
          id={`${service.slug}-intro`}
          eyebrow="Overview"
          title="How this service works"
          description={service.intro}
        />
      ) : null}

      {service.audiences.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-audiences`}
          eyebrow="Who it is for"
          title="Built for operators who need infrastructure"
        >
          <ServiceAudienceGrid items={service.audiences} />
        </ServiceSection>
      ) : null}

      {service.problems.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-problems`}
          eyebrow="Problems we address"
          title="What usually breaks growth"
        >
          <ServiceProblemGrid items={service.problems} />
        </ServiceSection>
      ) : null}

      {service.process.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-process`}
          eyebrow="Process"
          title="A controlled operating cadence"
        >
          <ServiceProcessTimeline steps={service.process} />
        </ServiceSection>
      ) : null}

      {service.modules.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-modules`}
          eyebrow="Modules"
          title="What the system includes"
        >
          <ServiceModuleGrid items={service.modules} />
        </ServiceSection>
      ) : null}

      {service.metrics.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-metrics`}
          eyebrow="Signals"
          title="What we instrument"
        >
          <ServiceMetricsGrid items={service.metrics} />
        </ServiceSection>
      ) : null}

      {service.tables.map((table) => (
        <ServiceSection
          key={table.id}
          id={`${service.slug}-table-${table.id}`}
          eyebrow="Reference"
          title={table.title}
          description={table.description}
        >
          <ServiceDataTable table={table} />
        </ServiceSection>
      ))}

      {service.comparisons.map((comparison) => (
        <ServiceSection
          key={comparison.id}
          id={`${service.slug}-compare-${comparison.id}`}
          eyebrow="Compare"
          title={comparison.title}
          description={comparison.description}
        >
          <ServiceComparisonTable table={comparison} />
        </ServiceSection>
      ))}

      {service.regionalSections.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-regional`}
          eyebrow="Regions"
          title="Regional sequencing"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {service.regionalSections.map((region) => (
              <div
                key={region.id}
                className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 sm:p-6"
              >
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb]">
                  {region.regionLabel}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {region.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4]">
                  {region.description}
                </p>
                {region.bullets && region.bullets.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-relaxed text-[#b6bcc4]">
                    {region.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </ServiceSection>
      ) : null}

      {service.engagement.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-engagement`}
          eyebrow="Engagement"
          title="How we start"
        >
          <ServiceEngagementSteps steps={service.engagement} />
        </ServiceSection>
      ) : null}

      {service.riskDisclosure ? (
        <ServiceSection id={`${service.slug}-risk`} eyebrow="Disclosure" title="Important notice">
          <ServiceRiskDisclosure text={service.riskDisclosure} />
        </ServiceSection>
      ) : null}

      {service.faq.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-faq`}
          eyebrow="FAQ"
          title="Common questions"
        >
          <ServiceFaqAccordion items={service.faq} />
        </ServiceSection>
      ) : null}

      {related.length > 0 ? (
        <ServiceSection
          id={`${service.slug}-related`}
          eyebrow="Related"
          title="Continue exploring"
        >
          <ServiceRelatedGrid services={related} />
        </ServiceSection>
      ) : null}

      <div className="mt-14 md:mt-16">
        <ServiceFinalCta cta={service.cta} />
      </div>
    </article>
  );
}
