// This file is safe to edit for content updates (no code knowledge needed)

import { heroByLang } from "../hero";
import { servicesByLang } from "../services";
import { siteRestByLang } from "../site";
import { localizeFromLangRecord } from "../_contentLocales";

export const homePageContent = localizeFromLangRecord({
  EN: {
    ...siteRestByLang.EN,
    hero: heroByLang.EN,
    services: servicesByLang.EN,
  },
  FA: {
    ...siteRestByLang.FA,
    hero: heroByLang.FA,
    services: servicesByLang.FA,
  },
  TR: {
    ...siteRestByLang.TR,
    hero: heroByLang.TR,
    services: servicesByLang.TR,
  },
  ZH: {
    ...siteRestByLang.ZH,
    hero: heroByLang.ZH,
    services: servicesByLang.ZH,
  },
  ES: {
    ...siteRestByLang.ES,
    hero: heroByLang.ES,
    services: servicesByLang.ES,
  },
  RU: {
    ...siteRestByLang.RU,
    hero: heroByLang.RU,
    services: servicesByLang.RU,
  },
});
