// This file is safe to edit for content updates (no code knowledge needed)

import { siteRestByLang } from "../site";
import { localizeFromLangRecord } from "../_contentLocales";

export const footerContent = localizeFromLangRecord({
  EN: siteRestByLang.EN.footer,
  FA: siteRestByLang.FA.footer,
  TR: siteRestByLang.TR.footer,
  ZH: siteRestByLang.ZH.footer,
  ES: siteRestByLang.ES.footer,
  RU: siteRestByLang.RU.footer,
});
