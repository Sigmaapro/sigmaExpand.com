import {
  type FinalService,
} from "@/content/services/finalServices";
import { serviceDisclaimerByLang, serviceUiByLang, getFinalServiceTitle } from "@/content/services/localizedServiceUi";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function ServicePlaceholderPageView({ service }: { service: FinalService }) {
  const { language } = useLanguage();
  const ui = serviceUiByLang[language];
  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-white/[0.08] pb-8">
            <p className={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}>
              {ui.service}
            </p>
            <h1 className={`font-display mt-4 text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl ${localeHeading(language)}`}>
              {getFinalServiceTitle(service.slug, language)}
            </h1>
          </header>

          <p
            className={`mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 px-5 py-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}
            role="status"
          >
            {ui.placeholderNote}
          </p>

          <aside
            className="mt-10 border-t border-white/[0.08] pt-8"
            aria-label={ui.serviceDisclaimer}
          >
            <p className={`text-xs leading-relaxed text-[#8b929c] md:text-sm ${localeBody(language)}`}>
              {serviceDisclaimerByLang[language]}
            </p>
          </aside>
        </article>
      </div>
    </div>
  );
}
