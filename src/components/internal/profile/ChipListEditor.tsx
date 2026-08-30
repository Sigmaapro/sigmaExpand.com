"use client";

import { useId, useState } from "react";
import { GlassChip, GlassField } from "@/components/internal/glass/Glass";

export function ChipListEditor({
  id,
  values,
  onChange,
  placeholder,
}: {
  id: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [entry, setEntry] = useState("");
  const hintId = useId();

  function addValue() {
    const next = entry.trim();
    if (!next) return;
    const exists = values.some((item) => item.toLowerCase() === next.toLowerCase());
    if (!exists) onChange([...values, next]);
    setEntry("");
  }

  return (
    <div className="space-y-3">
      {values.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {values.map((item) => (
            <li key={item}>
              <GlassChip className="min-h-11 gap-1 py-0 pr-0.5">
                {item}
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cadet hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bde0fe]/40"
                  aria-label={`Remove ${item}`}
                  onClick={() => onChange(values.filter((value) => value !== item))}
                >
                  ×
                </button>
              </GlassChip>
            </li>
          ))}
        </ul>
      ) : null}
      <GlassField
        id={id}
        value={entry}
        placeholder={placeholder}
        aria-describedby={hintId}
        onChange={(event) => setEntry(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addValue();
          }
        }}
        onBlur={addValue}
      />
      <p id={hintId} className="text-[12px] text-cadet/70">
        Press Enter to add.
      </p>
    </div>
  );
}
