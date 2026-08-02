import { BentoCard, BentoGrid } from "@/components/services/landing/primitives/BentoGrid";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";
import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";

const AUDIENCE_SPANS = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-4",
];

type ServiceAudienceBentoProps = {
  title: string;
  intro: string;
  items: LabeledItem[];
};

/** Magic UI Bento Grid — audience / client-type cards. */
export function ServiceAudienceBento({ title, intro, items }: ServiceAudienceBentoProps) {
  return (
    <ServiceSectionShell id="audience" atmosphere="soft">
      <ServiceSectionHeading id="audience" title={title} intro={intro} />
      <BentoGrid>
        {items.map((item, i) => (
          <BentoCard
            key={item.full}
            title={item.title}
            body={item.body}
            index={i}
            className={AUDIENCE_SPANS[i] ?? "lg:col-span-3"}
          />
        ))}
      </BentoGrid>
    </ServiceSectionShell>
  );
}
