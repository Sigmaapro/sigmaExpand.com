"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGE_SWITCHER_OPTIONS } from "@/content/languageSwitcher";

export function SiteNavbar() {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.debug("[i18n] SiteNavbar render for", language);
  }, [language]);

  return (
    <nav
      className="fixed top-0 z-[100] flex w-full items-center justify-between border-b border-cadet/10 bg-erie/80 px-5 py-4 backdrop-blur-md md:px-10"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-white"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/logo.svg"
          alt={t.ui.logoAlt}
          width={120}
          height={36}
          className="h-9 w-auto md:h-11"
          priority
        />
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        <a
          href="/#about"
          className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-cadet transition-colors hover:text-white"
        >
          {t.nav.system}
        </a>
        <a
          href="/#ecosystem"
          className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-cadet transition-colors hover:text-white"
        >
          {t.nav.capabilities}
        </a>
        <a
          href="/#metrics"
          className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-cadet transition-colors hover:text-white"
        >
          {t.nav.metrics}
        </a>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-2 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-cadet transition-colors hover:text-white"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={t.ui.navChrome.languageMenuAria}
          >
            <Globe size={14} strokeWidth={2} aria-hidden />
            <span>{language}</span>
          </button>

          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className={`absolute top-full mt-2 min-w-[132px] overflow-hidden border border-cadet/20 bg-erie ${
                  isRtl ? "left-0" : "right-0"
                }`}
                role="listbox"
              >
                {LANGUAGE_SWITCHER_OPTIONS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    role="option"
                    aria-selected={language === l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left font-body text-[11px] font-bold uppercase tracking-widest transition-colors rtl:text-right ${
                      language === l.code
                        ? "bg-persian text-white"
                        : "text-cadet hover:bg-cadet/10 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <a
          href="/#connect"
          className="border border-white/20 px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-erie"
        >
          {t.nav.navCta}
        </a>
      </div>
    </nav>
  );
}
