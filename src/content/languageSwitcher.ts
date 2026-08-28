import type { LangCode } from "./types";
import { isPublicUiLang } from "@/lib/i18n";

/** Display order + labels for the language dropdown (navbar, etc.) */
export const LANGUAGE_SWITCHER_OPTIONS: { code: LangCode; label: string }[] = [
  { code: "AR", label: "العربية" },
  { code: "FA", label: "فارسی" },
  { code: "ES", label: "ESPAÑOL" },
  { code: "RU", label: "РУССКИЙ" },
  { code: "EN", label: "ENGLISH" },
  { code: "ZH", label: "中文" },
];

/** Public menu subset. Full `LANGUAGE_SWITCHER_OPTIONS` is unchanged. */
export const VISIBLE_LANGUAGE_SWITCHER_OPTIONS = LANGUAGE_SWITCHER_OPTIONS.filter((item) =>
  isPublicUiLang(item.code),
);
