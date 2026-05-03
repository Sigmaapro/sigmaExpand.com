"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LangCode } from "@/content/types";
import { LANGUAGE_SWITCHER_OPTIONS } from "@/content/languageSwitcher";
import { arNav } from "@/lib/arabicTypography";

export function LanguageSwitcherButton({
  currentLang,
  setLang,
  ariaLabel,
  compactLabel,
}: {
  currentLang: LangCode;
  setLang: (l: LangCode) => void;
  ariaLabel: string;
  /** Locale-aware short label for closed chip (not raw LangCode). */
  compactLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title={`${ariaLabel}: ${compactLabel}`}
        className={`inline-flex h-12 min-h-12 min-w-[4.5rem] max-w-[min(7.25rem,32vw)] shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#b8c0c8] transition-colors hover:border-white/18 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:min-h-14 sm:min-w-[72px] sm:max-w-[min(8.75rem,30vw)] sm:gap-2 sm:px-4 sm:text-[14px] sm:tracking-[0.06em] ${arNav(currentLang)}`}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        <span className="min-w-0 truncate leading-none normal-case">{compactLabel}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute end-0 top-[calc(100%+10px)] z-[60] flex min-w-[140px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d1018]/95 shadow-2xl backdrop-blur-xl"
            role="listbox"
          >
            {LANGUAGE_SWITCHER_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={currentLang === lang.code}
                onClick={() => {
                  setLang(lang.code);
                  setOpen(false);
                }}
                className={`px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${arNav(currentLang)} ${
                  currentLang === lang.code
                    ? "bg-[#1c39bb] text-white"
                    : "text-[#adb5bd] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
