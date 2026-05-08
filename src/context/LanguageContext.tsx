"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { LangCode, SiteTranslations } from "@/content/types";
import { siteTranslations } from "@/content/siteTranslations";
import { HTML_LANG_BY_CODE, isRtlLang, langFromUnknown } from "@/lib/i18n";

type LanguageContextValue = {
  /** Preferred alias for clarity in consumers */
  language: LangCode;
  setLanguage: (l: LangCode) => void;
  /** Backward-compatible fields */
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: SiteTranslations;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sigma-lang";

const LANG_CODES: LangCode[] = ["EN", "TR", "ZH", "FA", "ES", "RU", "AR"];

function isLangCode(value: string): value is LangCode {
  return (LANG_CODES as readonly string[]).includes(value);
}

export function LanguageProvider({
  children,
  initialLang = "EN",
}: {
  children: ReactNode;
  initialLang?: LangCode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lang, setLangState] = useState<LangCode>(initialLang);

  useEffect(() => {
    try {
      const fromQuery = langFromUnknown(searchParams.get("lang"));
      if (fromQuery) {
        setLangState(fromQuery);
        localStorage.setItem(STORAGE_KEY, fromQuery);
        return;
      }
      if (pathname?.startsWith("/ar")) {
        setLangState("AR");
        localStorage.setItem(STORAGE_KEY, "AR");
        return;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLangCode(saved)) setLangState(saved);
    } catch {
      /* ignore */
    }
  }, [pathname, searchParams]);

  const setLang = (l: LangCode) => {
    setLangState((prev) => (prev === l ? prev : l));
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const value: LanguageContextValue = {
    language: lang,
    setLanguage: setLang,
    lang,
    setLang,
    t: siteTranslations[lang],
    isRtl: isRtlLang(lang),
  };

  useEffect(() => {
    document.documentElement.dir = value.isRtl ? "rtl" : "ltr";
    document.documentElement.lang = HTML_LANG_BY_CODE[lang];
  }, [value.isRtl, lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
