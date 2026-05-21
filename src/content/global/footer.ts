import { contactEmail, type SocialPlatformKey } from "../data/socials";
import { siteSettings } from "../siteSettings";
import type { LangCode } from "../types";
import { ROUTES } from "./routes";

/** User-facing Insights / Blog / Research footer links → WordPress CMS */
const insightsNavHref = siteSettings.insightsUrl;

function insightsFooterLink(label: string): FooterColumnLink {
  if (insightsNavHref.startsWith("http")) {
    return { label, href: insightsNavHref, external: true, openInNewTab: false };
  }
  return { label, href: insightsNavHref };
}

export type FooterColumnLink = {
  label: string;
  href: string;
  external?: boolean;
  /** When external, open in same tab if false (default true for generic external URLs) */
  openInNewTab?: boolean;
  disabled?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterColumnLink[];
};

export type GlobalFooterContent = {
  /** Wordmark next to Σ — localized where script differs */
  brandWordmark: string;
  brandTagline: string;
  trustLine: string;
  contactIntro: string;
  email: string;
  columnPlatform: FooterColumn;
  columnCompany: FooterColumn;
  columnResources: FooterColumn;
  socialColumnTitle: string;
  socialLabels: Record<SocialPlatformKey, string>;
  bottomCopyright: string;
  privacy: FooterColumnLink;
  terms: FooterColumnLink;
  statusLabel: string;
  statusValue: string;
  landmarkNav: string;
  landmarkSocial: string;
};

const A = ROUTES.anchor;

const PLATFORM_EN: FooterColumn = {
  title: "Platform",
  links: [
    { label: "System", href: A.system },
    { label: "Capabilities", href: A.capabilities },
    { label: "Network", href: A.network },
    { label: "Sigma Pro", href: A.sigmaPro },
    insightsFooterLink("Insights"),
  ],
};

const COMPANY_EN: FooterColumn = {
  title: "Company",
  links: [
    { label: "About", href: ROUTES.about },
    { label: "Services", href: ROUTES.services },
    { label: "Team", href: ROUTES.team },
    { label: "Contact", href: ROUTES.contact },
    { label: "FAQ", href: ROUTES.faq },
  ],
};

const RESOURCES_EN: FooterColumn = {
  title: "Resources",
  links: [
    insightsFooterLink("Research / Insights"),
    insightsFooterLink("Case Studies"),
    { label: "Privacy", href: ROUTES.privacy },
    { label: "Terms", href: ROUTES.terms },
    { label: "Book a Call", href: ROUTES.contact },
  ],
};

const SOCIAL_LABELS_EN: Record<SocialPlatformKey, string> = {
  x: "X",
  instagram: "Instagram",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
  discord: "Discord",
  tiktok: "TikTok",
};

const FOOTER_EN: GlobalFooterContent = {
  brandWordmark: "Sigma",
  brandTagline:
    "Web3 growth infrastructure for users, liquidity, and market expansion.",
  trustLine: "Built for growth teams, exchanges, and Web3 networks.",
  contactIntro: "For partnerships and growth inquiries",
  email: contactEmail,
  columnPlatform: PLATFORM_EN,
  columnCompany: COMPANY_EN,
  columnResources: RESOURCES_EN,
  socialColumnTitle: "Social",
  socialLabels: SOCIAL_LABELS_EN,
  bottomCopyright: "© 2026 Sigma. All rights reserved.",
  privacy: { label: "Privacy", href: ROUTES.privacy },
  terms: { label: "Terms", href: ROUTES.terms },
  statusLabel: "System status",
  statusValue: "Operational",
  landmarkNav: "Footer navigation",
  landmarkSocial: "Social links",
};

