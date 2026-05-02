import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type AboutPageBody = {
  kicker: string;
  headline: string;
  story: { title: string; paragraphs: string[] };
  mission: { title: string; body: string };
  positioning: { title: string; bullets: string[] };
};

export const aboutPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "About",
    description:
      "Sigma builds Web3 growth infrastructure—liquidity, distribution, and execution for protocols and exchanges worldwide.",
  },
  TR: {
    title: "Hakkımızda",
    description:
      "Sigma; likidite, dağıtım ve operasyonel yürütme ile protokoller ve borsalar için Web3 büyüme altyapısı sunar.",
  },
  FA: {
    title: "درباره ما",
    description:
      "سیگما زیرساخت رشد وب۳ را با تمرکز بر نقدینگی، توزیع و اجرای عملیاتی برای پروتکل‌ها و صرافی‌ها می‌سازد.",
  },
  ZH: {
    title: "关于我们",
    description: "Sigma 为协议与交易所构建 Web3 增长基础设施——流动性、分发与落地执行。",
  },
  ES: {
    title: "Acerca de",
    description:
      "Sigma impulsó infraestructura de crecimiento Web3—liquidez, distribución y ejecución para protocolos y exchanges.",
  },
  RU: {
    title: "О нас",
    description:
      "Sigma создаёт инфраструктуру роста Web3 — ликвидность, дистрибуцию и операционное исполнение для протоколов и бирж.",
  },
  AR: {
    title: "من نحن",
    description:
      "تبني سيغما بنية تحتية للنمو في Web3 — سيولة، توزيع، وتنفيذ تشغيلي للبروتوكولات ومنصات التداول.",
  },
};

