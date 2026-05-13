/**
 * Conversion layer copy — single source of truth per locale.
 * Wire to CMS by replacing `conversionByLang` fetch/merge.
 */

import type { LangCode } from "./types";
import { ROUTES } from "./global/routes";

export type MidConversionCopy = {
  label: string;
  headline: string;
  supporting: string;
  primaryLabel: string;
  /** Primary conversion — full contact page */
  primaryHref: string;
};

export type FinalConversionCopy = {
  headline: string;
  supporting: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
};

export type BookCallModalCopy = {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successBody: string;
  closeLabel: string;
  calendlyHint: string;
  backdropCloseAria: string;
  calendlyIframeTitle: string;
  submitError: string;
  invalidEmailError: string;
  unavailableError: string;
};

export type ConversionBundle = {
  mid: MidConversionCopy;
  final: FinalConversionCopy;
  bookCall: BookCallModalCopy;
};

const EN_MID: MidConversionCopy = {
  label: "READY TO SCALE",
  headline: "Start Scaling with Sigma",
  supporting:
    "Access a structured growth system built for Web3 execution — from acquisition surfaces to liquidity checkpoints.",
  primaryLabel: "Get Access",
  primaryHref: ROUTES.contact,
};

const EN_FINAL: FinalConversionCopy = {
  headline: "Build Growth That Actually Converts",
  supporting:
    "From user acquisition to liquidity, Sigma connects the full system. Brief the desk and we will map the shortest path to measurable throughput.",
  primaryLabel: "Work With Sigma",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Book a Call",
};

const EN_BOOK: BookCallModalCopy = {
  title: "Book a call",
  subtitle:
    "Share your details — we will confirm a time or follow up within one business day.",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message (optional)",
  submitLabel: "Send request",
  sendingLabel: "Sending…",
  successTitle: "Request received",
  successBody: "Thank you. A member of the team will reach out shortly.",
  closeLabel: "Close",
  calendlyHint: "Pick a slot that fits your calendar.",
  backdropCloseAria: "Close dialog",
  calendlyIframeTitle: "Calendly scheduling",
  submitError:
    "We could not send your request. Please try again or reach out by email.",
  invalidEmailError: "Please enter a valid email address.",
  unavailableError:
    "Requests are temporarily unavailable. Please try again later.",
};

const enBundle: ConversionBundle = {
  mid: EN_MID,
  final: EN_FINAL,
  bookCall: EN_BOOK,
};

const trBundle: ConversionBundle = {
  mid: {
    label: "ÖLÇEKLEMEYE HAZIR",
    headline: "Sigma ile Ölçeklenmeye Başlayın",
    supporting:
      "Web3 yürütmesi için tasarlanmış yapılandırılmış bir büyüme sistemine erişin.",
    primaryLabel: "Erişim Al",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Gerçekten Dönüşen Büyüme İnşa Edin",
    supporting:
      "Kullanıcı ediniminden likiditeye kadar Sigma tüm sistemi birbirine bağlar.",
    primaryLabel: "Sigma ile Çalış",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Görüşme Planla",
  },
  bookCall: {
    title: "Görüşme planla",
    subtitle:
      "Bilgilerinizi paylaşın — bir zaman onayı veya bir iş günü içinde dönüş alırsınız.",
    nameLabel: "Ad",
    emailLabel: "E-posta",
    messageLabel: "Mesaj (isteğe bağlı)",
    submitLabel: "Talep gönder",
    sendingLabel: "Gönderiliyor…",
    successTitle: "Talep alındı",
    successBody: "Teşekkürler. Ekibimiz kısa süre içinde ulaşacak.",
    closeLabel: "Kapat",
    calendlyHint: "Takviminize uygun bir zaman seçin.",
    backdropCloseAria: "Diyaloğu kapat",
    calendlyIframeTitle: "Calendly planlama",
    submitError: "Talep gönderilemedi. Lütfen tekrar deneyin.",
    invalidEmailError: "Lütfen geçerli bir e-posta adresi girin.",
    unavailableError: "Talepler geçici olarak kullanılamıyor.",
  },
};

