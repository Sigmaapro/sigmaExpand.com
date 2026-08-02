import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceConversionFlowProps = {
  title: string;
  body: string;
};

/**
 * Custom process rail — decorative only (no invented stage labels as copy).
 * Exact paragraph remains the sole readable narrative.
 */
export function ServiceConversionFlow({ title, body }: ServiceConversionFlowProps) {
  return (
    <ServiceSectionShell id="traffic-to-volume" atmosphere="violet">
      <ServiceSectionHeading id="traffic-to-volume" title={title} />
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <p className="max-w-[46rem] text-[15px] leading-relaxed text-[#cfd6de] md:text-base">{body}</p>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#05070c]/85 p-6" aria-hidden="true">
          <svg viewBox="0 0 360 120" className="hidden h-auto w-full md:block">
            <defs>
              <linearGradient id="vol-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1D89BB" />
                <stop offset="50%" stopColor="#1D3ABB" />
                <stop offset="100%" stopColor="#4F1DBB" />
              </linearGradient>
            </defs>
            <path
              d="M20 70 C70 70, 90 30, 140 30 S210 90, 260 55 S320 40, 340 40"
              fill="none"
              stroke="url(#vol-line)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {[20, 140, 260, 340].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={i === 0 ? 70 : i === 1 ? 30 : i === 2 ? 55 : 40}
                r="6"
                fill="#0a1020"
                stroke="#1D89BB"
                strokeWidth="2"
              />
            ))}
          </svg>
          <svg viewBox="0 0 80 280" className="mx-auto h-64 w-16 md:hidden">
            <defs>
              <linearGradient id="vol-line-m" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D89BB" />
                <stop offset="50%" stopColor="#1D3ABB" />
                <stop offset="100%" stopColor="#4F1DBB" />
              </linearGradient>
            </defs>
            <path
              d="M40 16 V260"
              fill="none"
              stroke="url(#vol-line-m)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {[40, 100, 170, 240].map((y) => (
              <circle key={y} cx="40" cy={y} r="6" fill="#0a1020" stroke="#1D89BB" strokeWidth="2" />
            ))}
          </svg>
        </div>
      </div>
    </ServiceSectionShell>
  );
}
