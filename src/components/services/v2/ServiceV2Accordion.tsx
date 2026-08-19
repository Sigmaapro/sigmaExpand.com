import type { ServiceV2FaqItem } from "@/content/services/v2/types";
import { v2Type } from "./ServiceV2Primitives";

type ServiceV2AccordionProps = {
  items: ServiceV2FaqItem[];
};

export function ServiceV2Accordion({ items }: ServiceV2AccordionProps) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/15 border-y border-white/15">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-[0.95rem] font-semibold text-white marker:content-none hover:text-[#dcecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/70 sm:text-base [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              className="shrink-0 font-mono text-[13px] text-[rgba(168,196,255,0.95)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className={`max-w-none pb-5 ${v2Type.body}`}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
