import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type FaqItem = { question: string; answer: string };

export type FaqMarketingBody = {
  kicker: string;
  headline: string;
  intro: string;
  items: FaqItem[];
};

export const faqPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "FAQ",
    description:
      "Answers to common questions about Sigma’s engagement model, timelines, regions, and how we work with protocols and exchanges.",
  },
  TR: {
    title: "SSS",
    description:
      "Sigma ile çalışma modeli, süreler, bölgeler ve protokol/borsa işbirliği hakkında sık sorulan sorular.",
  },
  FA: {
    title: "سوالات متداول",
    description:
      "پاسخ به پرسش‌های رایج درباره مدل همکاری، زمان‌بندی، مناطق و نحوه کار سیگما با پروتکل‌ها و صرافی‌ها.",
  },
  ZH: {
    title: "常见问题",
    description: "关于 Sigma 合作模式、周期、地区以及与协议和交易所协作方式的常见问题解答。",
  },
  ES: {
    title: "FAQ",
    description:
      "Respuestas sobre el modelo de trabajo con Sigma, plazos, regiones y colaboración con protocolos y exchanges.",
  },
  RU: {
    title: "FAQ",
    description:
      "Ответы о модели работы со Sigma, сроках, регионах и сотрудничестве с протоколами и биржами.",
  },
  AR: {
    title: "الأسئلة الشائعة",
    description:
      "إجابات عن نموذج التعاون مع سيغما، الجداول الزمنية، المناطق، وطريقة عملنا مع البروتوكولات ومنصات التداول.",
  },
};

