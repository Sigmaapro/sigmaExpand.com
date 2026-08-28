"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { langFromUnknown, resolvePublicUiLang } from "@/lib/i18n";

/** Forces locale for `/ar/*` routes (SEO + RTL) without URL rewrites. */
export function ArabicLocaleSync() {
  const searchParams = useSearchParams();
  const { setLang } = useLanguage();
  useEffect(() => {
    const explicit = langFromUnknown(searchParams.get("lang"));
    const requested = explicit ?? "AR";
    const next = resolvePublicUiLang(requested);
    setLang(next);
    document.cookie = `sigma-lang=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [searchParams, setLang]);
  return null;
}
