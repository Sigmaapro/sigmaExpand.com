"use client";

import { useState } from "react";
import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceEngagementStepperProps = {
  title: string;
  steps: LabeledItem[];
};

/**
 * ReactBits Stepper — clickable emphasis; every step stays in the document (no hidden copy).
 */
export function ServiceEngagementStepper({ title, steps }: ServiceEngagementStepperProps) {
  const [active, setActive] = useState(0);

  return (
    <ServiceSectionShell id="engagements" atmosphere="soft">
      <ServiceSectionHeading id="engagements" title={title} />

      <ol className="mx-auto max-w-3xl space-y-4">
        {steps.map((step, i) => {
          const selected = active === i;
          return (
            <li key={step.full}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={selected}
                className={`w-full rounded-2xl border p-5 text-left transition-[border-color,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:p-6 ${
                  selected
                    ? "border-[#1D89BB]/40 bg-[#0a1020]/90"
                    : "border-white/[0.09] bg-[#07090f]/55 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
                </div>
                {step.body ? (
                  <p
                    className={`mt-3 text-sm leading-relaxed text-[#b6bcc4] transition-opacity duration-300 md:text-[15px] ${
                      selected ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    {step.body}
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
    </ServiceSectionShell>
  );
}
