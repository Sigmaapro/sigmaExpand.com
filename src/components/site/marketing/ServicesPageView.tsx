"use client";

import { PageIntroGlassCard } from "@/components/site/marketing/PageIntroGlassCard";
import { ServiceRoutesGrid } from "@/components/site/marketing/ServiceRoutesGrid";
import { TrueFocus } from "@/components/react-bits/TrueFocus";
import {
  primaryServicesByLang,
  servicesPageContentByLang,
} from "@/content/global/marketing/servicesContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeEyebrow, localeHeading } from "@/lib/localeTypography";

export function ServicesPageView() {
  const { language } = useLanguage();
  const c = pickLang(servicesPageContentByLang, language);
  const primaryServices = pickLang(primaryServicesByLang, language);
  const serviceRouteLabel = {
    EN: "Service Routes",
    TR: "Hizmet Rotaları",
    FA: "مسیرهای خدمات",
    ZH: "服务路径",
    ES: "Rutas de Servicio",
    RU: "Маршруты услуг",
    AR: "مسارات الخدمات",
  }[language];
  const serviceRouteActionLabel = {
    EN: "Explore route",
    TR: "Rotayı keşfet",
    FA: "مشاهده مسیر",
    ZH: "查看路径",
    ES: "Explorar ruta",
    RU: "Открыть маршрут",
    AR: "استكشف المسار",
  }[language];
  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <PageIntroGlassCard
            eyebrow={c.kicker}
            title={c.headline}
            description={c.intro}
            eyebrowClassName={`font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD] ${localeEyebrow(language)}`}
            titleClassName={`font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl ${localeHeading(language)}`}
            descriptionClassName={`mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] md:text-base ${localeBody(language)}`}
          />

          <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-6 lg:p-7">
            <h2 className="sr-only">{serviceRouteLabel}</h2>
            <div className="border-b border-white/[0.08] pb-5 sm:pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#93C5FD]/75 ${localeEyebrow(language)}`}>
                  {language === "FA" ? "توانمندی‌های اصلی" : "Primary capabilities"}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b6bcc4]/55">
                  {String(primaryServices.length).padStart(2, "0")} / {language === "FA" ? "مسیر" : "Routes"}
                </span>
              </div>
              <div className="service-route-heading">
                <TrueFocus
                  sentence={serviceRouteLabel}
                  borderColor="#bde0fe"
                  glowColor="rgba(29, 137, 187, 0.7)"
                  blurAmount={0}
                  animationDuration={0.35}
                  pauseBetweenAnimations={1.8}
                />
              </div>
            </div>
            <ServiceRoutesGrid
              services={primaryServices}
              language={language}
              actionLabel={serviceRouteActionLabel}
            />
          </section>

          <div className="mt-14 space-y-8">
            {c.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0"
              >
                <p
                  className={`font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb] ${localeEyebrow(language)}`}
                >
                  {s.eyebrow}
                </p>
                <h2 className={`font-display mt-2 text-xl font-semibold text-white md:text-2xl ${localeHeading(language)}`}>
                  {s.title}
                </h2>
                <p className={`mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px] ${localeBody(language)}`}>
                  {s.description}
                </p>
                <ul className="mt-6 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                  {s.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
