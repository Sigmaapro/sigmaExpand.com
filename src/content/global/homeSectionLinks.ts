import type { LangCode } from "../types";
import { siteRestByLang } from "../site";
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

/** Labels not covered by `siteRestByLang.ui.learnMore` */
type ExtraLabels = {
  heroInsights: string;
  contact: string;
  faq: string;
};

const EXTRA_LABELS_BY_LANG: Record<LangCode, ExtraLabels> = {
  EN: {
    heroInsights: "View insights",
    contact: "Contact us",
    faq: "Read FAQ",
  },
  TR: {
    heroInsights: "İçgörülere git",
    contact: "İletişim sayfası",
    faq: "SSS",
  },
  FA: {
    heroInsights: "مشاهده بینش‌ها",
    contact: "صفحه تماس",
    faq: "سوالات متداول",
  },
  ZH: {
    heroInsights: "查看洞察",
    contact: "联系页面",
    faq: "常见问题",
  },
  ES: {
    heroInsights: "Ver insights",
    contact: "Página de contacto",
    faq: "Preguntas frecuentes",
  },
  RU: {
    heroInsights: "К инсайтам",
    contact: "Страница контактов",
    faq: "FAQ",
  },
  AR: {
    heroInsights: "عرض الرؤى",
    contact: "صفحة اتصل بنا",
    faq: "الأسئلة الشائعة",
  },
};

/** Contextual deep links on the homepage — hrefs resolved here; “Learn more” from `t.ui.learnMore`. */
export function getHomeSectionLinks(lang: LangCode): HomeSectionLinksResolved {
  const extra = EXTRA_LABELS_BY_LANG[lang];
  const learnMore = siteRestByLang[lang].ui.learnMore;
  const insightsHref = siteSettings.insightsUrl;
  return {
    about: { label: learnMore, href: ROUTES.about },
    whatIsSigma: { label: learnMore, href: ROUTES.about },
    capabilities: { label: learnMore, href: ROUTES.services },
    proof: { label: learnMore, href: ROUTES.services },
    sigmaPro: { label: learnMore, href: ROUTES.services },
    heroInsights: { label: extra.heroInsights, href: insightsHref },
    contact: { label: extra.contact, href: ROUTES.contact },
    faq: { label: extra.faq, href: ROUTES.faq },
  };
}
