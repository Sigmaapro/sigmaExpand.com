import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceBrokersSectionProps = {
  title: string;
  paragraphs: string[];
};

/**
 * Cult UI Texture Card — single textured editorial surface + abstract graphic.
 */
export function ServiceBrokersSection({ title, paragraphs }: ServiceBrokersSectionProps) {
  return (
    <ServiceSectionShell id="brokers" atmosphere="soft">
      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#07090f]/75 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-9">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
              mixBlendMode: "overlay",
            }}
            aria-hidden="true"
          />
          <ServiceSectionHeading id="brokers" title={title} className="relative mb-6 md:mb-8" />
          <div className="relative space-y-5">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-[#cfd6de] md:text-base">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div
          className="relative hidden min-h-[18rem] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#05070c]/90 lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_60%_40%,rgba(29,58,187,0.25),transparent_70%)]" />
          <svg viewBox="0 0 240 280" className="absolute inset-6 h-auto w-[calc(100%-3rem)] text-[#1D89BB]/70">
            <rect x="40" y="40" width="160" height="200" rx="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M70 100 H170 M70 140 H150 M70 180 H160" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            <circle cx="190" cy="60" r="22" fill="rgba(79,29,187,0.25)" stroke="#4F1DBB" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </ServiceSectionShell>
  );
}
