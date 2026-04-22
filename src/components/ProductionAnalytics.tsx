"use client";

import { Analytics } from "@vercel/analytics/react";

/** Loads Vercel Web Analytics only in production (no dev noise, no render blocking). */
export function ProductionAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return <Analytics />;
}
