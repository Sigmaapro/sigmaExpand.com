import type { HeroCarouselContent, LangCode } from "./types";

const EN: HeroCarouselContent = {
  carouselAriaLabel: "Featured highlights",
  ecosystemCtaLabel: "Who we build for",
  proofCtaLabel: "Proof in numbers",
  paginationDotLabels: ["Insights", "Four engines", "Proof in numbers"],
};

const FA: HeroCarouselContent = {
  carouselAriaLabel: "برجسته‌ها — کاروسل",
  ecosystemCtaLabel: "برای چه کسانی می‌سازیم",
  proofCtaLabel: "اثبات در اعداد",
  paginationDotLabels: ["بینش‌ها", "چهار موتور", "اثبات در اعداد"],
};

const TR: HeroCarouselContent = {
  carouselAriaLabel: "Öne çıkanlar",
  ecosystemCtaLabel: "Kimin için inşa ediyoruz",
  proofCtaLabel: "Sayılarla kanıt",
  paginationDotLabels: ["İçgörüler", "Dört motor", "Sayılarla kanıt"],
};

const ZH: HeroCarouselContent = {
  carouselAriaLabel: "精选亮点",
  ecosystemCtaLabel: "我们服务的对象",
  proofCtaLabel: "数据证明",
  paginationDotLabels: ["洞察", "四大引擎", "数据证明"],
};

const ES: HeroCarouselContent = {
  carouselAriaLabel: "Destacados",
  ecosystemCtaLabel: "Para quién construimos",
  proofCtaLabel: "Prueba en números",
  paginationDotLabels: ["Análisis", "Cuatro motores", "Prueba en números"],
};

const RU: HeroCarouselContent = {
  carouselAriaLabel: "Избранные материалы",
  ecosystemCtaLabel: "Для кого мы строим",
  proofCtaLabel: "Доказательство в цифрах",
  paginationDotLabels: ["Инсайты", "Четыре двигателя", "В цифрах"],
};

const AR: HeroCarouselContent = {
  carouselAriaLabel: "مقتطفات مميزة",
  ecosystemCtaLabel: "لمن نبني",
  proofCtaLabel: "أدلة بالأرقام",
  paginationDotLabels: ["رؤى", "أربعة محركات", "أدلة بالأرقام"],
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
