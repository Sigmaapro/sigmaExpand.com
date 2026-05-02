import type { LangCode } from "./types";

/** Display order + labels for the language dropdown (navbar, etc.) */
export const LANGUAGE_SWITCHER_OPTIONS: { code: LangCode; label: string }[] = [
  { code: "AR", label: "العربية" },
  { code: "FA", label: "فارسی" },
  { code: "ES", label: "ESPAÑOL" },
  { code: "RU", label: "РУССКИЙ" },
  { code: "EN", label: "ENGLISH" },
  { code: "TR", label: "TÜRKÇE" },
  { code: "ZH", label: "中文" },
];
