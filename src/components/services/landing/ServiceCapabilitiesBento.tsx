import { BentoCard, BentoGrid } from "@/components/services/landing/primitives/BentoGrid";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

const SERVICE_SPANS = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-2",
];

type ServiceCapabilitiesBentoProps = {
  title: string;
  items: Array<{ title: string; body: string }>;
};

/** ReactBits / Magic-style premium bento for service capabilities. */
export function ServiceCapabilitiesBento({ title, items }: ServiceCapabilitiesBentoProps) {
  return (
    <ServiceSectionShell id="services" atmosphere="violet">
      <ServiceSectionHeading id="services" title={title} />
      <BentoGrid>
        {items.map((item, i) => (
          <BentoCard
            key={item.title}
            title={item.title}
            body={item.body}
            index={i}
            className={SERVICE_SPANS[i] ?? "lg:col-span-3"}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#1D89BB]/15"
              aria-hidden="true"
            />
          </BentoCard>
        ))}
      </BentoGrid>
    </ServiceSectionShell>
  );
}
