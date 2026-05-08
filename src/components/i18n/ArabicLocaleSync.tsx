"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { langFromUnknown } from "@/lib/i18n";

/** Forces `AR` in LanguageContext for `/ar/*` routes (SEO + RTL) without URL rewrites. */
export function ArabicLocaleSync() {
  const searchParams = useSearchParams();
  const { setLang } = useLanguage();
  useEffect(() => {
    const explicit = langFromUnknown(searchParams.get("lang"));
    if (explicit && explicit !== "AR") return;
    setLang("AR");
    document.cookie = "sigma-lang=AR; Path=/; Max-Age=31536000; SameSite=Lax";
  }, [searchParams, setLang]);
  return null;
}
