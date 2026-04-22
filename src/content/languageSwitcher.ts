import type { LangCode } from "./types";

/** Display order + labels for the language dropdown (navbar, etc.) */
export const LANGUAGE_SWITCHER_OPTIONS: { code: LangCode; label: string }[] = [
  { code: "FA", label: "فارسی" },
  { code: "EN", label: "ENGLISH" },
  { code: "TR", label: "TÜRKÇE" },
  { code: "ZH", label: "中文" },
];
