"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LangCode, SiteTranslations } from "@/content/types";
import { siteTranslations } from "@/content/siteTranslations";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: SiteTranslations;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sigma-lang";

const LANG_CODES: LangCode[] = ["EN", "TR", "ZH", "FA"];

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

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo((): LanguageContextValue => {
    return {
      lang,
      setLang,
      t: siteTranslations[lang],
      isRtl: lang === "FA",
    };
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.dir = value.isRtl ? "rtl" : "ltr";
    document.documentElement.lang =
      lang === "ZH" ? "zh-CN" : lang.toLowerCase();
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
