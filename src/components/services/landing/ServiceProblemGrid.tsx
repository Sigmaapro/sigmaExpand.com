import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";
import { CardSpotlight } from "@/components/services/landing/primitives/CardSpotlight";

type ServiceProblemGridProps = {
  title: string;
  intro: string;
  items: Array<{ title: string; body: string }>;
  closingNote: string | null;
};

/** Aceternity Card Spotlight grid for underperformance analysis. */
export function ServiceProblemGrid({ title, intro, items, closingNote }: ServiceProblemGridProps) {
  return (
    <ServiceSectionShell id="underperforms" atmosphere="soft">
      <ServiceSectionHeading id="underperforms" title={title} intro={intro} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {items.map((item, i) => (
          <CardSpotlight key={item.title}>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-white md:text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{item.body}</p>
          </CardSpotlight>
        ))}
      </div>
      {closingNote ? (
        <p className="mt-10 max-w-[48rem] border-t border-white/[0.08] pt-8 text-sm leading-relaxed text-[#9aa3ad] md:text-[15px]">
          {closingNote}
        </p>
      ) : null}
    </ServiceSectionShell>
  );
}
