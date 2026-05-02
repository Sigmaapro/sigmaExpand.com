"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

/** Forces `AR` in LanguageContext for `/ar/*` routes (SEO + RTL) without URL rewrites. */
export function ArabicLocaleSync() {
  const { setLang } = useLanguage();
  useEffect(() => {
    setLang("AR");
  }, [setLang]);
  return null;
}
