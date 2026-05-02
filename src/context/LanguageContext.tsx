"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LangCode, SiteTranslations } from "@/content/types";
import { siteTranslations } from "@/content/siteTranslations";

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

const HTML_LANG_BY_CODE: Record<LangCode, string> = {
  EN: "en",
  TR: "tr",
  ZH: "zh-CN",
  FA: "fa",
  ES: "es",
  RU: "ru",
  AR: "ar",
};

function isLangCode(value: string): value is LangCode {
  return (LANG_CODES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("EN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isLangCode(saved)) setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

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
    isRtl: lang === "FA" || lang === "AR",
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
