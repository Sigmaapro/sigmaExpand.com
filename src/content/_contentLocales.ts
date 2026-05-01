// This file is safe to edit for content updates (no code knowledge needed)

import type { LangCode } from "./types";

export type ContentLocale = "en" | "fa" | "tr" | "zh" | "es" | "ru";

export type Localized<T> = Record<ContentLocale, T>;

export const CONTENT_LOCALES: ContentLocale[] = [
  "en",
  "fa",
  "tr",
  "zh",
  "es",
  "ru",
];

const LANG_TO_LOCALE: Record<LangCode, ContentLocale> = {
  EN: "en",
  FA: "fa",
  TR: "tr",
  ZH: "zh",
  ES: "es",
  RU: "ru",
};

const LOCALE_TO_LANG: Record<ContentLocale, LangCode> = {
  en: "EN",
  fa: "FA",
  tr: "TR",
  zh: "ZH",
  es: "ES",
  ru: "RU",
};

export function localizeFromLangRecord<T>(byLang: Record<LangCode, T>): Localized<T> {
  return {
    en: byLang.EN,
    fa: byLang.FA,
    tr: byLang.TR,
    zh: byLang.ZH,
    es: byLang.ES,
    ru: byLang.RU,
  };
}

export function langRecordFromLocalized<T>(localized: Localized<T>): Record<LangCode, T> {
  return {
    EN: localized.en,
    FA: localized.fa,
    TR: localized.tr,
    ZH: localized.zh,
    ES: localized.es,
    RU: localized.ru,
  };
}

export function getLocalized<T>(localized: Localized<T>, lang: LangCode): T {
  const locale = LANG_TO_LOCALE[lang];
  return localized[locale] ?? localized.en;
}

export function toLangCode(locale: ContentLocale): LangCode {
  return LOCALE_TO_LANG[locale];
}
