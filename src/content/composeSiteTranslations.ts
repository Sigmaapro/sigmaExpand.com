import type { LangCode, SiteTranslations } from "./types";
import { heroByLang } from "./hero";
import { servicesByLang } from "./services";
import { siteRestByLang } from "./site";

/** Assembles per-locale bundles from modular slices — replace body with CMS merge later */
export function composeSiteTranslations(lang: LangCode): SiteTranslations {
  return {
    ...siteRestByLang[lang],
    hero: heroByLang[lang],
    services: servicesByLang[lang],
  };
}
