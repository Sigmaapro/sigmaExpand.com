import type { ServiceProcessStep } from "@/content/services";

type ServiceProcessTimelineProps = {
  steps: ServiceProcessStep[];
};

export function ServiceProcessTimeline({ steps }: ServiceProcessTimelineProps) {
  const ordered = [...steps].sort((a, b) => a.step - b.step);
  return (
    <ol className="relative space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
      {ordered.map((step) => (
        <li
          key={step.id}
          className="relative rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 sm:p-6"
        >
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb]">
            Step {step.step}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
