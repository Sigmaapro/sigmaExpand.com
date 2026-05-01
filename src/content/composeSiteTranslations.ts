import type { LangCode, SiteTranslations } from "./types";
import { homePageContent } from "./pages/home";
import { getLocalized } from "./_contentLocales";

/** Assembles per-locale bundles from modular slices — replace body with CMS merge later */
export function composeSiteTranslations(lang: LangCode): SiteTranslations {
  return getLocalized(homePageContent, lang);
}
