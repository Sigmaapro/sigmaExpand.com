import type { LangCode, SiteTranslations } from "./types";
import { homePageContent } from "./pages/home";
import { getLocalized } from "./_contentLocales";
import { languageSwitcherCompactLabels } from "./global/languageSwitcherCompactLabels";
import { mobileNavSheetContent } from "./global/mobileNavSheetContent";

/** Assembles per-locale bundles from modular slices — replace body with CMS merge later */
export function composeSiteTranslations(lang: LangCode): SiteTranslations {
  const base = getLocalized(homePageContent, lang);
  return {
    ...base,
    ui: {
      ...base.ui,
      mobileNavSheet: getLocalized(mobileNavSheetContent, lang),
      languageSwitcherCompact: getLocalized(languageSwitcherCompactLabels, lang),
    },
  };
}
