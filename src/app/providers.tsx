"use client";

import type { ReactNode } from "react";
import type { LangCode } from "@/content/types";
import { ScrollBridgeProvider } from "@/context/ScrollBridge";
import { LanguageProvider } from "@/context/LanguageContext";
import { CustomCursor } from "@/components/sigma/CustomCursor";

export function Providers({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: LangCode;
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <ScrollBridgeProvider>
        {children}
        <CustomCursor />
      </ScrollBridgeProvider>
    </LanguageProvider>
  );
}
