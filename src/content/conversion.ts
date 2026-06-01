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
  label: "PROOF IN NUMBERS",
  headline: "Execution That Moves Users, Volume, and Reach",
  supporting:
    "Figures reflect aggregated network activity. Past performance is not indicative of future results.",
  primaryLabel: "Partner with Sigma",
  primaryHref: ROUTES.contact,
};

const EN_FINAL: FinalConversionCopy = {
  headline: "Build Growth That Actually Converts",
  supporting:
    "From user acquisition to liquidity, Sigma connects the full system across crypto, forex, stocks, and Web3. Brief the desk and we'll map the shortest path to measurable throughput.",
  primaryLabel: "Partner with Sigma",
  primaryHref: ROUTES.contact,
  secondaryLabel: "Request a Growth Consultation",
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
    label: "SAYILARLA KANIT",
    headline: "Kullanıcıları, Hacmi ve Erişimi Hareket Ettiren Yürütme",
    supporting:
      "Rakamlar toplam ağ aktivitesini yansıtır. Geçmiş performans gelecekteki sonuçların göstergesi değildir.",
    primaryLabel: "Sigma ile Ortak Olun",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Gerçekten Dönüşen Büyüme İnşa Edin",
    supporting:
      "Kullanıcı ediniminden likiditeye kadar Sigma; kripto, forex, hisse ve Web3 genelinde tüm sistemi birbirine bağlar. Masaya brief verin, ölçülebilir throughput için en kısa yolu birlikte çizelim.",
    primaryLabel: "Sigma ile Ortak Olun",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Büyüme Danışmanlığı Talep Edin",
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
    label: "数据证明",
    headline: "推动用户、交易量与覆盖面的执行能力",
    supporting: "数据反映网络汇总活动。过往表现不代表未来结果。",
    primaryLabel: "与 Sigma 合作",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "构建真正可转化的增长",
    supporting:
      "从获客到流动性，Sigma 在加密、外汇、股票与 Web3 领域连接完整系统。提交需求，我们将规划最短的可衡量产出路径。",
    primaryLabel: "与 Sigma 合作",
    primaryHref: ROUTES.contact,
    secondaryLabel: "申请增长咨询",
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
    label: "اثبات در اعداد",
    headline: "اجرایی که کاربران، حجم و گستره را حرکت می‌دهد",
    supporting:
      "ارقام بازتاب فعالیت تجمیعی شبکه است. عملکرد گذشته نشان‌دهنده نتایج آینده نیست.",
    primaryLabel: "همکاری با Sigma",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "رشدی بسازید که واقعاً تبدیل می‌شود",
    supporting:
      "از جذب کاربر تا نقدینگی، Sigma کل سیستم را در crypto، forex، سهام و Web3 به هم متصل می‌کند. brief دهید تا کوتاه‌ترین مسیر به throughput قابل اندازه‌گیری را ترسیم کنیم.",
    primaryLabel: "همکاری با Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "درخواست مشاوره رشد",
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
    label: "أدلة بالأرقام",
    headline: "تنفيذ يحرّك المستخدمين والحجم والوصول",
    supporting:
      "الأرقام تعكس نشاط الشبكة المجمّع. الأداء السابق لا يدل على النتائج المستقبلية.",
    primaryLabel: "شارك مع Sigma",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "ابنِ نموًا يتحول فعلياً",
    supporting:
      "من اكتساب المستخدمين إلى السيولة، تربط Sigma النظام بالكامل عبر crypto وforex والأسهم وWeb3. قدّم الإحاطة وسنرسم أقصر مسار لنتائج قابلة للقياس.",
    primaryLabel: "شارك مع Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "اطلب استشارة نمو",
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
    label: "PRUEBA EN NÚMEROS",
    headline: "Ejecución que mueve usuarios, volumen y alcance",
    supporting:
      "Las cifras reflejan la actividad agregada de la red. El rendimiento pasado no garantiza resultados futuros.",
    primaryLabel: "Asociarse con Sigma",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Construye crecimiento que sí convierte",
    supporting:
      "Desde adquisición hasta liquidez, Sigma conecta el sistema completo en crypto, forex, acciones y Web3. Envíe el brief y trazaremos el camino más corto a resultados medibles.",
    primaryLabel: "Asociarse con Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Solicitar consultoría de crecimiento",
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
    label: "ДОКАЗАТЕЛЬСТВО В ЦИФРАХ",
    headline: "Исполнение, которое двигает пользователей, объём и охват",
    supporting:
      "Цифры отражают агрегированную активность сети. Прошлые результаты не гарантируют будущих.",
    primaryLabel: "Стать партнёром Sigma",
    primaryHref: ROUTES.contact,
  },
  final: {
    headline: "Стройте рост, который действительно конвертирует",
    supporting:
      "От привлечения до ликвидности Sigma соединяет всю систему в crypto, forex, акциях и Web3. Опишите задачу — мы наметим кратчайший путь к измеримому throughput.",
    primaryLabel: "Стать партнёром Sigma",
    primaryHref: ROUTES.contact,
    secondaryLabel: "Запросить консультацию по росту",
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
