import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceRiskSectionProps = {
  title: string;
  body: string;
};

/** Quiet compliance section — no spectacle. */
export function ServiceRiskSection({ title, body }: ServiceRiskSectionProps) {
  return (
    <ServiceSectionShell id="risk" atmosphere="none">
      <div className="mx-auto max-w-[44rem]">
        <ServiceSectionHeading id="risk" title={title} className="mb-6 md:mb-8" />
        <div className="border-y border-white/[0.1] py-8">
          <div
            className="pointer-events-none absolute inset-x-0 opacity-[0.12]"
            aria-hidden="true"
          />
          <p className="text-[15px] leading-relaxed text-[#cfd6de] md:text-base">{body}</p>
        </div>
      </div>
    </ServiceSectionShell>
  );
}
