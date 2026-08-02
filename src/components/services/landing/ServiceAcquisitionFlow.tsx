import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type Stage = { title: string; body: string };

type ServiceAcquisitionFlowProps = {
  title: string;
  intro: string;
  stages: Stage[];
};

/** Two-column editorial acquisition path with abstract flow visual. */
export function ServiceAcquisitionFlow({ title, intro, stages }: ServiceAcquisitionFlowProps) {
  return (
    <ServiceSectionShell id="acquisition" atmosphere="soft">
      <ServiceSectionHeading id="acquisition" title={title} intro={intro} />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="relative hidden overflow-hidden rounded-2xl border border-white/[0.09] bg-[#05070c]/85 p-8 lg:block">
          <svg viewBox="0 0 280 320" className="h-auto w-full text-[#1D89BB]" aria-hidden="true">
            <defs>
              <linearGradient id="acq-beam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D89BB" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#1D3ABB" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#4F1DBB" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx="40" cy={60 + i * 90} r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55" />
                <path
                  d={`M50 ${60 + i * 90} H140`}
                  stroke="url(#acq-beam)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                />
              </g>
            ))}
            <rect
              x="140"
              y="40"
              width="100"
              height="240"
              rx="16"
              fill="rgba(29,58,187,0.12)"
              stroke="rgba(189,224,254,0.25)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <ol className="m-0 list-none space-y-5 p-0">
          {stages.map((stage, i) => (
            <li
              key={stage.title}
              className="rounded-2xl border border-white/[0.09] bg-[#07090f]/65 p-5 sm:p-6"
            >
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </ServiceSectionShell>
  );
}
