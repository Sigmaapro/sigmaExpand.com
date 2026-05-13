"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { LangCode } from "@/content/types";
import { LANGUAGE_SWITCHER_OPTIONS } from "@/content/languageSwitcher";
import { buildLocaleSearchParams, routePathForLang } from "@/lib/i18n";
import { localeNav } from "@/lib/localeTypography";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = useId();
  const triggerId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = Math.max(
      0,
      LANGUAGE_SWITCHER_OPTIONS.findIndex((item) => item.code === currentLang),
    );
    setActiveIndex(selectedIndex);
    window.requestAnimationFrame(() => {
      optionRefs.current[selectedIndex]?.focus();
    });
  }, [open, currentLang]);

  const applyLanguage = (nextLang: LangCode) => {
    setLang(nextLang);
    document.cookie = `sigma-lang=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const targetPath = routePathForLang(pathname || "/", nextLang);
    const nextQuery = buildLocaleSearchParams(searchParams, nextLang);
    router.replace(nextQuery ? `${targetPath}?${nextQuery}` : targetPath, { scroll: false });
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        onClick={() => setOpen(!open)}
        title={`${ariaLabel}: ${compactLabel}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`inline-flex h-12 min-h-12 min-w-[4.5rem] max-w-[min(7.25rem,32vw)] shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#b8c0c8] transition-colors hover:border-white/18 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:h-14 sm:min-h-14 sm:min-w-[72px] sm:max-w-[min(8.75rem,30vw)] sm:gap-2 sm:px-4 sm:text-[14px] sm:tracking-[0.06em] ${localeNav(currentLang)}`}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        id={triggerId}
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
            className="absolute end-0 top-[calc(100%+10px)] z-[60] flex max-h-[min(60svh,20rem)] min-w-[140px] max-w-[min(92vw,15rem)] flex-col overflow-hidden overflow-y-auto rounded-lg border border-white/10 bg-[#0d1018]/95 shadow-2xl backdrop-blur-xl"
            role="listbox"
            id={listboxId}
            aria-labelledby={triggerId}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
                triggerRef.current?.focus();
                return;
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = (activeIndex + 1) % LANGUAGE_SWITCHER_OPTIONS.length;
                setActiveIndex(next);
                optionRefs.current[next]?.focus();
                return;
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next =
                  (activeIndex - 1 + LANGUAGE_SWITCHER_OPTIONS.length) %
                  LANGUAGE_SWITCHER_OPTIONS.length;
                setActiveIndex(next);
                optionRefs.current[next]?.focus();
                return;
              }
              if (e.key === "Home") {
                e.preventDefault();
                setActiveIndex(0);
                optionRefs.current[0]?.focus();
                return;
              }
              if (e.key === "End") {
                e.preventDefault();
                const last = LANGUAGE_SWITCHER_OPTIONS.length - 1;
                setActiveIndex(last);
                optionRefs.current[last]?.focus();
              }
            }}
          >
            {LANGUAGE_SWITCHER_OPTIONS.map((lang, index) => (
              <button
                key={lang.code}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                aria-selected={currentLang === lang.code}
                id={`${listboxId}-option-${index}`}
                tabIndex={open && activeIndex === index ? 0 : -1}
                onClick={() => {
                  applyLanguage(lang.code);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onFocus={() => setActiveIndex(index)}
                className={`px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#bde0fe]/60 ${localeNav(currentLang)} ${
                  currentLang === lang.code
                    ? "bg-[#1c39bb] text-white"
                    : "text-[#adb5bd] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="block truncate">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
