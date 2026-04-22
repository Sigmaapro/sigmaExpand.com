"use client";

import type { ReactNode } from "react";
import { ScrollBridgeProvider } from "@/context/ScrollBridge";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/sigma/CustomCursor";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ScrollBridgeProvider>
        {children}
        <CustomCursor />
      </ScrollBridgeProvider>
    </LanguageProvider>
  );
}
