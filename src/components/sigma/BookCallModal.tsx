"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { getConversion } from "@/content/conversion";
import type { LangCode } from "@/content/types";
import { isValidEmail } from "@/lib/contact/sanitize";
import { submitLead } from "@/lib/contact/client";
import { localeCta, localeHeading, localeNav } from "@/lib/localeTypography";

function readCalendlyUrl(): string | undefined {
  if (typeof process === "undefined") return undefined;
  const v = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  return v && v.length > 0 ? v : undefined;
}

export function BookCallModal({
  open,
  onClose,
  isRtl,
  lang = "EN",
}: {
  open: boolean;
  onClose: () => void;
  isRtl: boolean;
  lang?: LangCode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const calendlySrc = readCalendlyUrl();
  const reduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMessage("");
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const panel = dialogRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onTabKey);
    return () => {
      document.removeEventListener("keydown", onTabKey);
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  const copy = getConversion(lang).bookCall;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (status === "sending" || status === "success") return;

      setErrorMessage("");

      const trimmedEmail = email.trim();
      if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
        setErrorMessage(copy.invalidEmailError);
        setStatus("error");
        return;
      }

      setErrorMessage("");
      setStatus("sending");

      const result = await submitLead({
        email: trimmedEmail,
        name: name.trim() || undefined,
        message: message.trim() || undefined,
        source: "book-call",
      });

      if (result.ok) {
        setStatus("success");
        return;
      }

      let msg = copy.submitError;
      if (result.status === 503) {
        msg = copy.unavailableError;
      }
      setErrorMessage(msg);
      setStatus("error");
    },
    [status, email, name, message, copy],
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[10060] flex items-end justify-center p-0 pb-[env(safe-area-inset-bottom,0px)] sm:items-center sm:p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label={copy.backdropCloseAria}
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            dir={isRtl ? "rtl" : "ltr"}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 flex max-h-[min(88dvh,calc(100dvh-env(safe-area-inset-bottom,0px)-0.5rem))] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-white/[0.1] border-b-0 bg-gradient-to-b from-[#12161f] to-[#0a0c12] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-h-[min(92vh,720px)] sm:rounded-xl sm:border-b"
            ref={dialogRef}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <h2
                  id={titleId}
                  className={`font-display text-lg font-semibold uppercase tracking-tight text-white ${localeHeading(lang)}`}
                >
                  {copy.title}
                </h2>
                <p id={descriptionId} className="mt-1 text-xs leading-relaxed text-[#8b939e] sm:text-[13px]">
                  {calendlySrc ? copy.calendlyHint : copy.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-md border border-white/[0.08] p-2 text-[#adb5bd] transition-colors hover:border-[#bde0fe]/30 hover:text-white active:scale-[0.98]"
                aria-label={copy.closeLabel}
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
              {calendlySrc ? (
                <div className="relative min-h-[min(52vh,380px)] w-full overflow-hidden rounded-lg border border-white/[0.06] bg-[#07090f] sm:aspect-auto sm:min-h-[520px]">
                  <iframe
                    title={copy.calendlyIframeTitle}
                    src={calendlySrc}
                    className="h-full min-h-[min(52vh,380px)] w-full sm:min-h-[520px]"
                    loading="lazy"
                  />
                </div>
              ) : status === "success" ? (
                <div className="py-6 text-center">
                  <p className="font-display text-base font-semibold text-[#bde0fe]">
                    {copy.successTitle}
                  </p>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#adb5bd]">
                    {copy.successBody}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className={`mt-8 inline-flex min-h-[3rem] min-w-[10rem] items-center justify-center rounded-[2px] border border-[#2a4ecf]/80 bg-[#1c39bb] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[transform,background] duration-200 hover:scale-[1.02] hover:bg-[#152a8a] active:scale-[0.99] ${localeCta(lang)}`}
                  >
                    {copy.closeLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && errorMessage ? (
                    <p className="text-sm text-[#ff8f8f]" role="alert" aria-live="assertive">
                      {errorMessage}
                    </p>
                  ) : null}
                  <div>
                    <label
                      htmlFor="book-name"
                      className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(lang)}`}
                    >
                      {copy.nameLabel}
                    </label>
                    <input
                      id="book-name"
                      name="name"
                      required
                      autoComplete="name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="book-email"
                      className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(lang)}`}
                    >
                      {copy.emailLabel}
                    </label>
                    <input
                      id="book-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="book-message"
                      className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(lang)}`}
                    >
                      {copy.messageLabel}
                    </label>
                    <textarea
                      id="book-message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1.5 min-h-[5.5rem] w-full resize-y rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`mt-3 flex w-full min-h-12 touch-manipulation items-center justify-center rounded-[2px] border border-[#2a4ecf]/80 bg-[#1c39bb] text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[transform,background,opacity] duration-200 hover:scale-[1.01] hover:bg-[#152a8a] active:scale-[0.99] disabled:opacity-60 ${localeCta(lang)}`}
                  >
                    {status === "sending" ? copy.sendingLabel : copy.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
