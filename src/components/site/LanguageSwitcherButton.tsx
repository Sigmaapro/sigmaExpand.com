"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LangCode } from "@/content/types";
import { LANGUAGE_SWITCHER_OPTIONS } from "@/content/languageSwitcher";
import { buildLocaleSearchParams, routePathForLang } from "@/lib/i18n";
import {
  isLatinLang,
  localeLanguageSwitcherOption,
  localeNav,
} from "@/lib/localeTypography";

type MenuCoords = {
  top: number;
  left: number;
  width: number;
};

/**
 * Language switcher — dropdown is portaled to document.body so fluid-glass
 * navbar overflow / filters cannot clip or trap it. Cursor is restored while open.
 */
export function LanguageSwitcherButton({
  currentLang,
  setLang,
  ariaLabel,
  compactLabel,
  variant = "default",
}: {
  currentLang: LangCode;
  setLang: (l: LangCode) => void;
  ariaLabel: string;
  /** Locale-aware short label for closed chip (not raw LangCode). */
  compactLabel: string;
  /** Compact pill for mobile navbar — shows language code, smaller tap target styling. */
  variant?: "default" | "navCompact";
}) {
  const isNavCompact = variant === "navCompact";
  const closedLabel = isNavCompact ? currentLang : compactLabel;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<MenuCoords | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = useId();
  const triggerId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const menuWidth = Math.min(Math.max(rect.width, 148), Math.min(240, window.innerWidth - 16));
    let left = rect.right - menuWidth;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    const top = Math.min(rect.bottom + 10, window.innerHeight - 16);
    setCoords({ top, left, width: menuWidth });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updateCoords();
  }, [open, updateCoords]);

  useEffect(() => {
    if (!open) return;
    const onResizeOrScroll = () => updateCoords();
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, true);
    return () => {
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll, true);
    };
  }, [open, updateCoords]);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("sigma-lang-menu-open");
    else root.classList.remove("sigma-lang-menu-open");
    return () => root.classList.remove("sigma-lang-menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
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

  const menu = mounted
    ? createPortal(
        <AnimatePresence>
          {open && coords ? (
            <motion.div
              key="sigma-lang-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                width: coords.width,
                zIndex: 10050,
              }}
              className="flex max-h-[min(60svh,20rem)] flex-col overflow-y-auto overflow-x-hidden rounded-lg border border-white/10 bg-[#0d1018]/98 shadow-2xl backdrop-blur-xl"
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      applyLanguage(lang.code);
                      setOpen(false);
                      triggerRef.current?.focus();
                    }
                  }}
                  data-latin-label={isLatinLang(lang.code) ? true : undefined}
                  className={`cursor-pointer px-4 py-3 text-start text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#bde0fe]/60 ${localeLanguageSwitcherOption(lang.code)} ${
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
        </AnimatePresence>,
        document.body,
      )
    : null;

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
            return;
          }
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setOpen((prev) => !prev);
            return;
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        aria-autocomplete="none"
        className={
          isNavCompact
            ? `inline-flex h-11 min-h-11 min-w-[2.75rem] max-w-[3.25rem] shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.03] px-2 text-[11px] font-semibold tracking-[0.06em] text-[#c5ccd3] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 ${localeNav(currentLang)}`
            : `inline-flex h-12 min-h-12 min-w-[4.5rem] max-w-[min(7.25rem,32vw)] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#b8c0c8] transition-colors hover:border-white/18 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:h-14 sm:min-h-14 sm:min-w-[72px] sm:max-w-[min(8.75rem,30vw)] sm:gap-2 sm:px-4 sm:text-[14px] sm:tracking-[0.06em] ${localeNav(currentLang)}`
        }
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        id={triggerId}
      >
        <Globe
          className={`shrink-0 ${isNavCompact ? "size-3 opacity-80" : "size-4"}`}
          strokeWidth={2}
          aria-hidden
        />
        <span className="min-w-0 truncate leading-none normal-case">{closedLabel}</span>
      </button>
      {menu}
    </div>
  );
}
