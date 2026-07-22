"use client";

import { useId, useState } from "react";
import type { ServiceFaqItem } from "@/content/services";
import { ChevronDown } from "lucide-react";

type ServiceFaqAccordionProps = {
  items: ServiceFaqItem[];
};

export function ServiceFaqAccordion({ items }: ServiceFaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-[#07090f]/55">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="px-4 sm:px-5">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-sm font-semibold text-white transition-colors hover:text-[#bde0fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:text-base"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
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
              className="pb-4"
            >
              {isOpen ? (
                <p className="text-sm leading-relaxed text-[#b6bcc4]">{item.answer}</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
