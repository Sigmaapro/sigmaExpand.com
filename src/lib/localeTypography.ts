import type { LangCode } from "@/content/types";

/** EN, TR, ES, RU — Latin script; wide tracking / uppercase OK */
export function isLatinLang(lang: LangCode): boolean {
  return lang === "EN" || lang === "TR" || lang === "ES" || lang === "RU";
}

/** FA, AR — RTL connected script */
export function isRtlConnectedLang(lang: LangCode): boolean {
  return lang === "FA" || lang === "AR";
}

export function isZhLang(lang: LangCode): boolean {
  return lang === "ZH";
}

function rtlEyebrow(): string {
  return "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]";
}

function zhEyebrow(): string {
  return "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]";
}

function rtlHeading(): string {
  return "!tracking-normal normal-case !leading-[1.45] sm:!leading-snug [word-spacing:normal]";
}

function zhHeading(): string {
  return "!tracking-normal normal-case sm:!leading-snug [word-spacing:normal]";
}

function rtlNav(): string {
  return "!tracking-normal normal-case !leading-snug [word-spacing:normal]";
}

function zhNav(): string {
  return "!tracking-normal normal-case !leading-snug [word-spacing:normal]";
}

function rtlCta(): string {
  return "!tracking-normal normal-case !leading-normal [word-spacing:normal]";
}

function zhCta(): string {
  return "!tracking-normal normal-case !leading-normal [word-spacing:normal]";
}

function rtlFooter(): string {
  return "!tracking-normal normal-case !leading-relaxed [word-spacing:normal]";
}

function rtlBody(): string {
  return "normal-case !tracking-normal !leading-[1.95] [word-spacing:0.02em]";
}

function rtlMeta(): string {
  return "normal-case !tracking-normal !leading-relaxed [word-spacing:normal]";
}

/** Eyebrows / kickers */
export function localeEyebrow(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlEyebrow();
  if (isZhLang(lang)) return zhEyebrow();
  return "";
}

/** Section headings (display) */
export function localeHeading(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlHeading();
  if (isZhLang(lang)) return zhHeading();
  return "";
}

/** Nav pills, tabs, compact labels */
export function localeNav(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlNav();
  if (isZhLang(lang)) return zhNav();
  return "";
}

/** Primary / ghost CTAs */
export function localeCta(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlCta();
  if (isZhLang(lang)) return zhCta();
  return "";
}

/** Card titles, pillar labels */
export function localeCardTitle(lang: LangCode): string {
  return localeNav(lang);
}

/** Footer column titles & link rows */
export function localeFooter(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlFooter();
  if (isZhLang(lang)) return rtlFooter();
  return "";
}

/** Muted lines that used wide Latin tracking */
export function localeMutedTrack(lang: LangCode): string {
  return localeFooter(lang);
}

/** Body paragraphs & dense copy */
export function localeBody(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlBody();
  if (isZhLang(lang)) return "!tracking-normal !leading-[1.9]";
  return "";
}

/** Small meta labels, dates, chips */
export function localeMeta(lang: LangCode): string {
  if (isRtlConnectedLang(lang)) return rtlMeta();
  if (isZhLang(lang)) return "!tracking-normal normal-case";
  return "";
}

/** Hero subtitle row */
export function localeHeroSubtitle(lang: LangCode): string {
  if (isLatinLang(lang)) return "tracking-[-0.01em]";
  if (isZhLang(lang)) return "!tracking-normal !leading-relaxed";
  return "!tracking-normal !leading-snug";
}

/** Hero supporting copy */
export function localeHeroSupporting(lang: LangCode): string {
  if (isLatinLang(lang)) return "leading-[1.75] sm:leading-[1.72]";
  if (isZhLang(lang)) return "!leading-[1.75] sm:!leading-[1.72]";
  return "!leading-[1.85]";
}

/** Compact labels (e.g. social grid) */
export function localeSmallLabelTrack(lang: LangCode): string {
  if (isLatinLang(lang)) return "tracking-wide";
  return "!tracking-normal leading-snug";
}

/** Large CTA description: Latin keeps wide tracking */
export function localeWideMutedTrack(lang: LangCode): string {
  if (isLatinLang(lang)) return "tracking-[0.14em] sm:tracking-[0.3em]";
  return localeMutedTrack(lang);
}

/** Glass nav Σ wordmark — neutral letterspacing for non-Latin */
export function localeWordmarkNav(lang: LangCode): string {
  if (isLatinLang(lang)) return "";
  return "!tracking-normal normal-case";
}
