import type { LangCode, SiteTranslations } from "./types";
import { en } from "./locales/en";
import { tr } from "./locales/tr";
import { zh } from "./locales/zh";
import { fa } from "./locales/fa";

/** Single import for pages — swap for CMS `fetch` later */
export const siteTranslations: Record<LangCode, SiteTranslations> = {
  EN: en,
  TR: tr,
  ZH: zh,
  FA: fa,
};
