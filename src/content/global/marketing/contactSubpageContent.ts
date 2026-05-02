import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type ContactSubpageBody = {
  kicker: string;
  headline: string;
  intro: string;
  bookCall: { title: string; subtitle: string; cta: string };
  form: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submit: string;
    sending: string;
    success: string;
    validationError: string;
    invalidEmailError: string;
    sendError: string;
  };
  social: { title: string };
};

export const contactSubpageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "Contact",
    description:
      "Book a strategy call or send a message to Sigma. We help exchanges and protocols with liquidity, distribution, and technical execution.",
  },
  TR: {
    title: "İletişim",
    description:
      "Strateji görüşmesi ayırın veya Sigma’ya mesaj gönderin. Borsalar ve protokoller için likidite, dağıtım ve teknik yürütme.",
  },
  FA: {
    title: "تماس",
    description:
      "جلسه استراتژی رزرو کنید یا برای سیگما پیام بفرستید—نقدینگی، توزیع و اجرای فنی برای صرافی‌ها و پروتکل‌ها.",
  },
  ZH: {
    title: "联系",
    description: "预约战略通话或留言联系 Sigma。我们为交易所与协议提供流动性、分发与技术落地。",
  },
  ES: {
    title: "Contacto",
    description:
      "Reserva una llamada estratégica o envía un mensaje a Sigma: liquidez, distribución y ejecución técnica.",
  },
  RU: {
    title: "Контакты",
    description:
      "Запишитесь на стратегический звонок или напишите Sigma: ликвидность, дистрибуция и техническое исполнение.",
  },
};

