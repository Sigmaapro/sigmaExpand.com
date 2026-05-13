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
  AR: {
    title: "اتصل",
    description:
      "احجز مكالمة استراتيجية أو أرسل رسالة إلى سيغما: سيولة، توزيع، وتنفيذ تقني لمنصات التداول والبروتوكولات.",
  },
};

export const contactSubpageContentByLang: Record<LangCode, ContactSubpageBody> = {
  EN: {
    kicker: "Start a conversation",
    headline: "Let’s build what’s next",
    intro:
      "Tell us about your roadmap and constraints. Prefer async? Send a short brief and our team will respond with next-step options.",
    bookCall: {
      title: "Book a strategy call",
      subtitle:
        "Book a private strategy call with Sigma. We review your market, traction stage, and growth constraints before the session so the conversation starts with context.",
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
      "Yol haritanızı ve kısıtları paylaşın. Asenkron mu tercih ediyorsunuz? Kısa bir brif gönderin; ekibimiz bir sonraki adım için seçeneklerle döner.",
    bookCall: {
      title: "Strateji görüşmesi ayırın",
      subtitle:
        "Sigma ile özel bir strateji görüşmesi ayırın. Oturum öncesinde pazarınızı, çekim aşamanızı ve büyüme kısıtlarınızı değerlendiririz; böylece görüşme bağlamıyla başlar.",
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
      "نقشه راه و محدودیت‌ها را با ما در میان بگذارید. ترجیح می‌دهید غیرهمزمان؟ یک خلاصه کوتاه بفرستید تا تیم ما با گزینه‌های گام بعد پاسخ دهد.",
    bookCall: {
      title: "جلسه استراتژی رزرو کنید",
      subtitle:
        "یک تماس استراتژی خصوصی با سیگما رزرو کنید. پیش از جلسه بازار، مرحله جذب و محدودیت‌های رشد شما را بررسی می‌کنیم تا گفتگو با بافت آغاز شود.",
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
      "请说明您的路线图与约束。偏好异步沟通？发送简短需求摘要，我们将以后续步骤选项回复。",
    bookCall: {
      title: "预约战略通话",
      subtitle:
        "预约与 Sigma 的闭门策略通话。会前我们会研判您的市场、增长阶段与约束，使对话自上下文展开。",
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
      "Cuéntanos tu roadmap y restricciones. ¿Prefieres un contacto asíncrono? Envía un brief breve y el equipo responderá con opciones para el siguiente paso.",
    bookCall: {
      title: "Reserva una llamada estratégica",
      subtitle:
        "Coordinamos una sesión estratégica privada con Sigma. Antes de la reunión revisamos tu mercado, etapa de tracción y restricciones de crecimiento para que la conversación arranque con contexto.",
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
      "Расскажите о дорожной карте и ограничениях. Предпочитаете асинхронно? Отправьте краткий бриф — команда ответит вариантами следующих шагов.",
    bookCall: {
      title: "Записаться на стратегический звонок",
      subtitle:
        "Забронируйте приватный стратегический звонок с Sigma. До сессии мы разбираем ваш рынок, стадию трекшена и ограничения роста, чтобы разговор начался с контекста.",
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
  AR: {
    kicker: "ابدأ محادثة",
    headline: "لنبني ما هو قادم",
    intro:
      "صف خارطة طريقك والقيود. تفضّل التواصل غير المتزامن؟ أرسل ملخصاً موجزاً وسيرد الفريق بخيارات الخطوة التالية.",
    bookCall: {
      title: "احجز مكالمة استراتيجية",
      subtitle:
        "احجز مكالمة استراتيجية خاصة مع سيغما. قبل الجلسة نراجع سوقك ومرحلة الزخم وقيود النمو لتبدأ المحادثة منطلقة من السياق.",
      cta: "احجز مكالمة",
    },
    form: {
      title: "أرسل رسالة",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      messageLabel: "كيف يمكننا المساعدة؟",
      submit: "إرسال",
      sending: "جاري الإرسال…",
      success: "شكراً — وصلت رسالتك. سنرد قريباً.",
      validationError: "يرجى إدخال البريد ورسالة.",
      invalidEmailError: "أدخل بريداً صالحاً.",
      sendError: "حدث خطأ. أعد المحاولة أو راسلنا مباشرة.",
    },
    social: { title: "تواصل" },
  },
};
