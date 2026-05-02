import type { HeroContent, LangCode } from "./types";

const EN: HeroContent = {
  eyebrow: "Web3 Growth Infrastructure",
  title: "SIGMA",
  subtitle: "Built to move users, liquidity, and markets.",
  supporting:
    "A data-driven engine for user acquisition, network activation, and scalable market expansion.",
  primaryCta: "Start Scaling",
  secondaryCta: "See the System",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "Scroll",
};

const TR: HeroContent = {
  eyebrow: "Web3 Büyüme Altyapısı",
  title: "SIGMA",
  subtitle: "Kullanıcıları, likiditeyi ve piyasaları hareket etmek için tasarlandı.",
  supporting:
    "Kullanıcı edinimi, ağ aktivasyonu ve ölçeklenebilir pazar genişlemesi için veri odaklı bir motor.",
  primaryCta: "Ölçeklemeye Başla",
  secondaryCta: "Sistemi Gör",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "Kaydır",
};

const ZH: HeroContent = {
  eyebrow: "Web3 增长基础设施",
  title: "SIGMA",
  subtitle: "为用户、流动性与市场流动而构建。",
  supporting:
    "以数据驱动的引擎，实现用户增长、网络激活与可扩展的市场扩张。",
  primaryCta: "开始扩展",
  secondaryCta: "了解系统",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "滚动",
};

const FA: HeroContent = {
  eyebrow: "زیرساخت رشد Web3",
  title: "سیگما",
  subtitle: "برای حرکت کاربران، نقدینگی و بازارها ساخته شده است.",
  supporting:
    "موتوری مبتنی بر داده برای جذب کاربر، فعال‌سازی شبکه و گسترش بازار در مقیاس.",
  primaryCta: "شروع مقیاس‌دهی",
  secondaryCta: "مشاهده سیستم",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "اسکرول",
};

const ES: HeroContent = {
  eyebrow: "Infraestructura de crecimiento Web3",
  title: "SIGMA",
  subtitle: "Diseñado para mover usuarios, liquidez y mercados.",
  supporting:
    "Un motor basado en datos para adquisición de usuarios, activación de red y expansión escalable del mercado.",
  primaryCta: "Empezar a escalar",
  secondaryCta: "Ver el sistema",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "Desplazar",
};

const RU: HeroContent = {
  eyebrow: "Инфраструктура роста Web3",
  title: "SIGMA",
  subtitle: "Создано для движения пользователей, ликвидности и рынков.",
  supporting:
    "Движок на данных для привлечения пользователей, активации сети и масштабируемого расширения рынка.",
  primaryCta: "Начать масштабирование",
  secondaryCta: "Смотреть систему",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "Прокрутка",
};

const AR: HeroContent = {
  eyebrow: "بنية تحتية للنمو في Web3",
  title: "SIGMA",
  subtitle: "صُممت لتحريك المستخدمين والسيولة والأسواق.",
  supporting:
    "محرك قائم على البيانات لاكتساب المستخدمين وتنشيط الشبكة وتوسعة السوق بشكل قابل للتوسع.",
  primaryCta: "ابدأ التوسّع",
  secondaryCta: "استكشف النظام",
  primaryHref: "#connect",
  secondaryHref: "#capabilities",
  logoSrc:
    "https://github.com/madbak98/My-image/blob/main/logo-transparent.png?raw=true",
  scrollHint: "مرر للأسفل",
};

/** Hero — swap for CMS `fetch` later; keys mirror a typical headless hero document */
export const heroByLang: Record<LangCode, HeroContent> = {
  EN,
  TR,
  ZH,
  FA,
  ES,
  RU,
  AR,
};
