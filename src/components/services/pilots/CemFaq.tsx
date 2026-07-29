"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CEM_FAQ } from "@/content/services/pilots/cryptoExchangeMarketing.content";

export function CemFaq() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(CEM_FAQ[0]?.id ?? null);

  return (
    <div className="cem-faq">
      {CEM_FAQ.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="cem-faq__item">
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                className="cem-faq__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`size-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
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
              className="cem-faq__panel"
            >
              {isOpen ? <p>{item.answer}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
