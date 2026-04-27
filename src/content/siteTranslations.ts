import type { LangCode, SiteTranslations } from "./types";
import { en } from "./locales/en";
import { tr } from "./locales/tr";
import { zh } from "./locales/zh";
import { fa } from "./locales/fa";
import { es } from "./locales/es";
import { ru } from "./locales/ru";

function mergeWithFallback<T>(fallback: T, value: unknown): T {
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(fallback)) {
    return (Array.isArray(value) ? value : fallback) as T;
  }
  if (typeof fallback !== "object") {
    return (value as T) ?? fallback;
  }
  const out: Record<string, unknown> = {};
  const fbObj = fallback as Record<string, unknown>;
  const valObj =
    typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  for (const key of Object.keys(fbObj)) {
    out[key] = mergeWithFallback(fbObj[key], valObj[key]);
  }
  return out as T;
}

const rawSiteTranslations: Record<LangCode, SiteTranslations> = {
  EN: en,
  TR: tr,
  ZH: zh,
  FA: fa,
  ES: es,
  RU: ru,
};

/** Localized bundle with automatic EN fallback for missing keys */
export const siteTranslations: Record<LangCode, SiteTranslations> = {
  EN: rawSiteTranslations.EN,
  TR: mergeWithFallback(rawSiteTranslations.EN, rawSiteTranslations.TR),
  ZH: mergeWithFallback(rawSiteTranslations.EN, rawSiteTranslations.ZH),
  FA: mergeWithFallback(rawSiteTranslations.EN, rawSiteTranslations.FA),
  ES: mergeWithFallback(rawSiteTranslations.EN, rawSiteTranslations.ES),
  RU: mergeWithFallback(rawSiteTranslations.EN, rawSiteTranslations.RU),
};
