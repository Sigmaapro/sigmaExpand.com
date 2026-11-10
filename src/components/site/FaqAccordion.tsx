"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/global/marketing/faqContent";

const QUESTION_CLASS =
  "font-display text-sm font-semibold leading-snug text-white sm:text-[15px]";

type FaqAccordionProps = {
  items: FaqItem[];
  /** Homepage FAQ asks for an h3 inside the toggle. Other pages keep the span. */
  questionAs?: "span" | "h3";
  /** Keep every answer in the server HTML, including while the item is closed. */
  keepAnswersInDom?: boolean;
  /** `null` starts every item closed. The default still opens the first item. */
  initialOpenIndex?: number | null;
};

export function FaqAccordion({
  items,
  questionAs = "span",
  keepAnswersInDom = false,
  initialOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);
  const QuestionTag = questionAs === "h3" ? "h3" : "span";

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}`;
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
              aria-controls={keepAnswersInDom ? answerId : undefined}
            >
              <QuestionTag className={questionAs === "h3" ? `${QUESTION_CLASS} m-0 text-start` : QUESTION_CLASS}>
                {item.question}
              </QuestionTag>
              <ChevronDown
                className={`mt-0.5 size-5 shrink-0 text-[#8b939e] transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                strokeWidth={2}
                aria-hidden
              />
            </button>
            {open || keepAnswersInDom ? (
              <div
                id={keepAnswersInDom ? answerId : undefined}
                hidden={keepAnswersInDom ? !open : undefined}
                className="border-t border-white/[0.06] px-4 pb-4 pt-2 text-sm leading-relaxed text-[#b6bcc4] sm:px-5 sm:pb-5"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
