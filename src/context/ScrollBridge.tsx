"use client";

import type { ReactNode } from "react";

/** Safe wrapper preserved for imports/layout continuity (scroll hooks intentionally omitted). */
export function ScrollBridgeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
