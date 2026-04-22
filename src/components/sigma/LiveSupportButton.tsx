"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Headphones } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { LiveSupportPanelContent } from "@/content/types";
import { isValidEmail } from "@/lib/contact/sanitize";
import { submitLead } from "@/lib/contact/client";

type LiveSupportButtonProps = {
  /** Accessible name + tooltip (translate in parent). */
  label: string;
  /** Panel copy from `site` / CMS */
  panel: LiveSupportPanelContent;
  /** Optional async hook for future backend integration. */
  onSubmit?: (payload: {
    email: string;
    name?: string;
    message: string;
  }) => Promise<void> | void;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function LiveSupportButton({ label, panel, onSubmit }: LiveSupportButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      const target = e.target as Node | null;
      if (target && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");
    setSubmitState("idle");

    const em = email.trim();
    const msg = message.trim();

    if (!em || !msg) {
      setSubmitState("error");
      setErrorText(panel.validationError);
      return;
    }

    if (!isValidEmail(em)) {
      setSubmitState("error");
      setErrorText(panel.invalidEmailError);
      return;
    }

    try {
      setSubmitState("loading");
      if (onSubmit) {
        await onSubmit({
          email: em,
          name: name.trim() || undefined,
          message: msg,
        });
      } else {
        const result = await submitLead({
          email: em,
          name: name.trim() || undefined,
          message: msg,
          source: "live-support",
        });
        if (!result.ok) {
          throw new Error(result.error);
        }
      }
      setSubmitState("success");
      setMessage("");
    } catch {
      setSubmitState("error");
      setErrorText(panel.sendError);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] end-[max(0.75rem,env(safe-area-inset-right,0px))] z-[90] max-w-[100vw] md:bottom-8 md:end-8"
    >
      <AnimatePresence>
        {open ? (
          <motion.section
            id="sigma-live-support-panel"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[calc(100%+0.75rem)] end-0 w-[min(calc(100vw-1.5rem),22rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-white/10 bg-[#0b0f17]/95 shadow-[0_26px_56px_rgba(0,0,0,0.62)] backdrop-blur-2xl sm:w-[min(91vw,360px)] sm:max-w-none"
            aria-label={panel.panelAriaLabel}
          >
            <div className="border-b border-white/[0.07] bg-gradient-to-r from-[#0d1320] via-[#0b0f17] to-[#0b0f17] px-4 py-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-[#f1f3f5]">
                    {panel.panelTitle}
                  </h3>
                  <p className="mt-1 text-xs text-[#9aa3ad]">
                    {panel.panelSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-[#adb5bd] transition-colors hover:border-white/[0.16] hover:text-white"
                  aria-label={panel.closeAria}
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
              <input
                type="text"
                inputMode="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={panel.namePlaceholder}
                className="min-h-11 w-full rounded-md border border-white/[0.11] bg-[#0a0d14] px-3 py-2.5 text-base text-[#e9ecef] placeholder:text-[#6c757d] outline-none transition-colors focus:border-[#1c39bb]/60 sm:text-sm"
              />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={panel.emailPlaceholder}
                className="min-h-11 w-full rounded-md border border-white/[0.11] bg-[#0a0d14] px-3 py-2.5 text-base text-[#e9ecef] placeholder:text-[#6c757d] outline-none transition-colors focus:border-[#1c39bb]/60 sm:text-sm"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={panel.messagePlaceholder}
                rows={4}
                className="min-h-[5.5rem] w-full resize-y rounded-md border border-white/[0.11] bg-[#0a0d14] px-3 py-2.5 text-base text-[#e9ecef] placeholder:text-[#6c757d] outline-none transition-colors focus:border-[#1c39bb]/60 sm:text-sm"
                required
              />

              {submitState === "success" ? (
                <p className="text-xs text-[#7bf1d2]">{panel.successBody}</p>
              ) : null}
              {submitState === "error" ? (
                <p className="text-xs text-[#ff8f8f]">{errorText}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitState === "loading"}
                className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-md border border-[#2a4ecf]/80 bg-[#1c39bb] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-[background,border-color] hover:border-[#bde0fe]/45 hover:bg-[#17309f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitState === "loading" ? panel.submitSending : panel.submit}
              </button>

              <p className="text-center text-[11px] text-[#7d8690]">
                {panel.footerNote}
              </p>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-[3.25rem] min-h-[3.25rem] w-[3.25rem] min-w-[3.25rem] cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/12 bg-[#07090f]/90 text-[#e9ecef] shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] hover:scale-[1.05] hover:border-[#1c39bb]/45 hover:bg-[#1c39bb]/25 hover:text-white hover:shadow-[0_16px_48px_rgba(28,57,187,0.35)] active:scale-[0.98] md:h-[3.75rem] md:min-h-[3.75rem] md:w-[3.75rem] md:min-w-[3.75rem]"
        aria-label={label}
        aria-expanded={open}
        aria-controls="sigma-live-support-panel"
        title={label}
      >
        <Headphones className="size-[1.35rem] md:size-6" strokeWidth={2} aria-hidden />
        <span
          className="pointer-events-none absolute -end-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2dd4bf] shadow-[0_0_0_2px_rgba(7,9,15,0.9)]"
          aria-hidden
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white/90" />
        </span>
        <span className="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap rounded-md border border-white/10 bg-[#0b0f17]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#dbe4ee] shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-opacity duration-200 group-hover:opacity-100 md:inline-flex md:opacity-0">
          {label}
        </span>
      </button>
    </div>
  );
}
