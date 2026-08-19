import type { ServiceV2Content } from "@/content/services/v2/types";
import { ServiceV2Hero } from "./ServiceV2Hero";
import { ServiceV2VisualInterlude } from "./ServiceV2Visual";
import { ServiceV2Related } from "./ServiceV2Related";
import {
  ServiceV2AfterMessage,
  ServiceV2Artefacts,
  ServiceV2Audience,
  ServiceV2Decision,
  ServiceV2Definition,
  ServiceV2Differentiation,
  ServiceV2Engagement,
  ServiceV2Faq,
  ServiceV2FinalCta,
  ServiceV2Habits,
  ServiceV2Method,
  ServiceV2Modules,
  ServiceV2Objections,
  ServiceV2Problem,
  ServiceV2Process,
  ServiceV2Risk,
} from "./ServiceV2Sections";

export function ServiceV2Page({ content }: { content: ServiceV2Content }) {
  return (
    <article className="relative isolate min-h-0 flex-1 overflow-x-clip text-[rgba(228,235,245,0.9)]">
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[linear-gradient(90deg,rgba(5,7,14,0.88)_0%,rgba(5,7,14,0.55)_44%,rgba(5,7,14,0.18)_72%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgba(5,7,14,0.9)_0%,rgba(5,7,14,0.72)_100%)]"
        aria-hidden="true"
      />
      <ServiceV2Hero content={content.hero} />
      <ServiceV2Audience content={content.audience} />
      <ServiceV2Method content={content.method} />
      <ServiceV2Definition content={content.definition} />
      <ServiceV2Artefacts content={content.artefacts} />
      <ServiceV2VisualInterlude id="system-visual" visual={content.systemVisual} />
      <ServiceV2Problem content={content.problem} />
      <ServiceV2Habits content={content.habits} />
      <ServiceV2Modules content={content.modules} />
      <ServiceV2Process content={content.process} />
      <ServiceV2Engagement content={content.engagement} />
      <ServiceV2Decision content={content.decision} />
      <ServiceV2Objections content={content.objections} />
      <ServiceV2Faq content={content.faq} />
      <ServiceV2Risk content={content.risk} />
      <ServiceV2Differentiation content={content.differentiation} />
      <ServiceV2AfterMessage content={content.afterMessage} />
      <ServiceV2FinalCta content={content.finalCta} />
      <ServiceV2Related content={content.relatedServices} />
    </article>
  );
}
