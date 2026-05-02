import type { LangCode } from "../types";
import { siteSettings } from "../siteSettings";
import { ROUTES } from "./routes";

export type HomeSectionLink = { label: string; href: string };

export type HomeSectionLinksResolved = {
  about: HomeSectionLink;
  whatIsSigma: HomeSectionLink;
  capabilities: HomeSectionLink;
  proof: HomeSectionLink;
  sigmaPro: HomeSectionLink;
  heroInsights: HomeSectionLink;
  contact: HomeSectionLink;
  faq: HomeSectionLink;
};

type Labels = {
  about: string;
  whatIsSigma: string;
  capabilities: string;
  proof: string;
  sigmaPro: string;
  heroInsights: string;
  contact: string;
  faq: string;
};

const LABELS_BY_LANG: Record<LangCode, Labels> = {
  EN: {
    about: "More info",
    whatIsSigma: "Learn more",
    capabilities: "More info",
    proof: "More info",
    sigmaPro: "More info",
    heroInsights: "View insights",
    contact: "Contact us",
    faq: "Read FAQ",
  },
  TR: {
    about: "Daha fazla bilgi",
    whatIsSigma: "Devamını oku",
    capabilities: "Daha fazla bilgi",
    proof: "Daha fazla bilgi",
    sigmaPro: "Daha fazla bilgi",
    heroInsights: "İçgörülere git",
    contact: "İletişim sayfası",
    faq: "SSS",
  },
  FA: {
    about: "اطلاعات بیشتر",
    whatIsSigma: "بیشتر بدانید",
    capabilities: "اطلاعات بیشتر",
    proof: "اطلاعات بیشتر",
    sigmaPro: "اطلاعات بیشتر",
    heroInsights: "مشاهده بینش‌ها",
    contact: "صفحه تماس",
    faq: "سوالات متداول",
  },
  ZH: {
    about: "更多信息",
    whatIsSigma: "了解更多",
    capabilities: "更多信息",
    proof: "更多信息",
    sigmaPro: "更多信息",
    heroInsights: "查看洞察",
    contact: "联系页面",
    faq: "常见问题",
  },
  ES: {
    about: "Más información",
    whatIsSigma: "Saber más",
    capabilities: "Más información",
    proof: "Más información",
    sigmaPro: "Más información",
    heroInsights: "Ver insights",
    contact: "Página de contacto",
    faq: "Preguntas frecuentes",
  },
  RU: {
    about: "Подробнее",
    whatIsSigma: "Узнать больше",
    capabilities: "Подробнее",
    proof: "Подробнее",
    sigmaPro: "Подробнее",
    heroInsights: "К инсайтам",
    contact: "Страница контактов",
    faq: "FAQ",
  },
};

/** Contextual deep links on the homepage — labels only; hrefs resolved here. */
export function getHomeSectionLinks(lang: LangCode): HomeSectionLinksResolved {
  const L = LABELS_BY_LANG[lang];
  const insightsHref = siteSettings.insightsUrl;
  return {
    about: { label: L.about, href: ROUTES.about },
    whatIsSigma: { label: L.whatIsSigma, href: ROUTES.about },
    capabilities: { label: L.capabilities, href: ROUTES.services },
    proof: { label: L.proof, href: ROUTES.services },
    sigmaPro: { label: L.sigmaPro, href: ROUTES.services },
    heroInsights: { label: L.heroInsights, href: insightsHref },
    contact: { label: L.contact, href: ROUTES.contact },
    faq: { label: L.faq, href: ROUTES.faq },
  };
}