const FOOTER_TR: GlobalFooterContent = {
  brandWordmark: "Sigma",
  brandTagline:
    "Web3 büyüme altyapısı: kullanıcılar, likidite ve pazar genişlemesi için.",
  trustLine: "Büyüme ekipleri, borsalar ve Web3 ağları için tasarlandı.",
  contactIntro: "Ortaklık ve büyüme talepleri için",
  email: contactEmail,
  columnPlatform: {
    title: "Platform",
    links: [
      { label: "Sistem", href: A.system },
      { label: "Yetenekler", href: A.capabilities },
      { label: "Ağ", href: A.network },
      { label: "Sigma Pro", href: A.sigmaPro },
      insightsFooterLink("İçgörüler"),
    ],
  },
  columnCompany: {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", href: ROUTES.about },
      { label: "Hizmetler", href: ROUTES.services },
      { label: "Ekip", href: ROUTES.team },
      { label: "İletişim", href: ROUTES.contact },
      { label: "SSS", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "Kaynaklar",
    links: [
      insightsFooterLink("Araştırma / İçgörüler"),
      insightsFooterLink("Örnek olaylar"),
      { label: "Gizlilik", href: ROUTES.privacy },
      { label: "Şartlar", href: ROUTES.terms },
      { label: "Görüşme ayırt", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "Sosyal",
  socialLabels: {
    x: "X",
    instagram: "Instagram",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    whatsapp: "WhatsApp",
    discord: "Discord",
    tiktok: "TikTok",
  },
  bottomCopyright: "© 2026 Sigma. Tüm hakları saklıdır.",
  privacy: { label: "Gizlilik", href: ROUTES.privacy },
  terms: { label: "Şartlar", href: ROUTES.terms },
  statusLabel: "Sistem durumu",
  statusValue: "Çalışıyor",
  landmarkNav: "Alt bilgi gezinmesi",
  landmarkSocial: "Sosyal bağlantılar",
};

const FOOTER_FA: GlobalFooterContent = {
  brandWordmark: "سیگما",
  brandTagline:
    "زیرساخت رشد وب۳ برای کاربران، نقدینگی و گسترش بازار.",
  trustLine: "ساخته‌شده برای تیم‌های رشد، صرافی‌ها و شبکه‌های وب۳.",
  contactIntro: "برای همکاری و پرسش‌های رشد",
  email: contactEmail,
  columnPlatform: {
    title: "پلتفرم",
    links: [
      { label: "سیستم", href: A.system },
      { label: "قابلیت‌ها", href: A.capabilities },
      { label: "شبکه", href: A.network },
      { label: "سیگما پرو", href: A.sigmaPro },
      insightsFooterLink("بینش‌ها"),
    ],
  },
  columnCompany: {
    title: "شرکت",
    links: [
      { label: "درباره", href: ROUTES.about },
      { label: "خدمات", href: ROUTES.services },
      { label: "تیم", href: ROUTES.team },
      { label: "تماس", href: ROUTES.contact },
      { label: "سوالات", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "منابع",
    links: [
      insightsFooterLink("تحقیق / بینش"),
      insightsFooterLink("مطالعات موردی"),
      { label: "حریم خصوصی", href: ROUTES.privacy },
      { label: "شرایط", href: ROUTES.terms },
      { label: "رزرو تماس", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "شبکه‌های اجتماعی",
  socialLabels: {
    x: "ایکس",
    instagram: "اینستاگرام",
    telegram: "تلگرام",
    linkedin: "لینکدین",
    youtube: "یوتیوب",
    whatsapp: "واتساپ",
    discord: "دیسکورد",
    tiktok: "تیک‌تاک",
  },
  bottomCopyright: "© ۲۰۲۶ سیگما. تمامی حقوق محفوظ است.",
  privacy: { label: "حریم خصوصی", href: ROUTES.privacy },
  terms: { label: "شرایط", href: ROUTES.terms },
  statusLabel: "وضعیت سامانه",
  statusValue: "فعال",
  landmarkNav: "ناوبری پاورقی",
  landmarkSocial: "شبکه‌های اجتماعی",
};

const FOOTER_AR: GlobalFooterContent = {
  brandWordmark: "سيغما",
  brandTagline:
    "بنية تحتية للنمو في Web3 للمستخدمين والسيولة وتوسعة السوق.",
  trustLine: "مُصمَّمة لفرق النمو ومنصات التداول وشبكات Web3.",
  contactIntro: "للشراكات واستفسارات النمو",
  email: contactEmail,
  columnPlatform: {
    title: "المنصة",
    links: [
      { label: "النظام", href: A.system },
      { label: "القدرات", href: A.capabilities },
      { label: "الشبكة", href: A.network },
      { label: "سيغما برو", href: A.sigmaPro },
      insightsFooterLink("الرؤى"),
    ],
  },
  columnCompany: {
    title: "الشركة",
    links: [
      { label: "من نحن", href: ROUTES.about },
      { label: "الخدمات", href: ROUTES.services },
      { label: "الفريق", href: ROUTES.team },
      { label: "اتصل", href: ROUTES.contact },
      { label: "الأسئلة الشائعة", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "المصادر",
    links: [
      insightsFooterLink("البحث / الرؤى"),
      insightsFooterLink("دراسات حالة"),
      { label: "الخصوصية", href: ROUTES.privacy },
      { label: "الشروط", href: ROUTES.terms },
      { label: "احجز مكالمة", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "وسائل التواصل",
  socialLabels: {
    x: "X",
    instagram: "إنستغرام",
    telegram: "تيليغرام",
    linkedin: "لينكدإن",
    youtube: "يوتيوب",
    whatsapp: "واتساب",
    discord: "ديسكورد",
    tiktok: "تيك توك",
  },
  bottomCopyright: "© 2026 سيغما. جميع الحقوق محفوظة.",
  privacy: { label: "الخصوصية", href: ROUTES.privacy },
  terms: { label: "الشروط", href: ROUTES.terms },
  statusLabel: "حالة النظام",
  statusValue: "يعمل",
  landmarkNav: "تذييل التنقل",
  landmarkSocial: "وسائل التواصل",
};

const FOOTER_ZH: GlobalFooterContent = {
  brandWordmark: "西格玛",
  brandTagline: "面向用户、流动性与市场扩张的 Web3 增长基础设施。",
  trustLine: "为增长团队、交易所与 Web3 网络而打造。",
  contactIntro: "合作与增长咨询",
  email: contactEmail,
  columnPlatform: {
    title: "平台",
    links: [
      { label: "系统", href: A.system },
      { label: "能力", href: A.capabilities },
      { label: "网络", href: A.network },
      { label: "Sigma Pro", href: A.sigmaPro },
      insightsFooterLink("洞察"),
    ],
  },
  columnCompany: {
    title: "公司",
    links: [
      { label: "关于", href: ROUTES.about },
      { label: "服务", href: ROUTES.services },
      { label: "团队", href: ROUTES.team },
      { label: "联系", href: ROUTES.contact },
      { label: "常见问题", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "资源",
    links: [
      insightsFooterLink("研究 / 洞察"),
      insightsFooterLink("案例研究"),
      { label: "隐私", href: ROUTES.privacy },
      { label: "条款", href: ROUTES.terms },
      { label: "预约通话", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "社交",
  socialLabels: {
    x: "X",
    instagram: "Instagram",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    whatsapp: "WhatsApp",
    discord: "Discord",
    tiktok: "TikTok",
  },
  bottomCopyright: "© 2026 Sigma。保留所有权利。",
  privacy: { label: "隐私", href: ROUTES.privacy },
  terms: { label: "条款", href: ROUTES.terms },
  statusLabel: "系统状态",
  statusValue: "运行正常",
  landmarkNav: "页脚导航",
  landmarkSocial: "社交媒体",
};

const FOOTER_ES: GlobalFooterContent = {
  brandWordmark: "Sigma",
  brandTagline:
    "Infraestructura de crecimiento Web3 para usuarios, liquidez y expansión de mercado.",
  trustLine: "Diseñado para equipos de crecimiento, exchanges y redes Web3.",
  contactIntro: "Para alianzas y consultas de crecimiento",
  email: contactEmail,
  columnPlatform: {
    title: "Plataforma",
    links: [
      { label: "Sistema", href: A.system },
      { label: "Capacidades", href: A.capabilities },
      { label: "Red", href: A.network },
      { label: "Sigma Pro", href: A.sigmaPro },
      insightsFooterLink("Perspectivas"),
    ],
  },
  columnCompany: {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: ROUTES.about },
      { label: "Servicios", href: ROUTES.services },
      { label: "Equipo", href: ROUTES.team },
      { label: "Contacto", href: ROUTES.contact },
      { label: "FAQ", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "Recursos",
    links: [
      insightsFooterLink("Investigación / Perspectivas"),
      insightsFooterLink("Casos de estudio"),
      { label: "Privacidad", href: ROUTES.privacy },
      { label: "Términos", href: ROUTES.terms },
      { label: "Reservar llamada", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "Redes",
  socialLabels: {
    x: "X",
    instagram: "Instagram",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    whatsapp: "WhatsApp",
    discord: "Discord",
    tiktok: "TikTok",
  },
  bottomCopyright: "© 2026 Sigma. Todos los derechos reservados.",
  privacy: { label: "Privacidad", href: ROUTES.privacy },
  terms: { label: "Términos", href: ROUTES.terms },
  statusLabel: "Estado del sistema",
  statusValue: "Operativo",
  landmarkNav: "Navegación del pie",
  landmarkSocial: "Redes sociales",
};

const FOOTER_RU: GlobalFooterContent = {
  brandWordmark: "Сигма",
  brandTagline:
    "Инфраструктура роста Web3: пользователи, ликвидность и расширение рынка.",
  trustLine: "Для команд роста, бирж и Web3-сетей.",
  contactIntro: "Партнёрства и запросы по росту",
  email: contactEmail,
  columnPlatform: {
    title: "Платформа",
    links: [
      { label: "Система", href: A.system },
      { label: "Возможности", href: A.capabilities },
      { label: "Сеть", href: A.network },
      { label: "Sigma Pro", href: A.sigmaPro },
      insightsFooterLink("Инсайты"),
    ],
  },
  columnCompany: {
    title: "Компания",
    links: [
      { label: "О нас", href: ROUTES.about },
      { label: "Услуги", href: ROUTES.services },
      { label: "Команда", href: ROUTES.team },
      { label: "Контакты", href: ROUTES.contact },
      { label: "FAQ", href: ROUTES.faq },
    ],
  },
  columnResources: {
    title: "Ресурсы",
    links: [
      insightsFooterLink("Исследования / Инсайты"),
      insightsFooterLink("Кейсы"),
      { label: "Конфиденциальность", href: ROUTES.privacy },
      { label: "Условия", href: ROUTES.terms },
      { label: "Записаться на звонок", href: ROUTES.contact },
    ],
  },
  socialColumnTitle: "Соцсети",
  socialLabels: {
    x: "X",
    instagram: "Instagram",
    telegram: "Telegram",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    whatsapp: "WhatsApp",
    discord: "Discord",
    tiktok: "TikTok",
  },
  bottomCopyright: "© 2026 Sigma. Все права защищены.",
  privacy: { label: "Конфиденциальность", href: ROUTES.privacy },
  terms: { label: "Условия", href: ROUTES.terms },
  statusLabel: "Статус системы",
  statusValue: "Работает",
  landmarkNav: "Навигация в подвале",
  landmarkSocial: "Социальные сети",
};

export const globalFooterByLang: Record<LangCode, GlobalFooterContent> = {
  EN: FOOTER_EN,
  TR: FOOTER_TR,
  FA: FOOTER_FA,
  AR: FOOTER_AR,
  ZH: FOOTER_ZH,
  ES: FOOTER_ES,
  RU: FOOTER_RU,
};

export function getGlobalFooter(lang: LangCode): GlobalFooterContent {
  return globalFooterByLang[lang];
}
