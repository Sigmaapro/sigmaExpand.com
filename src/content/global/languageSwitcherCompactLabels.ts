// Closed language switcher chip — short locale-aware names for each LangCode.

import type { Localized } from "../_contentLocales";
import type { LangCode } from "../types";

/** For UI locale X, how to label each available language on the closed switcher button. */
export type LanguageSwitcherCompactMap = Record<LangCode, string>;

export const languageSwitcherCompactLabels: Localized<LanguageSwitcherCompactMap> = {
  en: {
    EN: "EN",
    FA: "فارسی",
    TR: "TR",
    ZH: "中文",
    ES: "ES",
    RU: "RU",
    AR: "العربية",
  },
  fa: {
    EN: "انگلیسی",
    FA: "فارسی",
    TR: "ترکی",
    ZH: "چینی",
    ES: "اسپانیایی",
    RU: "روسی",
    AR: "عربی",
  },
  tr: {
    EN: "EN",
    FA: "Farsça",
    TR: "TR",
    ZH: "Çince",
    ES: "İspanyolca",
    RU: "Rusça",
    AR: "Arapça",
  },
  zh: {
    EN: "英语",
    FA: "波斯语",
    TR: "土耳其语",
    ZH: "中文",
    ES: "西班牙语",
    RU: "俄语",
    AR: "阿拉伯语",
  },
  es: {
    EN: "EN",
    FA: "Persa",
    TR: "TR",
    ZH: "中文",
    ES: "ES",
    RU: "RU",
    AR: "Árabe",
  },
  ru: {
    EN: "EN",
    FA: "فارси",
    TR: "TR",
    ZH: "中文",
    ES: "ES",
    RU: "RU",
    AR: "العربية",
  },
  ar: {
    EN: "الإنجليزية",
    FA: "الفارسية",
    TR: "التركية",
    ZH: "中文",
    ES: "الإسبانية",
    RU: "الروسية",
    AR: "العربية",
  },
};
