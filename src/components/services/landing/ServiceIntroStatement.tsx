import { TextReveal } from "@/components/magicui/TextReveal";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";

type ServiceIntroStatementProps = {
  text: string;
};

/** Magic UI Text Reveal — open editorial intro (exact paragraph). */
export function ServiceIntroStatement({ text }: ServiceIntroStatementProps) {
  return (
    <ServiceSectionShell id="introduction" atmosphere="none" className="!border-t-0" ariaLabel="Introduction">
      <div className="mx-auto max-w-[68.75rem]">
        <TextReveal className="text-center font-display text-[clamp(1.2rem,1rem+0.85vw,1.85rem)] font-medium leading-[1.55] tracking-[-0.01em] text-white text-pretty">
          {text}
        </TextReveal>
      </div>
    </ServiceSectionShell>
  );
}
