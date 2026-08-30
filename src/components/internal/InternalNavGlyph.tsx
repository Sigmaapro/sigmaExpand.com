"use client";

import type { InternalNavId } from "@/lib/internal/routes";
import { cn } from "@/lib/utils";

export function InternalNavGlyph({
  id,
  active,
}: {
  id: InternalNavId;
  active: boolean;
}) {
  if (id === "sigma") {
    return (
      // Official SIGMA mark asset used on the public site (services orbit).
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/services/sigma-mark.png"
        alt=""
        aria-hidden="true"
        className={cn(
          "h-6 w-6 object-contain lg:h-7 lg:w-7",
          active ? "opacity-100" : "opacity-75",
        )}
      />
    );
  }

  if (id === "profile") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M5.5 19.25c.9-3.2 3.2-4.75 6.5-4.75s5.6 1.55 6.5 4.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="square"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" focusable="false">
      <path
        d="M4.5 6.5h15v11H4.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      <path
        d="M4.5 6.5 12 12.25 19.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function initialsFromEmail(email: string | null): string {
  if (!email) return "Σ";
  const local = email.split("@")[0] ?? "";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return (local.slice(0, 2) || "Σ").toUpperCase();
}
