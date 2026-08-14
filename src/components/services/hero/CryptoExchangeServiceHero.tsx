"use client";

import Link from "next/link";
import type { ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { CryptoExchangeHeroPrimaryCta } from "@/components/services/hero/CryptoExchangeHeroPrimaryCta";
import { TextType } from "@/components/react-bits/TextType";
import { ServiceIntroStatement } from "@/components/services/landing/ServiceIntroStatement";
import { useLanguage } from "@/context/LanguageContext";
import "./CryptoExchangeHeroTitleGlass.css";

type CryptoExchangeServiceHeroProps = {
  document: ImportedServiceDocument;
  lead: string;
  intro: string;
};

const HERO_COPY = {
  EN: {
    label: "crypto exchange marketing",
    title: "Crypto Exchange Marketing for User Acquisition, Volume Growth and Regional Expansion",
    lead: "Listing your exchange is the easy part. Filling it with real, active, retained traders is the growth problem Sigma solves.",
    intro: "Sigma delivers crypto exchange marketing as growth infrastructure, not isolated campaigns. We help exchanges and brokers turn visibility into verified users, activation into trading volume, and one-off traders into a retained base — through user acquisition, KOL activation, IB and affiliate networks, VIP and whale onboarding introductions, community growth, localization and product feedback.",
    primaryCta: "Scale Your Platform with Sigma",
    secondaryCta: "Request a Growth Consultation  ·  Apply as an IB Partner",
  },
  FA: {
    label: "مارکتینگ صرافی کریپتو",
    title: "مارکتینگ صرافی کریپتو برای جذب کاربر، رشد حجم معاملات و توسعه منطقه‌ای",
    lead: "لیست شدن صرافی بخش ساده ماجراست. پر کردن آن با معامله‌گران واقعی، فعال و ماندگار، مسئله رشدی است که Sigma حل می‌کند.",
    intro: "Sigma مارکتینگ صرافی کریپتو را به‌عنوان زیرساخت رشد ارائه می‌دهد، نه کمپین‌های جداافتاده. ما به صرافی‌ها و بروکرها کمک می‌کنیم دیده‌شدن را به کاربران تأییدشده، فعال‌سازی را به حجم معاملات و معامله‌گران مقطعی را به جامعه‌ای ماندگار تبدیل کنند؛ با جذب کاربر، فعال‌سازی KOL، شبکه‌های IB و افیلیت، معرفی VIP و نهنگ‌ها، رشد کامیونیتی، بومی‌سازی و بازخورد محصول.",
    primaryCta: "پلتفرم خود را با Sigma توسعه دهید",
    secondaryCta: "درخواست مشاوره رشد  ·  درخواست همکاری به‌عنوان IB",
  },
  AR: {
    label: "تسويق منصات العملات المشفرة",
    title: "تسويق منصات العملات المشفرة لاكتساب المستخدمين ونمو حجم التداول والتوسع الإقليمي",
    lead: "إدراج منصتك هو الجزء السهل. أما ملؤها بمتداولين حقيقيين ونشطين ومستمرين فهو تحدي النمو الذي تحله Sigma.",
    intro: "تقدم Sigma تسويق منصات العملات المشفرة كبنية للنمو، لا كحملات منفصلة. نساعد المنصات والوسطاء على تحويل الظهور إلى مستخدمين موثّقين، والتفعيل إلى حجم تداول، والمتداولين العابرين إلى قاعدة مستمرة عبر اكتساب المستخدمين وتفعيل KOL وشبكات IB والإحالة ومقدمات VIP والحيتان ونمو المجتمع والتوطين وملاحظات المنتج.",
    primaryCta: "وسّع منصتك مع Sigma",
    secondaryCta: "اطلب استشارة للنمو  ·  قدّم كشريك IB",
  },
  RU: {
    label: "маркетинг криптобирж",
    title: "Маркетинг криптобиржи для привлечения пользователей, роста объёма и регионального расширения",
    lead: "Листинг биржи — простая часть задачи. Заполнить её реальными, активными и удержанными трейдерами — задача роста, которую решает Sigma.",
    intro: "Sigma рассматривает маркетинг криптобиржи как инфраструктуру роста, а не набор разрозненных кампаний. Мы помогаем биржам и брокерам превращать видимость в подтверждённых пользователей, активацию — в торговый объём, а разовых трейдеров — в устойчивую базу через привлечение пользователей, активацию KOL, IB- и affiliate-сети, онбординг VIP и крупных трейдеров, развитие сообщества, локализацию и обратную связь по продукту.",
    primaryCta: "Масштабировать платформу с Sigma",
    secondaryCta: "Запросить консультацию по росту  ·  Подать заявку как IB",
  },
  ES: {
    label: "marketing de exchanges cripto",
    title: "Marketing de exchanges cripto para adquisición de usuarios, crecimiento de volumen y expansión regional",
    lead: "Listar tu exchange es la parte fácil. Llenarlo con traders reales, activos y retenidos es el problema de crecimiento que Sigma resuelve.",
    intro: "Sigma ofrece marketing de exchanges cripto como infraestructura de crecimiento, no como campañas aisladas. Ayudamos a exchanges y brokers a convertir visibilidad en usuarios verificados, activación en volumen de trading y traders puntuales en una base retenida mediante adquisición, activación de KOL, redes IB y de afiliados, onboarding de VIPs y ballenas, crecimiento de comunidad, localización y feedback de producto.",
    primaryCta: "Escala tu plataforma con Sigma",
    secondaryCta: "Solicitar una consulta de crecimiento  ·  Aplicar como IB",
  },
  ZH: {
    label: "加密交易平台营销",
    title: "面向用户获取、交易量增长与区域扩张的加密交易平台营销",
    lead: "让交易平台完成上架只是容易的一步。吸引真实、活跃并持续留存的交易者，才是 Sigma 解决的增长问题。",
    intro: "Sigma 将加密交易平台营销作为增长基础设施，而不是孤立的活动。我们帮助交易平台和经纪商将曝光转化为经过验证的用户，将激活转化为交易量，并通过用户获取、KOL 激活、IB 与联盟网络、VIP 与大户引荐、社群增长、本地化和产品反馈，把一次性交易者转化为持续留存的用户群体。",
    primaryCta: "与 Sigma 一起扩展您的平台",
    secondaryCta: "申请增长咨询  ·  申请成为 IB 合作伙伴",
  },
} as const;

/** Presentational split of the exact secondary CTA string on the middle-dot separator. */
function secondaryCtaParts(secondaryCta: string): string[] {
  return secondaryCta
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Editorial Hero for crypto-exchange-growth-market-development.
 * Exact client copy only. The intro paragraph sits above the primary CTA.
 */
export function CryptoExchangeServiceHero({ document, lead, intro }: CryptoExchangeServiceHeroProps) {
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const label = copy.label;
  const title = copy.title;
  const displayTitle = title.replace(
    " for User Acquisition, Volume Growth",
    " for User Acquisition,\nVolume Growth",
  );
  const secondaryParts = secondaryCtaParts(copy.secondaryCta);

  return (
    <section
      className="relative isolate min-h-0 overflow-x-clip pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.25rem))] md:min-h-[68svh]"
      aria-labelledby="crypto-exchange-service-hero-title"
    >
      <div className="relative z-10 mx-auto flex max-w-[1720px] flex-col justify-start gap-5 px-4 pb-10 pt-2 sm:px-6 md:min-h-[calc(68svh-5.25rem)] md:gap-6 md:pb-10 md:pt-4 lg:px-10">
        <p className="inline-flex items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1D89BB] sm:text-xs">
          <span className="h-px w-7 bg-[#1D89BB]/70" aria-hidden="true" />
          <span>{label}</span>
        </p>

        <div className="flex w-full justify-center">
          <div className="crypto-exchange-hero-title-glass w-full max-w-[77.5rem] px-[1.375rem] py-[1.125rem] sm:px-8 sm:py-6 md:px-10 md:py-7 lg:px-12 lg:py-8">
            <div className="crypto-exchange-hero-title-glass__sheen" aria-hidden="true" />
            <div className="crypto-exchange-hero-title-glass__liquid" aria-hidden="true" />
            <div className="crypto-exchange-hero-title-glass__grain" aria-hidden="true" />

            <h1
              id="crypto-exchange-service-hero-title"
              className="relative z-[1] m-0 w-full max-w-[34ch] whitespace-pre-line text-center font-display text-[clamp(1.75rem,1.2rem+1.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white text-balance md:max-w-[52ch] lg:max-w-[54ch]"
            >
              <TextType
                text={displayTitle}
                typingSpeed={34}
                pauseDuration={1400}
                loop={false}
              />
            </h1>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[54rem] flex-col items-center pt-1 md:pt-2">
          <p className="max-w-[53.75rem] text-center text-[clamp(1.0625rem,1rem+0.3vw,1.3125rem)] font-medium leading-relaxed text-[#e8eef5] text-balance">
            {copy.lead || lead}
          </p>

          {copy.intro || intro ? <ServiceIntroStatement text={copy.intro || intro} inHero /> : null}

          <div className="mt-2 flex w-full flex-col items-center gap-4 md:mt-3 md:gap-5">
            {copy.primaryCta || document.primaryCta ? (
              <CryptoExchangeHeroPrimaryCta label={copy.primaryCta || document.primaryCta} href="/contact" />
            ) : null}

            {secondaryParts.length > 0 ? (
              <ul className="mt-1 flex list-none flex-col items-center gap-3 p-0 sm:mt-0 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7 sm:gap-y-2">
                {secondaryParts.map((part) => (
                  <li key={part}>
                    <Link
                      href="/contact"
                      className="text-sm font-medium leading-relaxed text-[#cfd6de] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 md:text-[15px]"
                    >
                      {part}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