export const contactSubpageContentByLang: Record<LangCode, ContactSubpageBody> = {
  EN: {
    kicker: "Start a conversation",
    headline: "Let’s build what’s next",
    intro:
      "Tell us about your roadmap and constraints. For structured discovery, book a call—we’ll come prepared with relevant benchmarks and options.",
    bookCall: {
      title: "Book a strategy call",
      subtitle:
        "Reserve time with our team. If Calendly is configured, you’ll see live availability; otherwise we’ll follow up by email.",
      cta: "Book a call",
    },
    form: {
      title: "Send a message",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "How can we help?",
      submit: "Send message",
      sending: "Sending…",
      success: "Thanks—your message is on its way. We’ll reply shortly.",
      validationError: "Please enter your email and a message.",
      invalidEmailError: "Enter a valid email address.",
      sendError: "Something went wrong. Try again or email us directly.",
    },
    social: { title: "Connect" },
  },
  TR: {
    kicker: "Konuşma başlatın",
    headline: "Bir sonrakini birlikte kuralım",
    intro:
      "Yol haritanızı ve kısıtları paylaşın. Yapılandırılmış keşif için görüşme ayırın—ilgili kıyaslar ve seçeneklerle geliriz.",
    bookCall: {
      title: "Strateji görüşmesi ayırın",
      subtitle:
        "Ekibimizle zaman ayırın. Calendly yapılandırıldıysa müsaitlik görünür; değilse e-posta ile döneriz.",
      cta: "Görüşme ayır",
    },
    form: {
      title: "Mesaj gönderin",
      nameLabel: "Ad",
      emailLabel: "E-posta",
      messageLabel: "Size nasıl yardımcı olabiliriz?",
      submit: "Mesajı gönder",
      sending: "Gönderiliyor…",
      success: "Teşekkürler—mesajınız yolda. Kısa sürede döneriz.",
      validationError: "Lütfen e-posta ve mesaj girin.",
      invalidEmailError: "Geçerli bir e-posta girin.",
      sendError: "Bir sorun oluştu. Tekrar deneyin veya doğrudan e-posta gönderin.",
    },
    social: { title: "Bağlan" },
  },
  FA: {
    kicker: "گفتگو را شروع کنید",
    headline: "بسازیم آنچه پیش روست",
    intro:
      "نقشه راه و محدودیت‌ها را بگویید. برای کشف ساخت‌یافته، جلسه رزرو کنید—با معیارها و گزینه‌های مرتبه می‌آییم.",
    bookCall: {
      title: "جلسه استراتژی رزرو کنید",
      subtitle:
        "زمان تیم را رزرو کنید. اگر Calendly تنظیم باشد دسترسی زنده دیده می‌شود؛ وگرنه با ایمیل پیگیری می‌کنیم.",
      cta: "رزرو تماس",
    },
    form: {
      title: "ارسال پیام",
      nameLabel: "نام",
      emailLabel: "ایمیل",
      messageLabel: "چطور می‌توانیم کمک کنیم؟",
      submit: "ارسال پیام",
      sending: "در حال ارسال…",
      success: "متشکرم—پیام شما در راه است. به‌زودی پاسخ می‌دهیم.",
      validationError: "ایمیل و پیام را وارد کنید.",
      invalidEmailError: "یک ایمیل معتبر وارد کنید.",
      sendError: "خطایی رخ داد. دوباره تلاش کنید یا مستقیم ایمیل بزنید.",
    },
    social: { title: "ارتباط" },
  },
  ZH: {
    kicker: "开始对话",
    headline: "共建下一步",
    intro:
      "告诉我们您的路线图与约束。若要结构化调研，请预约通话——我们会带上相关基准与选项。",
    bookCall: {
      title: "预约战略通话",
      subtitle:
        "预留团队时间。若已配置 Calendly 将显示实时空闲；否则我们通过邮件跟进。",
      cta: "预约通话",
    },
    form: {
      title: "发送消息",
      nameLabel: "姓名",
      emailLabel: "邮箱",
      messageLabel: "我们如何帮助您？",
      submit: "发送消息",
      sending: "发送中…",
      success: "感谢——消息已送出，我们会尽快回复。",
      validationError: "请输入邮箱和消息。",
      invalidEmailError: "请输入有效邮箱。",
      sendError: "出现问题，请重试或直接发邮件。",
    },
    social: { title: "连接" },
  },
  ES: {
    kicker: "Inicia una conversación",
    headline: "Construyamos lo próximo",
    intro:
      "Cuéntanos tu roadmap y restricciones. Para un discovery estructurado, reserva una llamada—llegamos con benchmarks y opciones.",
    bookCall: {
      title: "Reserva una llamada estratégica",
      subtitle:
        "Aparta tiempo con el equipo. Si Calendly está configurado verás disponibilidad; si no, seguimos por email.",
      cta: "Reservar llamada",
    },
    form: {
      title: "Enviar mensaje",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      messageLabel: "¿Cómo podemos ayudarte?",
      submit: "Enviar",
      sending: "Enviando…",
      success: "Gracias—tu mensaje está en camino. Respondemos pronto.",
      validationError: "Introduce correo y mensaje.",
      invalidEmailError: "Introduce un correo válido.",
      sendError: "Algo salió mal. Reintenta o escríbenos directamente.",
    },
    social: { title: "Conectar" },
  },
  RU: {
    kicker: "Начать диалог",
    headline: "Создадим следующий шаг",
    intro:
      "Расскажите о дорожной карте и ограничениях. Для структурированного discovery забронируйте звонок—приведём бенчмарки и сценарии.",
    bookCall: {
      title: "Записаться на стратегический звонок",
      subtitle:
        "Забронируйте время команды. Если настроен Calendly—увидите слоты; иначе свяжемся по email.",
      cta: "Записаться",
    },
    form: {
      title: "Отправить сообщение",
      nameLabel: "Имя",
      emailLabel: "Email",
      messageLabel: "Чем помочь?",
      submit: "Отправить",
      sending: "Отправка…",
      success: "Спасибо—сообщение отправлено. Скоро ответим.",
      validationError: "Введите email и сообщение.",
      invalidEmailError: "Введите корректный email.",
      sendError: "Что-то пошло не так. Повторите или напишите напрямую.",
    },
    social: { title: "Связь" },
  },
};
