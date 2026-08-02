import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceWhatIsSectionProps = {
  title: string;
  paragraphs: string[];
};

/** Quiet editorial block for the document's definition section. */
export function ServiceWhatIsSection({ title, paragraphs }: ServiceWhatIsSectionProps) {
  return (
    <ServiceSectionShell id="what-is" atmosphere="soft">
      <ServiceSectionHeading id="what-is" title={title} />
      <div className="mx-auto max-w-[48rem] space-y-5">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="text-[15px] leading-relaxed text-[#cfd6de] md:text-base">
            {p}
          </p>
        ))}
      </div>
    </ServiceSectionShell>
  );
}