const zhBundle: ConversionBundle = {
  mid: {
    label: "准备扩展",
    headline: "与 Sigma 一起开始扩展",
    supporting: "访问为 Web3 执行构建的结构化增长系统。",
    primaryLabel: "获取权限",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "构建真正可转化的增长",
    supporting: "从获客到流动性，Sigma 连接完整系统。",
    primaryLabel: "与 Sigma 合作",
    primaryHref: ROUTES.contact,
    secondaryLabel: "预约通话",
  },
  bookCall: {
    title: "预约通话",
    subtitle: "留下您的信息，我们将在一个工作日内确认时间或回复。",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    messageLabel: "留言（可选）",
    submitLabel: "发送请求",
    sendingLabel: "发送中…",
    successTitle: "请求已收到",
    successBody: "感谢。团队成员将尽快联系您。",
    closeLabel: "关闭",
    calendlyHint: "选择适合您日程的时间。",
    backdropCloseAria: "关闭对话框",
    calendlyIframeTitle: "Calendly 预约",
    submitError: "请求发送失败，请稍后重试。",
    invalidEmailError: "请输入有效邮箱地址。",
    unavailableError: "请求暂不可用，请稍后再试。",
  },
};

const faBundle: ConversionBundle = {
  mid: {
    label: "آماده مقیاس‌دهی",
    headline: "با سیگما مقیاس دهید",
    supporting:
      "به یک سیستم رشد ساختاریافته برای اجرای Web3 دسترسی پیدا کنید.",
    primaryLabel: "دریافت دسترسی",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "رشد واقعی و قابل تبدیل بسازید",
    supporting:
      "از جذب کاربر تا نقدینگی، سیگما کل سیستم را به هم متصل می‌کند.",
    primaryLabel: "همکاری با سیگما",
    primaryHref: ROUTES.contact,
    secondaryLabel: "رزرو تماس",
  },
  bookCall: {
    title: "رزرو تماس",
    subtitle:
      "اطلاعات خود را ثبت کنید؛ زمان مناسب هماهنگ می‌شود یا ظرف یک روز کاری پاسخ می‌گیرید.",
    nameLabel: "نام",
    emailLabel: "ایمیل",
    messageLabel: "پیام (اختیاری)",
    submitLabel: "ارسال درخواست",
    sendingLabel: "در حال ارسال…",
    successTitle: "درخواست دریافت شد",
    successBody: "سپاسگزاریم. یکی از اعضای تیم به‌زودی با شما تماس می‌گیرد.",
    closeLabel: "بستن",
    calendlyHint: "یک زمان مناسب از تقویم انتخاب کنید.",
    backdropCloseAria: "بستن پنجره",
    calendlyIframeTitle: "زمان‌بندی Calendly",
    submitError: "ارسال درخواست ممکن نشد. دوباره تلاش کنید.",
    invalidEmailError: "لطفاً ایمیل معتبر وارد کنید.",
    unavailableError: "ثبت درخواست موقتاً در دسترس نیست.",
  },
};

const arBundle: ConversionBundle = {
  mid: {
    label: "جاهزون للتوسّع",
    headline: "ابدأ التوسّع مع سيغما",
    supporting:
      "استخدم نظام نمو منظمًا مصمماً لتنفيذ Web3 — من سطح الاكتساس إلى نقاط السيولة.",
    primaryLabel: "احصل على وصول",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "ابنِ نموًا يتحول فعلياً",
    supporting:
      "من جذب المستخدمين إلى السيولة، تربط سيغما النظام بالكامل. قدّم الإحاطة وسنرسم أقصر مسار لنتائج قابلة للقياس.",
    primaryLabel: "اعمل مع سيغما",
    primaryHref: ROUTES.contact,
    secondaryLabel: "احجز مكالمة",
  },
  bookCall: {
    title: "احجز مكالمة",
    subtitle:
      "شاركنا بياناتك — نؤكد الموعد أو نرد خلال يوم عمل واحد.",
    nameLabel: "الاسم",
    emailLabel: "البريد الإلكتروني",
    messageLabel: "رسالة (اختياري)",
    submitLabel: "إرسال الطلب",
    sendingLabel: "جاري الإرسال…",
    successTitle: "تم استلام الطلب",
    successBody: "شكراً لك. سيتواصل معك أحد أعضاء الفريق قريباً.",
    closeLabel: "إغلاق",
    calendlyHint: "اختر وقتاً يناسب جدولك.",
    backdropCloseAria: "إغلاق الحوار",
    calendlyIframeTitle: "جدولة عبر Calendly",
    submitError: "تعذّر إرسال الطلب. حاول مجدداً أو راسلنا عبر البريد.",
    invalidEmailError: "يرجى إدخال بريد إلكتروني صالح.",
    unavailableError: "الطلبات غير متاحة مؤقتاً. حاول لاحقاً.",
  },
};

