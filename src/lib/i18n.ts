import type { Metadata } from "next";
import type { LangCode } from "@/content/types";

export const SUPPORTED_LANGS: readonly LangCode[] = ["EN", "FA", "AR", "TR", "RU", "ZH", "ES"] as const;

export const HTML_LANG_BY_CODE: Record<LangCode, string> = {
  EN: "en",
  FA: "fa",
  AR: "ar",
  TR: "tr",
  RU: "ru",
  ZH: "zh-CN",
  ES: "es",
};

const LANG_CODE_BY_HTML: Record<string, LangCode> = {
  en: "EN",
  fa: "FA",
  ar: "AR",
  tr: "TR",
  ru: "RU",
  zh: "ZH",
  "zh-cn": "ZH",
  es: "ES",
};

export function isRtlLang(lang: LangCode): boolean {
  return lang === "FA" || lang === "AR";
}

export function langFromUnknown(value: string | null | undefined): LangCode | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return (SUPPORTED_LANGS as readonly string[]).includes(normalized) ? (normalized as LangCode) : null;
}

export function langFromHtmlLang(value: string | null | undefined): LangCode | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return LANG_CODE_BY_HTML[normalized] ?? null;
}

type RouteLocalization = {
  defaultPath: string;
  arabicPath?: string;
};

const LOCALIZED_ROUTE_MAP: Record<string, RouteLocalization> = {
  "/": { defaultPath: "/", arabicPath: "/ar" },
  "/services": { defaultPath: "/services", arabicPath: "/ar/services" },
  "/insights": { defaultPath: "/insights", arabicPath: "/ar/insights" },
};

export function routePathForLang(pathname: string, lang: LangCode): string {
  const normalized = pathname === "/ar" ? "/" : pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const localized = LOCALIZED_ROUTE_MAP[normalized];
  if (!localized) return normalized;
  if (lang === "AR" && localized.arabicPath) return localized.arabicPath;
  return localized.defaultPath;
}

export function buildLocaleSearchParams(current: URLSearchParams | { toString(): string }, lang: LangCode): string {
  const next = new URLSearchParams(current.toString());
  next.set("lang", lang);
  return next.toString();
}

export function buildLanguageAlternates(path: string): NonNullable<Metadata["alternates"]>["languages"] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const map = LOCALIZED_ROUTE_MAP[normalizedPath] ?? { defaultPath: normalizedPath };
  const languages: NonNullable<Metadata["alternates"]>["languages"] = {
    "x-default": map.defaultPath,
  };
  for (const lang of SUPPORTED_LANGS) {
    const html = HTML_LANG_BY_CODE[lang];
    const basePath = lang === "AR" && map.arabicPath ? map.arabicPath : map.defaultPath;
    const q = new URLSearchParams({ lang });
    (languages as Record<string, string>)[html] = `${basePath}?${q.toString()}`;
  }
  return languages;
}