export const faqPageContentByLang: Record<LangCode, FaqMarketingBody> = {
  EN: {
    kicker: "Help",
    headline: "Frequently asked questions",
    intro:
      "If you don’t see your question here, reach out via the contact page—we respond to serious inquiries quickly.",
    items: [
      {
        question: "What kinds of teams do you work with?",
        answer:
          "We primarily partner with crypto exchanges, infrastructure protocols, and growth-stage Web3 products that need liquidity, distribution, or technical execution at scale. If your roadmap touches markets or institutional stakeholders, we’re likely a fit.",
      },
      {
        question: "How do engagements typically start?",
        answer:
          "Most projects begin with a focused discovery phase: goals, constraints, jurisdictions, and success metrics. From there we propose a phased plan with clear milestones rather than open-ended retainers.",
      },
      {
        question: "Do you work globally?",
        answer:
          "Yes. We coordinate across time zones and tailor compliance and operational detail to the regions you operate in. Specific regulatory advice may require your counsel—we collaborate closely with your legal team.",
      },
      {
        question: "What should we prepare before the first call?",
        answer:
          "Product context, target markets, current metrics (even rough), and any hard deadlines such as listings or launches. The more concrete the goals, the faster we can recommend a path.",
      },
      {
        question: "How do we measure success?",
        answer:
          "We align on quantitative targets up front—liquidity depth, volume bands, acquisition costs, retention, or technical reliability—plus qualitative checkpoints with your stakeholders.",
      },
    ],
  },
  TR: {
    kicker: "Yardım",
    headline: "Sık sorulan sorular",
    intro:
      "Sorunuzu burada görmüyorsanız iletişim sayfasından yazın—ciddi taleplere hızlı dönüş yaparız.",
    items: [
      {
        question: "Hangi ekiplerle çalışıyorsunuz?",
        answer:
          "Öncelikle kripto borsaları, altyapı protokolleri ve ölçekte likidite, dağıtım veya teknik yürütme gereken Web3 ürünleriyle ortaklık kuruyoruz.",
      },
      {
        question: "Çalışmalar genelde nasıl başlar?",
        answer:
          "Çoğu proje odaklı bir keşif fazıyla başlar: hedefler, kısıtlar, hukuk bölgeleri ve başarı metrikleri. Ardından süresiz retainer yerine kilometre taşlı fazlı plan öneririz.",
      },
      {
        question: "Küresel çalışıyor musunuz?",
        answer:
          "Evet. Saat dilimleri arasında koordinasyon kurar, bölgelerinize uygun uyum ve operasyon detayını özelleştiririz. Özel düzenleyici tavsiye için hukuk danışmanınız gerekebilir.",
      },
      {
        question: "İlk görüşmeden önce ne hazırlamalıyız?",
        answer:
          "Ürün bağlamı, hedef pazarlar, güncel metrikler (kabaca bile olsa) ve listeleme/lansman gibi kesin tarihler. Hedefler ne kadar somut olursa yol o kadar hızlı netleşir.",
      },
      {
        question: "Başarıyı nasıl ölçüyoruz?",
        answer:
          "Likidite derinliği, hacim bantları, edinim maliyeti, tutma veya teknik güvenilirlik gibi sayısal hedefleri başta hizalarız; niteliksel kontroller de paydaşlarınızla yapılır.",
      },
    ],
  },
  FA: {
    kicker: "راهنما",
    headline: "سوالات پرتکرار",
    intro:
      "پاسخ خود را اینجا نمی‌بینید؟ از صفحه تماس بنویسید—به درخواست‌های جدی سریع پاسخ می‌دهیم.",
    items: [
      {
        question: "با چه تیم‌هایی کار می‌کنید؟",
        answer:
          "عمدتاً با صرافی‌های ارز دیجیتال، پروتکل‌های زیرساخت و محصولات وب۳ در مرحله رشد که به نقدینگی، توزیع یا اجرای فنی در مقیاس نیاز دارند.",
      },
      {
        question: "همکاری‌ها معمولاً چطور شروع می‌شود؟",
        answer:
          "بیشتر پروژه‌ها با فاز کشف متمرکز آغاز می‌شود: اهداف، محدودیت‌ها، حوزه‌های حقوقی و معیار موفقیت. سپس برنامه فازی با نقاط عطف روشن پیشنهاد می‌شود.",
      },
      {
        question: "به‌صورت جهانی کار می‌کنید؟",
        answer:
          "بله. در بازه‌های زمانی مختلف هماهنگ می‌کنیم و جزئیات انطباق و عملیات را متناسب با مناطق شما تنظیم می‌کنیم. برای مشاوره تنظیم‌گری تخصصی ممکن است وکیل شما لازم باشد.",
      },
      {
        question: "قبل از اولین تماس چه آماده کنیم؟",
        answer:
          "زمینه محصول، بازارهای هدف، معیارهای فعلی (حتی تقریبی) و هر ضرب‌الاجل سخت مانند لیستینگ یا لانچ. هرچه اهداف مشخص‌تر باشد، مسیر سریع‌تر پیشنهاد می‌شود.",
      },
      {
        question: "موفقیت را چطور می‌سنجیم؟",
        answer:
          "در ابتدا اهداف کمی را هم‌راستا می‌کنیم—عمق نقدینگی، باندهای حجم، هزینه جذب، نگهداشت یا قابلیت اطمینان فنی—به‌علاوه نقاط کنترلی کیفی با ذینفعان شما.",
      },
    ],
  },
  ZH: {
    kicker: "帮助",
    headline: "常见问题",
    intro: "若未找到答案，请通过联系页面联系我们——我们会尽快回复严肃咨询。",
    items: [
      {
        question: "你们与哪些团队合作？",
        answer:
          "主要合作对象包括加密交易所、基础设施协议，以及需要规模化流动性、分发或技术执行的成长期 Web3 产品。",
      },
      {
        question: "合作通常如何启动？",
        answer:
          "多数项目从聚焦的发现阶段开始：目标、约束、司法辖区与成功指标。随后提出分阶段、里程碑清晰的方案，而非开放式顾问费。",
      },
      {
        question: "是否全球协作？",
        answer:
          "是。我们跨时区协调，并按您运营地区定制合规与运营细节。具体监管意见可能需要您的法律顾问——我们会与法务团队紧密配合。",
      },
      {
        question: "首次通话前应准备什么？",
        answer:
          "产品背景、目标市场、当前指标（哪怕粗略）以及上市或发布等硬性时间节点。目标越具体，路线越快清晰。",
      },
      {
        question: "如何衡量成功？",
        answer:
          "事先对齐量化目标——流动性深度、成交量区间、获客成本、留存或技术可靠性——并与您的利益相关方设定定性检查点。",
      },
    ],
  },
  ES: {
    kicker: "Ayuda",
    headline: "Preguntas frecuentes",
    intro:
      "Si no aparece tu duda, escríbenos desde contacto—respondemos rápido a solicitudes serias.",
    items: [
      {
        question: "¿Con qué equipos trabajan?",
        answer:
          "Principalmente exchanges, protocolos de infraestructura y productos Web3 en crecimiento que necesitan liquidez, distribución o ejecución técnica a escala.",
      },
      {
        question: "¿Cómo empiezan los proyectos?",
        answer:
          "Suelen iniciar con una fase de descubrimiento: objetivos, restricciones, jurisdicciones y métricas. Luego proponemos un plan por fases con hitos claros.",
      },
      {
        question: "¿Trabajan globalmente?",
        answer:
          "Sí. Coordinamos zonas horarias y adaptamos cumplimiento y operaciones a tus regiones. Para asesoría regulatoria específica puede intervenir tu asesor legal.",
      },
      {
        question: "¿Qué preparar antes de la primera llamada?",
        answer:
          "Contexto del producto, mercados objetivo, métricas actuales (aunque sean aproximadas) y fechas críticas como listings o lanzamientos.",
      },
      {
        question: "¿Cómo medimos el éxito?",
        answer:
          "Alineamos objetivos cuantitativos—profundidad de liquidez, rangos de volumen, coste de adquisición, retención o fiabilidad técnica—y revisiones cualitativas con stakeholders.",
      },
    ],
  },
  RU: {
    kicker: "Помощь",
    headline: "Частые вопросы",
    intro:
      "Не нашли ответ — напишите через контакты: серьёзным запросам отвечаем быстро.",
    items: [
      {
        question: "С какими командами вы работаете?",
        answer:
          "В основном с биржами, инфраструктурными протоколами и растущими Web3-продуктам, которым нужны ликвидность, дистрибуция или техническое исполнение в масштабе.",
      },
      {
        question: "Как обычно стартуют проекты?",
        answer:
          "Через фазу discovery: цели, ограничения, юрисдикции и метрики успеха. Затем — поэтапный план с понятными вехами вместо бесконечного ретейнера.",
      },
      {
        question: "Работаете ли вы глобально?",
        answer:
          "Да. Согласуем часовые пояса и подстраиваем комплаенс и операции под ваши регионы. Узкое регуляторное мнение — зона вашего юриста.",
      },
      {
        question: "Что подготовить к первому звонку?",
        answer:
          "Контекст продукта, целевые рынки, текущие метрики (хотя бы оценочно) и жёсткие дедлайны — листинги, запуски и т.п.",
      },
      {
        question: "Как измеряем успех?",
        answer:
          "Сначала договариваемся о численных целях — глубина ликвидности, объёмы, стоимость привлечения, удержание или техническая надёжность — и качественных чекпойнтах со стейкхолдерами.",
      },
    ],
  },
  AR: {
    kicker: "مساعدة",
    headline: "الأسئلة الشائعة",
    intro:
      "إن لم تجد إجابتك هنا، تواصل عبر صفحة الاتصال — نرد بسرعة على الاستفسارات الجادة.",
    items: [
      {
        question: "مع أي فرق تعملون؟",
        answer:
          "نشارك أساساً منصات تداول العملات الرقمية وبروتوكولات البنية التحتية ومنتجات Web3 النامية التي تحتاج سيولة أو توزيعاً أو تنفيذاً تقنياً على نطاق واسع.",
      },
      {
        question: "كيف تبدأ المشاريع عادةً؟",
        answer:
          "تبدأ بمرحلة استكشاف مركزة: الأهداف والقيود والاختصاصات ومؤشرات النجاح. ثم نعرض خطة مراحل بمعالم واضحة بدلاشتراكات مفتوحة.",
      },
      {
        question: "هل تعملون عالمياً؟",
        answer:
          "نعم. ننسّق بين المناطق الزمنية وننسّق الامتثال والتشغيل مع المناطق التي تعملون فيها. قد يحتاج الرأي التنظيمي الدقيق إلى مستشاركم القانوني.",
      },
      {
        question: "ماذا نجهّز قبل أول اتصال؟",
        answer:
          "سياق المنتج، الأسواق المستهدفة، المقاييس الحالية (حتى التقريبية)، وأي مواعيد حاسمة مثل الإدراج أو الإطلاق.",
      },
      {
        question: "كيف نقيس النجاح؟",
        answer:
          "نوائم أهدافاً كمّية مسبقاً—عمق السيولة، نطاقات الحجم، تكلفة الاكتساس، الاحتفاظ، أو الموثوقية التقنية—مع نقاط مراجعة نوعية مع أصحاب المصلحة.",
      },
    ],
  },
};
