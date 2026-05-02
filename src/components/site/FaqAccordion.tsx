"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/pages/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#07090f]/70 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-start transition-colors hover:bg-white/[0.03] sm:px-5 sm:py-4"
              aria-expanded={open}
            >
              <span className="font-display text-sm font-semibold leading-snug text-white sm:text-[15px]">
                {item.question}
              </span>
              <ChevronDown
                className={`mt-0.5 size-5 shrink-0 text-[#8b939e] transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                strokeWidth={2}
                aria-hidden
              />
            </button>
            {open ? (
              <div className="border-t border-white/[0.06] px-4 pb-4 pt-2 text-sm leading-relaxed text-[#b6bcc4] sm:px-5 sm:pb-5">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
