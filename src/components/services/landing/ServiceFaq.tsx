"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqPair } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceFaqProps = {
  title: string;
  items: FaqPair[];
};

/** Accessible accordion — mirrors ServiceFaqAccordion pattern; one open at a time. */
export function ServiceFaq({ title, items }: ServiceFaqProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ServiceSectionShell id="faq" atmosphere="soft">
      <ServiceSectionHeading id="faq" title={title} align="center" className="mx-auto" />
      <div className="mx-auto max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="px-1 sm:px-2">
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-sm font-semibold text-white transition-colors hover:text-[#bde0fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:text-base"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[#93C5FD] transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-5"
              >
                {isOpen ? (
                  <p className="max-w-none text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </ServiceSectionShell>
  );
}
