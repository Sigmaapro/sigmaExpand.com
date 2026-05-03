import type { LangCode } from "@/content/types";

/** UI language is Arabic (not generic RTL — Persian keeps existing Latin-type spacing). */
export function isArabicLang(lang: LangCode): boolean {
  return lang === "AR";
}

/** Eyebrows / kickers with Latin tracking */
export function arEyebrow(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]"
    : "";
}

/** Section headings (display) */
export function arHeading(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-[1.45] sm:!leading-snug [word-spacing:normal]"
    : "";
}

/** Nav pills, tabs, compact labels */
export function arNav(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-snug [word-spacing:normal]"
    : "";
}

/** Primary / ghost CTAs, full-width buttons */
export function arCta(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-normal [word-spacing:normal]"
    : "";
}

/** Card titles, pillar labels */
export function arCardTitle(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-snug [word-spacing:normal]"
    : "";
}

/** Footer column titles & link rows */
export function arFooter(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]"
    : "";
}

/** Small caps / muted lines with wide Latin tracking (e.g. CTA subcopy) */
export function arMutedTrack(lang: LangCode): string {
  return isArabicLang(lang)
    ? "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]"
    : "";
}
