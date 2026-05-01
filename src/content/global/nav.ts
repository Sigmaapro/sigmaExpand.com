// This file is safe to edit for content updates (no code knowledge needed)

import { siteRestByLang } from "../site";
import { localizeFromLangRecord } from "../_contentLocales";

export const navContent = localizeFromLangRecord({
  EN: siteRestByLang.EN.nav,
  FA: siteRestByLang.FA.nav,
  TR: siteRestByLang.TR.nav,
  ZH: siteRestByLang.ZH.nav,
  ES: siteRestByLang.ES.nav,
  RU: siteRestByLang.RU.nav,
});