export const aboutPageContentByLang: Record<LangCode, AboutPageBody> = {
  EN: {
    kicker: "Who we are",
    headline: "Infrastructure for the next era of digital markets",
    story: {
      title: "Our story",
      paragraphs: [
        "Sigma started from a simple observation: teams building in Web3 spend too much energy fighting tooling and coordination—and not enough time shipping products users love.",
        "We assembled operators, engineers, and growth specialists who have lived inside exchanges, market-making desks, and protocol teams. That cross-functional DNA shapes how we design programs: rigorous on risk, fast on execution, and transparent with partners.",
      ],
    },
    mission: {
      title: "Mission",
      body: "Help ambitious teams scale liquidity, reach credible distribution, and operate with institutional-grade reliability—without sacrificing speed.",
    },
    positioning: {
      title: "How we’re different",
      bullets: [
        "Outcome-led programs tied to measurable milestones—not vanity metrics.",
        "Operator-led delivery with senior stakeholders who stay engaged after kickoff.",
        "Infrastructure-first mindset: APIs, monitoring, and clear reporting baked in from day one.",
      ],
    },
  },
  TR: {
    kicker: "Biz kimiz",
    headline: "Dijital piyasaların bir sonraki dönemi için altyapı",
    story: {
      title: "Hikâyemiz",
      paragraphs: [
        "Sigma basit bir gözlemden doğdu: Web3 üzerinde ürün geliştiren ekipler çoğu zaman araçlara ve koordinasyona fazla, kullanıcıların seveceği ürünleri çıkarmaya ise az enerji harcıyor.",
        "Borsalarda, piyasa yapıcı masalarında ve protokol ekiplerinde yaşamış operatör, mühendis ve büyüme uzmanlarından oluştuk. Bu çapraz yetenek, programlarımızı riskte disiplinli, yürütmede hızlı ve ortaklarla şeffaf kılıyor.",
      ],
    },
    mission: {
      title: "Misyon",
      body: "Hırslı ekiplerin likiditeyi büyütmesine, güvenilir dağıtıma ulaşmasına ve kurumsal güvenilirlikle—hızdan ödün vermeden—çalışmasına yardımcı olmak.",
    },
    positioning: {
      title: "Farkımız",
      bullets: [
        "Ölçülebilir kilometre taşlarına bağlı, sonuç odaklı programlar—gösteriş metriklerine değil.",
        "Operatör liderliğinde yürütme; başlangıçtan sonra da aktif kalan kıdemli paydaşlar.",
        "Altyapı öncelikli bakış: API’ler, izleme ve net raporlama ilk günden itibaren.",
      ],
    },
  },
  FA: {
    kicker: "ما کیستیم",
    headline: "زیرساخت دوران تازه بازارهای دیجیتال",
    story: {
      title: "روایت ما",
      paragraphs: [
        "سیگما از یک مشاهده ساده شروع شد: تیم‌های وب۳ بیش از حد درگیر ابزار و هماهنگی‌اند و زمان کمتری برای ساختن محصولی می‌گذارند که کاربران عاشقش شوند.",
        "اپراتورها، مهندسان و متخصصان رشد را گرد آورده‌ایم که پشت میز بورس، نقدشوندگی و تیم‌های پروتکل زیسته‌اند. این ترکیب، طراحی برنامه‌های ما را شکل می‌دهد: سخت‌گیر در ریسک، چابک در اجرا، شفاف با همکاران.",
      ],
    },
    mission: {
      title: "مأموریت",
      body: "کمک به تیم‌های بلندپرواز برای مقیاس نقدینگی، رسیدن به توزیع معتبر و عملکرد در سطح نهادی—بدون فدا کردن سرعت.",
    },
    positioning: {
      title: "تمایز ما",
      bullets: [
        "برنامه‌های محور نتیجه با نقاط عطف قابل اندازه‌گیری—نه شاخص‌های ظاهری.",
        "تحویل با حضور اپراتورها و ذینفعان ارشد پس از آغاز همکاری.",
        "نگاه زیرساخت‌محور: API، پایش و گزارش شفاف از روز اول.",
      ],
    },
  },
  ZH: {
    kicker: "我们是谁",
    headline: "面向下一代数字市场的基础设施",
    story: {
      title: "我们的故事",
      paragraphs: [
        "Sigma 源于一个简单观察：Web3 团队在工具与协作上耗费过多精力，却把太少时间留给用户真正喜爱的产品。",
        "我们汇聚了曾在交易所、做市台与协议团队一线作战的操盘手、工程师与增长专家。跨职能基因决定了我们的方案：风险上严谨、执行上敏捷、合作上透明。",
      ],
    },
    mission: {
      title: "使命",
      body: "帮助有雄心的团队扩展流动性、建立可信分发，并以机构级可靠性运行——同时保持速度。",
    },
    positioning: {
      title: "我们的不同",
      bullets: [
        "以可衡量的里程碑为导向——而非虚荣指标。",
        "由资深操盘手交付，启动后核心干系人持续参与。",
        "基础设施优先：从第一天起就内置 API、监控与清晰报表。",
      ],
    },
  },
  ES: {
    kicker: "Quiénes somos",
    headline: "Infraestructura para la próxima era de mercados digitales",
    story: {
      title: "Nuestra historia",
      paragraphs: [
        "Sigma nació de una observación simple: los equipos Web3 dedican demasiada energía a herramientas y coordinación—y muy poca a lanzar productos que los usuarios amen.",
        "Reunimos operadores, ingenieros y especialistas en crecimiento con experiencia en exchanges, mesas de mercado y equipos de protocolo. Esa mezcla define nuestros programas: rigurosos en riesgo, rápidos en ejecución y transparentes con socios.",
      ],
    },
    mission: {
      title: "Misión",
      body: "Ayudar a equipos ambiciosos a escalar liquidez, alcanzar distribución creíble y operar con fiabilidad institucional—sin sacrificar velocidad.",
    },
    positioning: {
      title: "Qué nos distingue",
      bullets: [
        "Programas guiados por resultados con hitos medibles—no métricas vanidosas.",
        "Entrega liderada por operadores con stakeholders senior tras el arranque.",
        "Mentalidad infraestructura primero: APIs, monitorización e informes claros desde el día uno.",
      ],
    },
  },
  RU: {
    kicker: "Кто мы",
    headline: "Инфраструктура для следующей эры цифровых рынков",
    story: {
      title: "Наша история",
      paragraphs: [
        "Sigma выросла из простого наблюдения: команды Web3 тратят слишком много сил на инструменты и координацию — и слишком мало на продукты, которые полюбят пользователи.",
        "Мы собрали операторов, инженеров и специалистов по росту с опытом бирж, маркет-мейкинга и протоколов. Эта кросс-функциональная ДНК задаёт формат программ: строгость к риску, скорость исполнения и прозрачность для партнёров.",
      ],
    },
    mission: {
      title: "Миссия",
      body: "Помогать амбициозным командам масштабировать ликвидность, достигать честной дистрибуции и работать с надёжностью институционального уровня — без потери скорости.",
    },
    positioning: {
      title: "Чем мы отличаемся",
      bullets: [
        "Программы от результатов и измеримых вех — не от vanity-метрик.",
        "Операторское ведение и вовлечённость старших стейкхолдеров после старта.",
        "Инфраструктурный подход: API, мониторинг и понятная отчётность с первого дня.",
      ],
    },
  },
  AR: {
    kicker: "من نحن",
    headline: "بنية تحتية لحقبة الأسواق الرقمية القادمة",
    story: {
      title: "قصتنا",
      paragraphs: [
        "بدأت سيغما من ملاحظة بسيطة: فرق Web3 تنفق طاقة كبيرة على الأدوات والتنسيق — وزمنًا أقل على منتجات يحبها المستخدمون.",
        "جمعنا مشغّلين ومهندسين ومتخصصي نمو قضوا وقتًا داخل المنصات وفرق البروتوكول. هذه الخبرة المتداخلة تشكّل برامجنا: صارمة في المخاطر، سريعة في التنفيذ، شفافة مع الشركاء.",
      ],
    },
    mission: {
      title: "المهمة",
      body: "مساعدة الفرق الطموحة على توسيع السيولة والوصول إلى توزيع موثوق والعمل بموثوقية على مستوى المؤسسات — دون التفريط بالسرعة.",
    },
    positioning: {
      title: "ما يميزنا",
      bullets: [
        "برامج موجهة بالنتائج ومعالم قابلة للقياس — لا مقاييس صورية.",
        "تسليم بقيادة مشغّلين مع استمرار مشاركة القادة بعد الانطلاق.",
        "عقلية بنية تحتية أولاً: واجهات برمجة، مراقبة، وتقارير واضحة من اليوم الأول.",
      ],
    },
  },
};
