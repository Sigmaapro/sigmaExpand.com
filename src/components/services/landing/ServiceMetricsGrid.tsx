import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceMetricsGridProps = {
  title: string;
  intro: string;
  items: LabeledItem[];
};

/**
 * Editorial metric grid — typographic cards only.
 * No NumberTicker: imported document has no literal numeric KPI values.
 */
export function ServiceMetricsGrid({ title, intro, items }: ServiceMetricsGridProps) {
  return (
    <ServiceSectionShell id="metrics" atmosphere="soft">
      <ServiceSectionHeading id="metrics" title={title} intro={intro} />
      <ul className="m-0 grid list-none grid-cols-1 divide-y divide-white/[0.08] border border-white/[0.09] p-0 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {items.map((item) => (
          <li
            key={item.full}
            className="relative bg-[#07090f]/40 p-6 sm:p-7 md:border-b md:border-white/[0.08] lg:border-b-0"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(29,137,187,0.1),transparent_70%)] opacity-70"
              aria-hidden="true"
            />
            <h3 className="relative font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.85rem)] font-semibold tracking-tight text-white">
              {item.title}
            </h3>
            {item.body ? (
              <p className="relative mt-3 text-sm leading-relaxed text-[#b6bcc4]">{item.body}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </ServiceSectionShell>
  );
}
