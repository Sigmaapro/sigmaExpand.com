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
      {content.audience ? <ServiceV2Audience content={content.audience} /> : null}
      {content.method ? <ServiceV2Method content={content.method} /> : null}
      {content.definition ? <ServiceV2Definition content={content.definition} /> : null}
      {content.artefacts ? <ServiceV2Artefacts content={content.artefacts} /> : null}
      {content.systemVisual ? (
        <ServiceV2VisualInterlude id="system-visual" visual={content.systemVisual} />
      ) : null}
      {content.problem ? <ServiceV2Problem content={content.problem} /> : null}
      {content.habits ? <ServiceV2Habits content={content.habits} /> : null}
      {content.modules ? <ServiceV2Modules content={content.modules} /> : null}
      {content.process ? <ServiceV2Process content={content.process} /> : null}
      {content.engagement ? <ServiceV2Engagement content={content.engagement} /> : null}
      {content.decision ? <ServiceV2Decision content={content.decision} /> : null}
      {content.objections ? <ServiceV2Objections content={content.objections} /> : null}
      {content.faq ? <ServiceV2Faq content={content.faq} /> : null}
      {content.risk ? <ServiceV2Risk content={content.risk} /> : null}
      {content.differentiation ? (
        <ServiceV2Differentiation content={content.differentiation} />
      ) : null}
      {content.afterMessage ? <ServiceV2AfterMessage content={content.afterMessage} /> : null}
      {content.finalCta ? <ServiceV2FinalCta content={content.finalCta} /> : null}
      {content.relatedServices ? <ServiceV2Related content={content.relatedServices} /> : null}
    </article>
  );
}
