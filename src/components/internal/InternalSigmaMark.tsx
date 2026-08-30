"use client";

import { cn } from "@/lib/utils";

type Props = {
  active?: boolean;
  className?: string;
};

/** Canonical Σ geometry from `SIGMA_STROKES` — used as the internal home mark. */
export function InternalSigmaMark({ active = false, className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M100 36 L54 164"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 10 : 8}
        strokeLinecap="square"
      />
      <path
        d="M100 36 L146 164"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 10 : 8}
        strokeLinecap="square"
      />
      <path
        d="M62 108 L138 108"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 10 : 8}
        strokeLinecap="square"
      />
    </svg>
  );
}
