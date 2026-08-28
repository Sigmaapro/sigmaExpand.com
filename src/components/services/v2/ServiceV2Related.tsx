import Link from "next/link";
import { getFinalServiceBySlug } from "@/content/services/finalServices";
import type { ServiceV2Content } from "@/content/services/v2/types";
import {
  ServiceV2Eyebrow,
  ServiceV2Heading,
  ServiceV2LinkCta,
  ServiceV2Section,
} from "./ServiceV2Primitives";

export function ServiceV2Related({ content }: { content: NonNullable<ServiceV2Content["relatedServices"]> }) {
  const related = content.slugs
    .map((slug) => getFinalServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <ServiceV2Section id="related">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="related" title={content.title} intro={content.lead} className="mt-3" />
      <ul className="divide-y divide-white/15 border-y border-white/15">
        {related.map((service) => (
          <li key={service.slug}>
            <Link
              href={service.href}
              className="flex items-baseline justify-between gap-6 py-5 text-white transition-colors hover:text-[#dcecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/70"
            >
              <span className="font-display text-base font-semibold tracking-tight md:text-lg">
                {service.title}
              </span>
              <span aria-hidden="true" className="shrink-0 text-[rgba(168,196,255,0.95)]">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ServiceV2LinkCta href={content.allServicesHref} label={content.allServicesLabel} variant="ghost" />
      </div>
    </ServiceV2Section>
  );
}
