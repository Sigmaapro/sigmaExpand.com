import type { HeroCarouselContent, LangCode } from "./types";

const EN: HeroCarouselContent = {
  carouselAriaLabel: "Featured highlights",
  ecosystemCtaLabel: "See capabilities",
  proofCtaLabel: "View network",
  paginationDotLabels: ["Insights", "Core ecosystem", "Proof in numbers"],
};

const FA: HeroCarouselContent = {
  carouselAriaLabel: "برجسته‌ها — کاروسل",
  ecosystemCtaLabel: "مشاهده قابلیت‌ها",
  proofCtaLabel: "مشاهده شبکه",
  paginationDotLabels: ["بینش‌ها", "اکوسیستم هسته", "اثبات در اعداد"],
};

const TR: HeroCarouselContent = {
  carouselAriaLabel: "Öne çıkanlar",
  ecosystemCtaLabel: "Yetenekleri gör",
  proofCtaLabel: "Ağı görüntüle",
  paginationDotLabels: ["İçgörüler", "Temel ekosistem", "Sayılarla kanıt"],
};

const ZH: HeroCarouselContent = {
  carouselAriaLabel: "精选亮点",
  ecosystemCtaLabel: "查看能力",
  proofCtaLabel: "查看网络",
  paginationDotLabels: ["洞察", "核心生态", "数字印证"],
};

const ES: HeroCarouselContent = {
  carouselAriaLabel: "Destacados",
  ecosystemCtaLabel: "Ver capacidades",
  proofCtaLabel: "Ver red",
  paginationDotLabels: ["Análisis", "Ecosistema central", "Cifras clave"],
};

const RU: HeroCarouselContent = {
  carouselAriaLabel: "Избранные материалы",
  ecosystemCtaLabel: "См. возможности",
  proofCtaLabel: "Смотреть сеть",
  paginationDotLabels: ["Инсайты", "Ключевая экосистема", "В цифрах"],
};

const AR: HeroCarouselContent = {
  carouselAriaLabel: "مقتطفات مميزة",
  ecosystemCtaLabel: "عرض القدرات",
  proofCtaLabel: "عرض الشبكة",
  paginationDotLabels: ["رؤى", "النظام الأساسي", "أدلة بالأرقام"],
};

export const heroCarouselByLang: Record<LangCode, HeroCarouselContent> = {
  EN,
  FA,
  TR,
  ZH,
  ES,
  RU,
  AR,
};
