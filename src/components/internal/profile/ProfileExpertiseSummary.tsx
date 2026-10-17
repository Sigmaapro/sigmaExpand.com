"use client";

import { useState } from "react";
import { GlassChip } from "@/components/internal/glass/Glass";

const PREVIEW_COUNT = 5;

export function ProfileExpertiseSummary({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const overflow = items.length > PREVIEW_COUNT;
  const visible = expanded || !overflow ? items : items.slice(0, PREVIEW_COUNT);
  const extra = items.length - PREVIEW_COUNT;

  return (
    <section className="internal-profile-section">
      <h2 className="internal-profile-section-title font-display">Expertise</h2>
      <ul className="internal-profile-chip-row">
        {visible.map((item) => (
          <li key={item}>
            <GlassChip>{item}</GlassChip>
          </li>
        ))}
      </ul>
      {overflow ? (
        <button
          type="button"
          className="internal-profile-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : `+${extra} more`}
        </button>
      ) : null}
    </section>
  );
}
