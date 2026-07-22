import type { ServiceEngagementStep } from "@/content/services";

type ServiceEngagementStepsProps = {
  steps: ServiceEngagementStep[];
};

export function ServiceEngagementSteps({ steps }: ServiceEngagementStepsProps) {
  const ordered = [...steps].sort((a, b) => a.step - b.step);
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {ordered.map((step) => (
        <li
          key={step.id}
          className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 sm:p-6"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#1c39bb]/40 bg-[#1c39bb]/15 font-display text-xs font-semibold text-[#bde0fe]">
            {step.step}
          </span>
          <h3 className="mt-4 font-display text-base font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
