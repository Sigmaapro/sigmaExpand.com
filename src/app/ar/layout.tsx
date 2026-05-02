import type { ReactNode } from "react";
import { ArabicLocaleSync } from "@/components/i18n/ArabicLocaleSync";

export default function ArabicMarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ArabicLocaleSync />
      {children}
    </>
  );
}