const esBundle: ConversionBundle = {
  mid: {
    label: "LISTO PARA ESCALAR",
    headline: "Empieza a escalar con Sigma",
    supporting:
      "Accede a un sistema de crecimiento estructurado para ejecución en Web3.",
    primaryLabel: "Obtener acceso",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Construye crecimiento que sí convierte",
    supporting:
      "Desde adquisición de usuarios hasta liquidez, Sigma conecta todo el sistema.",
    primaryLabel: "Trabajar con Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Reservar llamada",
  },
  bookCall: {
    title: "Reservar una llamada",
    subtitle:
      "Comparte tus datos y confirmaremos un horario o responderemos en un día hábil.",
    nameLabel: "Nombre",
    emailLabel: "Correo",
    messageLabel: "Mensaje (opcional)",
    submitLabel: "Enviar solicitud",
    sendingLabel: "Enviando…",
    successTitle: "Solicitud recibida",
    successBody: "Gracias. Un miembro del equipo te contactará pronto.",
    closeLabel: "Cerrar",
    calendlyHint: "Elige un horario que encaje con tu agenda.",
    backdropCloseAria: "Cerrar diálogo",
    calendlyIframeTitle: "Agenda de Calendly",
    submitError: "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
    invalidEmailError: "Introduce un correo válido.",
    unavailableError: "Las solicitudes no están disponibles temporalmente.",
  },
};

const ruBundle: ConversionBundle = {
  mid: {
    label: "ГОТОВЫ К МАСШТАБУ",
    headline: "Начните масштабирование с Sigma",
    supporting:
      "Получите доступ к структурированной growth-системе для Web3-исполнения.",
    primaryLabel: "Получить доступ",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Стройте рост, который действительно конвертирует",
    supporting:
      "От привлечения пользователей до ликвидности — Sigma соединяет всю систему.",
    primaryLabel: "Работать с Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Забронировать звонок",
  },
  bookCall: {
    title: "Забронировать звонок",
    subtitle:
      "Оставьте контакты — мы подтвердим время или ответим в течение одного рабочего дня.",
    nameLabel: "Имя",
    emailLabel: "Email",
    messageLabel: "Сообщение (необязательно)",
    submitLabel: "Отправить запрос",
    sendingLabel: "Отправка…",
    successTitle: "Запрос получен",
    successBody: "Спасибо. Команда свяжется с вами в ближайшее время.",
    closeLabel: "Закрыть",
    calendlyHint: "Выберите удобный слот в календаре.",
    backdropCloseAria: "Закрыть диалог",
    calendlyIframeTitle: "Планирование Calendly",
    submitError: "Не удалось отправить запрос. Попробуйте снова.",
    invalidEmailError: "Введите корректный email.",
    unavailableError: "Запросы временно недоступны.",
  },
};

export const conversionByLang: Record<LangCode, ConversionBundle> = {
  EN: enBundle,
  TR: trBundle,
  ZH: zhBundle,
  FA: faBundle,
  AR: arBundle,
  ES: esBundle,
  RU: ruBundle,
};

export function getConversion(lang: LangCode): ConversionBundle {
  return conversionByLang[lang] ?? conversionByLang.EN;
}

/** @deprecated Prefer `getConversion(lang).mid` in components */
export const midConversionCta: MidConversionCopy = EN_MID;

/** @deprecated Prefer `getConversion(lang).final` */
export const finalConversionCta: FinalConversionCopy = EN_FINAL;

/** @deprecated Prefer `getConversion(lang).bookCall` */
export const bookCallModalCopy: BookCallModalCopy = EN_BOOK;
