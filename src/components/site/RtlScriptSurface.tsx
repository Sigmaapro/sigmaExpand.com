"use client";

import { useLanguage } from "@/context/LanguageContext";
import { rtlScriptSurfaceClass } from "@/lib/localeTypography";

/** Wraps localized page content so FA/AR shells get .sigma-rtl-script typography rules. */
export function RtlScriptSurface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { language } = useLanguage();
  return (
    <div className={`${rtlScriptSurfaceClass(language)} ${className}`.trim()}>
      {children}
    </div>
  );
}
