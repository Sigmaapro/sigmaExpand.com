import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { Skiper28TextScroll } from "@/components/services/landing/Skiper28TextScroll";

type ServiceWhatIsSectionProps = {
  title: string;
  paragraphs: string[];
};

/** Quiet editorial block for the document's definition section. */
export function ServiceWhatIsSection({ title, paragraphs }: ServiceWhatIsSectionProps) {
  return (
    <ServiceSectionShell id="what-is" atmosphere="soft">
      <Skiper28TextScroll id="what-is" title={title} paragraphs={paragraphs} />
    </ServiceSectionShell>
  );
}
