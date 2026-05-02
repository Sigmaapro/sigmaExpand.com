import type { LangCode } from "@/content/types";

export function pickLang<T>(map: Record<LangCode, T>, lang: LangCode): T {
  return map[lang] ?? map.EN;
}
