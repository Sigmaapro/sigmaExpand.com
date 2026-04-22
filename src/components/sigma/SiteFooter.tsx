"use client";

import { useLanguage } from "@/context/LanguageContext";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-cadet/10 bg-[#14171b] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center font-body text-xs text-cadet/50 md:flex-row md:text-left">
        <p>{t.footer.rights}</p>
        <p className="uppercase tracking-[0.25em]">
          {t.footer.statusPrefix}{" "}
          <span className="text-uranian/90">{t.footer.statusValue}</span>
        </p>
        <p className="hidden text-cadet/40 md:block">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
