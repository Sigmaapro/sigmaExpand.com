/**
 * Conversion layer copy — single source of truth per locale.
 * Wire to CMS by replacing `conversionByLang` fetch/merge.
 */

import type { LangCode } from "./types";

export type MidConversionCopy = {
  label: string;
  headline: string;
  supporting: string;
  primaryLabel: string;
  /** In-page anchor */
  primaryHref: string;
};

export type FinalConversionCopy = {
  headline: string;
  supporting: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
};

export type BookCallModalCopy = {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successBody: string;
  closeLabel: string;
  calendlyHint: string;
  backdropCloseAria: string;
  calendlyIframeTitle: string;
  submitError: string;
  invalidEmailError: string;
  unavailableError: string;
};

export type ConversionBundle = {
  mid: MidConversionCopy;
  final: FinalConversionCopy;
  bookCall: BookCallModalCopy;
};

const EN_MID: MidConversionCopy = {
  label: "READY TO SCALE",
  headline: "Start Scaling with Sigma",
  supporting:
    "Access a structured growth system built for Web3 execution — from acquisition surfaces to liquidity checkpoints.",
  primaryLabel: "Get Access",
  primaryHref: "#connect",
};

const EN_FINAL: FinalConversionCopy = {
  headline: "Build Growth That Actually Converts",
  supporting:
    "From user acquisition to liquidity, Sigma connects the full system. Brief the desk and we will map the shortest path to measurable throughput.",
  primaryLabel: "Work With Sigma",
  primaryHref: "#contact",
  secondaryLabel: "Book a Call",
};

const EN_BOOK: BookCallModalCopy = {
  title: "Book a call",
  subtitle:
    "Share your details — we will confirm a time or follow up within one business day.",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message (optional)",
  submitLabel: "Send request",
  sendingLabel: "Sending…",
  successTitle: "Request received",
  successBody: "Thank you. A member of the team will reach out shortly.",
  closeLabel: "Close",
  calendlyHint: "Pick a slot that fits your calendar.",
  backdropCloseAria: "Close dialog",
  calendlyIframeTitle: "Calendly scheduling",
  submitError:
    "We could not send your request. Please try again or reach out by email.",
  invalidEmailError: "Please enter a valid email address.",
  unavailableError:
    "Requests are temporarily unavailable. Please try again later.",
};

/** Duplicate EN strings until localized — structure is CMS-ready */
const enBundle: ConversionBundle = {
  mid: EN_MID,
  final: EN_FINAL,
  bookCall: EN_BOOK,
};

export const conversionByLang: Record<LangCode, ConversionBundle> = {
  EN: enBundle,
  TR: enBundle,
  ZH: enBundle,
  FA: enBundle,
};

export function getConversion(lang: LangCode): ConversionBundle {
  return conversionByLang[lang] ?? conversionByLang.EN;
}

/** @deprecated Prefer `getConversion(lang).mid` in components */
export const midConversionCta: MidConversionCopy = EN_MID;

/** @deprecated Prefer `getConversion(lang).final` */
export const finalConversionCta: FinalConversionCopy = EN_FINAL;

/** @deprecated Prefer `getConversion(lang).bookCall` */
export const bookCallModalCopy: BookCallModalCopy = EN_BOOK;
