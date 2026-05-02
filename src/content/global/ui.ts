// This file is safe to edit for content updates (no code knowledge needed)

import { siteRestByLang } from "../site";
import { localizeFromLangRecord } from "../_contentLocales";

export const uiContent = localizeFromLangRecord({
  EN: siteRestByLang.EN.ui,
  FA: siteRestByLang.FA.ui,
  TR: siteRestByLang.TR.ui,
  ZH: siteRestByLang.ZH.ui,
  ES: siteRestByLang.ES.ui,
  RU: siteRestByLang.RU.ui,
  AR: siteRestByLang.AR.ui,
});
