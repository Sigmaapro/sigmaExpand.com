// This file is safe to edit for content updates (no code knowledge needed)

import { heroByLang } from "../hero";
import { heroCarouselByLang } from "../heroCarousel";
import { servicesByLang } from "../services";
import { siteRestByLang } from "../site";
import { localizeFromLangRecord } from "../_contentLocales";

export const homePageContent = localizeFromLangRecord({
  EN: {
    ...siteRestByLang.EN,
    hero: heroByLang.EN,
    services: servicesByLang.EN,
    heroCarousel: heroCarouselByLang.EN,
  },
  FA: {
    ...siteRestByLang.FA,
    hero: heroByLang.FA,
    services: servicesByLang.FA,
    heroCarousel: heroCarouselByLang.FA,
  },
  TR: {
    ...siteRestByLang.TR,
    hero: heroByLang.TR,
    services: servicesByLang.TR,
    heroCarousel: heroCarouselByLang.TR,
  },
  ZH: {
    ...siteRestByLang.ZH,
    hero: heroByLang.ZH,
    services: servicesByLang.ZH,
    heroCarousel: heroCarouselByLang.ZH,
  },
  ES: {
    ...siteRestByLang.ES,
    hero: heroByLang.ES,
    services: servicesByLang.ES,
    heroCarousel: heroCarouselByLang.ES,
  },
  RU: {
    ...siteRestByLang.RU,
    hero: heroByLang.RU,
    services: servicesByLang.RU,
    heroCarousel: heroCarouselByLang.RU,
  },
  AR: {
    ...siteRestByLang.AR,
    hero: heroByLang.AR,
    services: servicesByLang.AR,
    heroCarousel: heroCarouselByLang.AR,
  },
});
