import type { LangCode, SiteTranslations, UiStrings } from "./types";

/** Homepage bundle slice — `composeSiteTranslations` merges `mobileNavSheet` + `languageSwitcherCompact` into `ui`. */
export type SiteRest = Omit<SiteTranslations, "hero" | "services" | "heroCarousel" | "ui"> & {
  ui: Omit<UiStrings, "mobileNavSheet" | "languageSwitcherCompact">;
};

const livePanelEN = {
  panelTitle: "Live Support",
  panelSubtitle: "Talk to Sigma support",
  panelAriaLabel: "Live support panel",
  closeAria: "Close support panel",
  namePlaceholder: "Name (optional)",
  emailPlaceholder: "Email",
  messagePlaceholder: "How can Sigma support help you?",
  submit: "Start Conversation",
  submitSending: "Sending...",
  successBody: "Message sent. Our team will reach out shortly.",
  footerNote: "Our team will respond as soon as possible.",
  validationError: "Please enter your email and message.",
  invalidEmailError: "Please enter a valid email address.",
  sendError: "Could not start support chat. Please try again.",
} as const;

const livePanelTR = {
  panelTitle: "Canlı Destek",
  panelSubtitle: "Sigma desteğiyle konuşun",
  panelAriaLabel: "Canlı destek paneli",
  closeAria: "Destek panelini kapat",
  namePlaceholder: "Ad (isteğe bağlı)",
  emailPlaceholder: "E-posta",
  messagePlaceholder: "Sigma desteği size nasıl yardımcı olabilir?",
  submit: "Sohbeti Başlat",
  submitSending: "Gönderiliyor...",
  successBody: "Mesajınız alındı. Ekibimiz kısa sürede size dönecek.",
  footerNote: "Ekibimiz en kısa sürede yanıtlayacaktır.",
  validationError: "Lütfen e-posta ve mesajınızı girin.",
  invalidEmailError: "Lütfen geçerli bir e-posta girin.",
  sendError: "Destek sohbeti başlatılamadı. Lütfen tekrar deneyin.",
} as const;

const livePanelZH = {
  panelTitle: "实时支持",
  panelSubtitle: "与 Sigma 支持团队沟通",
  panelAriaLabel: "实时支持面板",
  closeAria: "关闭支持面板",
  namePlaceholder: "姓名（可选）",
  emailPlaceholder: "邮箱",
  messagePlaceholder: "Sigma 支持可以如何帮助您？",
  submit: "开始对话",
  submitSending: "发送中…",
  successBody: "消息已发送。我们的团队将尽快与您联系。",
  footerNote: "我们会尽快回复。",
  validationError: "请输入邮箱和留言。",
  invalidEmailError: "请输入有效的邮箱地址。",
  sendError: "无法开始支持对话，请重试。",
} as const;

const livePanelFA = {
  panelTitle: "پشتیبانی زنده",
  panelSubtitle: "با پشتیبانی سیگما صحبت کنید",
  panelAriaLabel: "پنل پشتیبانی زنده",
  closeAria: "بستن پنل پشتیبانی",
  namePlaceholder: "نام (اختیاری)",
  emailPlaceholder: "ایمیل",
  messagePlaceholder: "پشتیبانی سیگما چگونه می‌تواند کمک کند؟",
  submit: "شروع گفتگو",
  submitSending: "در حال ارسال…",
  successBody: "پیام ارسال شد. تیم ما به‌زودی با شما تماس می‌گیرد.",
  footerNote: "تیم ما در اسرع وقت پاسخ می‌دهد.",
  validationError: "لطفاً ایمیل و پیام را وارد کنید.",
  invalidEmailError: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
  sendError: "شروع چت پشتیبانی ممکن نشد. دوباره تلاش کنید.",
} as const;

const livePanelES = {
  panelTitle: "Soporte en vivo",
  panelSubtitle: "Habla con soporte de Sigma",
  panelAriaLabel: "Panel de soporte en vivo",
  closeAria: "Cerrar panel de soporte",
  namePlaceholder: "Nombre (opcional)",
  emailPlaceholder: "Correo",
  messagePlaceholder: "¿Cómo puede ayudarte soporte de Sigma?",
  submit: "Iniciar conversación",
  submitSending: "Enviando...",
  successBody: "Mensaje enviado. Nuestro equipo te contactará pronto.",
  footerNote: "Nuestro equipo responderá lo antes posible.",
  validationError: "Ingresa correo y mensaje.",
  invalidEmailError: "Ingresa un correo válido.",
  sendError: "No se pudo iniciar el chat de soporte. Inténtalo de nuevo.",
} as const;

const livePanelRU = {
  panelTitle: "Онлайн-поддержка",
  panelSubtitle: "Свяжитесь с поддержкой Sigma",
  panelAriaLabel: "Панель онлайн-поддержки",
  closeAria: "Закрыть панель поддержки",
  namePlaceholder: "Имя (необязательно)",
  emailPlaceholder: "Email",
  messagePlaceholder: "Чем поддержка Sigma может помочь?",
  submit: "Начать диалог",
  submitSending: "Отправка...",
  successBody: "Сообщение отправлено. Команда скоро свяжется с вами.",
  footerNote: "Мы ответим как можно скорее.",
  validationError: "Введите email и сообщение.",
  invalidEmailError: "Введите корректный email.",
  sendError: "Не удалось начать чат поддержки. Попробуйте снова.",
} as const;

const livePanelAR = {
  panelTitle: "دعم مباشر",
  panelSubtitle: "تحدث مع دعم سيغما",
  panelAriaLabel: "لوحة الدعم المباشر",
  closeAria: "إغلاق لوحة الدعم",
  namePlaceholder: "الاسم (اختياري)",
  emailPlaceholder: "البريد الإلكتروني",
  messagePlaceholder: "كيف يمكن لدعم سيغما مساعدتك؟",
  submit: "بدء المحادثة",
  submitSending: "جاري الإرسال…",
  successBody: "تم إرسال الرسالة. سيتواصل الفريق قريباً.",
  footerNote: "سنرد في أقرب وقت.",
  validationError: "يرجى إدخال البريد والرسالة.",
  invalidEmailError: "يرجى إدخال بريد إلكتروني صالح.",
  sendError: "تعذّر بدء محادثة الدعم. حاول مجدداً.",
} as const;

export const siteRestByLang: Record<LangCode, SiteRest> = {
  EN: {
    nav: {
      system: "System",
      capabilities: "Capabilities",
      network: "Network",
      metrics: "Metrics",
      sigmaPro: "Sigma Pro",
      contact: "Contact",
      navCta: "Partner with Sigma",
      insights: "Insights",
      insightsAccessLabel: "Access",
    },
    insights: {
      pageTitle: "Sigma Insights",
      pageSubtitle:
        "Field notes from the finance and Web3 growth frontier — regional playbooks, IB economics, KOL strategy, and launch distribution.",
      pageEyebrow: "INSIGHTS",
      filterAllLabel: "All",
      readLabel: "Read Insight",
      relatedHeading: "Related insights",
      backToInsights: "Insights",
      sigmaHome: "Sigma",
      chromeNavAriaLabel: "Insights navigation",
      categoryTablistAriaLabel: "Categories",
      featuredLabel: "Featured",
      emptyState: "No briefings in this view.",
      insightBadge: "Sigma Insight",
      insightAriaLabel: "Sigma insight",
      articleCtaMidHeading: "Need growth infrastructure, not just marketing?",
      articleCtaMidSupporting:
        "Execution systems for acquisition, liquidity, and market reach.",
      articleCtaMidButton: "Get Access",
      articleCtaEndHeading: "Work with Sigma",
      articleCtaEndSupporting:
        "Connect users, liquidity, and network distribution through one strategic system.",
      articleCtaEndButton: "Work with Sigma",
      categories: {
        growth: "Growth",
        distribution: "Distribution",
        liquidity: "Liquidity",
      },
    },
    whatIsSigma: {
      label: "WHAT IS SIGMA",
      headline:
        "A Financial Growth Infrastructure Network for Crypto, Forex, Stocks, and Web3",
      description:
        "Sigma is a global financial growth infrastructure network that helps crypto exchanges, forex brokers, prop firms, stock and Web3 KOLs, IBs, traders, and financial platforms grow through user acquisition, KOL infrastructure, IB and affiliate programs, liquidity activation, community management, regional market expansion, and strategic partnerships. Unlike traditional crypto marketing agencies focused on a single channel, Sigma operates as the growth operating layer above the entire financial value chain. Sigma is not a broker, exchange, investment fund, or licensed financial advisor — and does not manage, custody, or trade user funds.",
      pillars: [
        {
          title: "Growth Intelligence",
          description:
            "Market audits, competitor SEO and SERP analysis, audience research, and product-market-fit feedback — every campaign starts with signal, not assumption.",
        },
        {
          title: "Distribution Network",
          description:
            "1,500+ vetted crypto, forex, stock, and Web3 KOLs, IBs, community managers, and BD partners across MENA, GCC, Turkey, Europe, LATAM, CIS, East Asia, and Persian-speaking markets — deployable on day one.",
        },
        {
          title: "Liquidity & Volume",
          description:
            "Campaign architectures that convert acquisition into recurring trading volume — VIP and whale onboarding, market-maker introductions, listing coordination, and retention loops calibrated to your venue.",
        },
      ],
    },
    about: {
      kicker: "BUILT BY OPERATORS",
      title: "THE PEOPLE BEHIND SIGMA",
      description:
        "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms — supported by regional operators across 40+ markets.",
    },
    metrics: {
      kicker: "Network",
      title:
        "Global routing, liquidity depth, and execution-grade telemetry—engineered for scale.",
      stats: [
        { label: "Total Value Locked", target: 50, suffix: "B+" },
        { label: "Active Nodes", target: 14, suffix: "K+" },
        { label: "Network Latency", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "Network",
      title: "Community Graph",
      body: "Nodes align through shared incentives. Sigma maps the mesh—edges are trust, throughput, and verifiable state.",
    },
    sigmaPro: {
      badge: "VIP · ELITE ACCESS",
      title: "SigmaPRO — Dedicated Growth Operations for High-Volume Partners",
      description:
        "Private throughput, priority routing, and a senior growth desk reserved for high-volume exchanges, brokers, protocols, and institutional partners.",
      bullets: [
        "Dedicated growth desk with SLA-backed execution playbooks",
        "Priority routing across liquidity and distribution surfaces",
        "Confidential telemetry, bespoke reporting, and direct escalation",
        "Quarterly strategic reviews with Sigma leadership",
      ],
      footnote: "Access is limited and subject to qualification.",
    },
    contact: {
      kicker: "INITIATE · ACCESS THE MAINFRAME",
      title: "STAY CONNECTED WITH SIGMA",
      description:
        "For partnerships, exchange and broker growth, KOL applications, IB programs, and institutional inquiries — email the desk or open the full channel list.",
      emailCta: "Email",
      socialCta: "Channels & social",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "INITIATE · ACCESS THE MAINFRAME",
      title: "Stay Connected With Sigma",
      description:
        "For partnerships, exchange and broker growth, KOL applications, IB programs, and institutional inquiries.",
      reachUsPrefix: "Reach us at",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "Connect",
      subtitle:
        "Official channels, social profiles, and direct contact — like a link-in-bio hub.",
      backHome: "Back to Sigma",
      empty:
        "No links configured yet. Set NEXT_PUBLIC_SOCIAL_* variables in your environment (see .env.example).",
      labels: {
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        telegram: "Telegram",
        discord: "Discord",
        email: "Email",
        website: "Website",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "INITIATE",
      description: "ACCESS THE MAINFRAME",
      primaryCta: "Enter Ecosystem",
      secondaryCta: "Request Brief",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "Live Support",
      liveSupportPanel: { ...livePanelEN },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "Open menu",
        closeMenuAria: "Close menu",
        languageMenuAria: "Change language",
      },
      logoAlt: "SIGMA",
      learnMore: "Learn more",
    },
    footer: {
      rights: "© 2026 SIGMA PROTOCOL. ALL RIGHTS RESERVED.",
      statusPrefix: "SYS.STAT:",
      statusValue: "OPTIMAL",
      tagline: "Web3 · Strategic · Precision",
      navAriaLabel: "Footer",
      links: [],
    },
    trustedBy: {
      sectionLabel: "TRUSTED BY",
      logos: [],
    },
    testimonials: [],
  },
  TR: {
    nav: {
      system: "Sistem",
      capabilities: "Yetenekler",
      network: "Ağ",
      metrics: "Metrikler",
      sigmaPro: "Sigma Pro",
      contact: "İletişim",
      navCta: "Sigma ile Ortak Olun",
      insights: "İçgörüler",
      insightsAccessLabel: "Erişim",
    },
    insights: {
      pageTitle: "Sigma İçgörüleri",
      pageSubtitle:
        "Finans ve Web3 büyüme cephesinden saha notları — bölgesel playbook'lar, IB ekonomisi, KOL stratejisi ve lansman dağıtımı.",
      pageEyebrow: "İÇGÖRÜLER",
      filterAllLabel: "Tümü",
      readLabel: "İçgörüyü Oku",
      relatedHeading: "İlgili içgörüler",
      backToInsights: "İçgörüler",
      sigmaHome: "Sigma",
      chromeNavAriaLabel: "İçgörüler gezinmesi",
      categoryTablistAriaLabel: "Kategoriler",
      featuredLabel: "Öne Çıkan",
      emptyState: "Bu görünümde bülten bulunmuyor.",
      insightBadge: "Sigma İçgörüsü",
      insightAriaLabel: "Sigma içgörüsü",
      articleCtaMidHeading:
        "Sadece pazarlama değil, büyüme altyapısına mı ihtiyacınız var?",
      articleCtaMidSupporting:
        "Edinim, likidite ve pazar erişimi için yürütme sistemleri.",
      articleCtaMidButton: "Erişim Al",
      articleCtaEndHeading: "Sigma ile çalışın",
      articleCtaEndSupporting:
        "Kullanıcıları, likiditeyi ve ağ dağıtımını tek bir stratejik sistemde birleştirin.",
      articleCtaEndButton: "Sigma ile çalışın",
      categories: {
        growth: "Büyüme",
        distribution: "Dağıtım",
        liquidity: "Likidite",
      },
    },
    whatIsSigma: {
      label: "SIGMA NEDİR",
      headline:
        "Kripto, Forex, Hisse ve Web3 İçin Finansal Büyüme Altyapı Ağı",
      description:
        "Sigma; kripto borsaları, forex brokerları, prop firmalar, hisse ve Web3 KOL'ları, IB'ler, trader'lar ve finansal platformların kullanıcı edinimi, KOL altyapısı, IB/affiliate programları, likidite aktivasyonu, topluluk yönetimi, bölgesel pazar genişlemesi ve stratejik ortaklıklarla büyümesine yardımcı olan küresel bir finansal büyüme altyapı ağıdır. Tek kanala odaklanan geleneksel kripto pazarlama ajanslarının aksine Sigma, tüm finansal değer zincirinin üzerindeki büyüme operasyon katmanı olarak çalışır. Sigma bir broker, borsa, yatırım fonu veya lisanslı finansal danışman değildir — kullanıcı fonlarını yönetmez, saklamaz veya işlem yapmaz.",
      pillars: [
        {
          title: "Büyüme İstihbaratı",
          description:
            "Pazar denetimleri, rakip SEO/SERP analizi, kitle araştırması ve ürün-pazar uyumu geri bildirimi — her kampanya varsayımla değil, sinyalle başlar.",
        },
        {
          title: "Dağıtım Ağı",
          description:
            "MENA, GCC, Türkiye, Avrupa, LATAM, BDT ve Farsça konuşulan pazarlarda 1.500+ doğrulanmış KOL, IB, topluluk yöneticisi ve BD ortağı — ilk günden devreye alınabilir.",
        },
        {
          title: "Likidite ve Hacim",
          description:
            "Edinimi tekrarlayan işlem hacmine dönüştüren kampanya mimarileri — VIP/whale onboarding, market maker tanıtımları, listing koordinasyonu ve mekanınıza göre retention döngüleri.",
        },
      ],
    },
    about: {
      kicker: "OPERATÖRLER TARAFINDAN KURULDU",
      title: "SIGMA'NIN ARKASINDAKİ İNSANLAR",
      description:
        "Sigma; büyük borsa ekosistemleri ve finansal platformlarda sahada deneyimli büyüme, BD, pazarlama ve pazar genişletme danışmanlarından oluşan bir çekirdek ekip tarafından yönetilir — 40+ pazarda bölgesel operatörlerle desteklenir.",
    },
    metrics: {
      kicker: "Ağ",
      title:
        "Küresel yönlendirme, likidite derinliği ve yürütme düzeyinde telemetri—ölçek için tasarlandı.",
      stats: [
        { label: "Kilitlenen Toplam Değer", target: 50, suffix: "B+" },
        { label: "Aktif Düğümler", target: 14, suffix: "K+" },
        { label: "Ağ Gecikmesi", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "Ağ",
      title: "Topluluk Grafiği",
      body: "Düğümler paylaşılan teşviklerle hizalanır. Sigma mesh'i haritalar—kenarlar güven, verim ve doğrulanabilir durumdur.",
    },
    sigmaPro: {
      badge: "VIP · ELİT ERİŞİM",
      title: "SigmaPRO — Yüksek Hacimli Ortaklar İçin Ayrılmış Büyüme Operasyonları",
      description:
        "Yüksek hacimli borsalar, brokerlar, protokoller ve kurumsal ortaklar için özel throughput, öncelikli yönlendirme ve kıdemli büyüme masası.",
      bullets: [
        "SLA destekli yürütme planlarıyla ayrılmış büyüme masası",
        "Likidite ve dağıtım katmanlarında öncelikli yönlendirme",
        "Gizli telemetri, özel raporlama ve doğrudan eskalasyon",
        "Sigma liderliği ile üç aylık stratejik değerlendirmeler",
      ],
      footnote: "Erişim sınırlıdır ve uygunluk koşullarına tabidir.",
    },
    contact: {
      kicker: "BAŞLAT · ANA SİSTEME ERİŞ",
      title: "SIGMA İLE BAĞLANTIDA KALIN",
      description:
        "Ortaklıklar, borsa ve broker büyümesi, KOL başvuruları, IB programları ve kurumsal talepler — ekibe e-posta gönderin veya kanal listesini açın.",
      emailCta: "E-posta",
      socialCta: "Kanallar ve sosyal",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "BAŞLAT · ANA SİSTEME ERİŞ",
      title: "Sigma ile bağlantıda kalın",
      description:
        "Ortaklıklar, borsa ve broker büyümesi, KOL başvuruları, IB programları ve kurumsal talepler.",
      reachUsPrefix: "Bize ulaşın:",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "Bağlan",
      subtitle:
        "Resmi kanallar, sosyal profiller ve doğrudan iletişim — link-in-bio tarzı bir merkez.",
      backHome: "Sigma'ya dön",
      empty:
        "Henüz bağlantı yok. Ortam değişkenlerinde NEXT_PUBLIC_SOCIAL_* değerlerini ayarlayın (.env.example).",
      labels: {
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        telegram: "Telegram",
        discord: "Discord",
        email: "E-posta",
        website: "Web sitesi",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "BAŞLAT",
      description: "ANA SİSTEME ERİŞ",
      primaryCta: "Ekosisteme Gir",
      secondaryCta: "Teklif İste",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "Canlı Destek",
      liveSupportPanel: { ...livePanelTR },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "Menüyü aç",
        closeMenuAria: "Menüyü kapat",
        languageMenuAria: "Dil seçin",
      },
      logoAlt: "SIGMA",
      learnMore: "Daha fazla öğren",
    },
    footer: {
      rights: "© 2026 SIGMA PROTOKOLÜ. TÜM HAKLARI SAKLIDIR.",
      statusPrefix: "SİS.DUR:",
      statusValue: "OPTİMAL",
      tagline: "Web3 · Stratejik · Kesin",
      navAriaLabel: "Altbilgi",
      links: [],
    },
    trustedBy: {
      sectionLabel: "GÜVENENLER",
      logos: [],
    },
    testimonials: [],
  },
  ZH: {
    nav: {
      system: "系统",
      capabilities: "能力",
      network: "网络",
      metrics: "指标",
      sigmaPro: "Sigma Pro",
      contact: "联系",
      navCta: "与 Sigma 合作",
      insights: "洞察",
      insightsAccessLabel: "接入",
    },
    insights: {
      pageTitle: "Sigma 洞察",
      pageSubtitle:
        "来自金融与 Web3 增长前沿的实地笔记——区域 playbook、IB 经济学、KOL 策略与发行分发。",
      pageEyebrow: "洞察",
      filterAllLabel: "全部",
      readLabel: "阅读洞察",
      relatedHeading: "相关文章",
      backToInsights: "洞察",
      sigmaHome: "Sigma",
      chromeNavAriaLabel: "洞察导航",
      categoryTablistAriaLabel: "分类",
      featuredLabel: "精选",
      emptyState: "此视图暂无简报。",
      insightBadge: "Sigma 洞察",
      insightAriaLabel: "Sigma 洞察",
      articleCtaMidHeading: "你需要的是增长基础设施，而不只是营销？",
      articleCtaMidSupporting: "用于获客、流动性与市场触达的执行系统。",
      articleCtaMidButton: "获取权限",
      articleCtaEndHeading: "与 Sigma 合作",
      articleCtaEndSupporting: "通过一个战略系统连接用户、流动性与网络分发。",
      articleCtaEndButton: "与 Sigma 合作",
      categories: {
        growth: "增长",
        distribution: "分发",
        liquidity: "流动性",
      },
    },
    whatIsSigma: {
      label: "什么是 SIGMA",
      headline: "面向加密、外汇、股票与 Web3 的金融增长基础设施网络",
      description:
        "Sigma 是全球金融增长基础设施网络，帮助加密交易所、外汇经纪商、prop firm、股票与 Web3 KOL、IB、交易者及金融平台实现用户获取、KOL 基础设施、IB/联盟计划、流动性激活、社区运营、区域市场扩张与战略合作。与专注单一渠道的传统加密营销机构不同，Sigma 作为整个金融价值链之上的增长运营层运作。Sigma 不是经纪商、交易所、投资基金或持牌金融顾问——不管理、托管或交易用户资金。",
      pillars: [
        {
          title: "增长情报",
          description:
            "市场审计、竞品 SEO/SERP 分析、受众研究与产品市场契合反馈——每个战役以信号而非假设起步。",
        },
        {
          title: "分发网络",
          description:
            "覆盖 MENA、GCC、土耳其、欧洲、LATAM、独联体与波斯语市场的 1,500+ 经审核 KOL、IB、社区经理与 BD 伙伴——首日即可部署。",
        },
        {
          title: "流动性与交易量",
          description:
            "将获客转化为持续交易量的战役架构——VIP/大户入驻、做市商对接、上币协调与按平台校准的留存循环。",
        },
      ],
    },
    about: {
      kicker: "由操盘手打造",
      title: "SIGMA 背后的人",
      description:
        "Sigma 由在主要交易所生态与金融平台拥有实战经验的成长、BD、市场与区域扩张顾问组成的核心团队领导——并由覆盖 40+ 市场的区域运营者支持。",
    },
    metrics: {
      kicker: "网络",
      title: "全球路由、流动性深度与执行级遥测——为规模化而设计。",
      stats: [
        { label: "总锁定价值", target: 50, suffix: "B+" },
        { label: "活跃节点", target: 14, suffix: "K+" },
        { label: "网络延迟", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "网络",
      title: "社区图谱",
      body: "节点通过共享激励对齐。Sigma 映射网格——边代表信任、吞吐量和可验证状态。",
    },
    sigmaPro: {
      badge: "VIP · 精英通道",
      title: "SigmaPRO — 面向高量级合作伙伴的专属增长运营",
      description:
        "为高量级交易所、经纪商、协议与机构合作伙伴保留的专属吞吐、优先路由与资深增长团队。",
      bullets: [
        "专属增长台与 SLA 级执行方案",
        "流动性与分发路径的优先路由",
        "保密遥测、定制报告与直连升级",
        "与 Sigma 领导层的季度战略复盘",
      ],
      footnote: "名额有限，需通过资格审核。",
    },
    contact: {
      kicker: "启动 · 访问主机",
      title: "与 SIGMA 保持连接",
      description:
        "合作、交易所与经纪商增长、KOL 申请、IB 计划与机构咨询——发送邮件或打开完整渠道列表。",
      emailCta: "邮件",
      socialCta: "渠道与社交",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "启动 · 访问主机",
      title: "与 Sigma 保持连接",
      description: "合作、交易所与经纪商增长、KOL 申请、IB 计划与机构咨询。",
      reachUsPrefix: "联系我们：",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "联系",
      subtitle: "官方渠道、社交主页与直接联系方式 — 类似链接聚合页。",
      backHome: "返回 Sigma",
      empty: "尚未配置链接。请在环境中设置 NEXT_PUBLIC_SOCIAL_*（见 .env.example）。",
      labels: {
        instagram: "Instagram",
        x: "X",
        linkedin: "领英",
        telegram: "Telegram",
        discord: "Discord",
        email: "邮箱",
        website: "网站",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "启动",
      description: "访问主机",
      primaryCta: "进入生态系统",
      secondaryCta: "请求简报",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "实时支持",
      liveSupportPanel: { ...livePanelZH },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "打开菜单",
        closeMenuAria: "关闭菜单",
        languageMenuAria: "选择语言",
      },
      logoAlt: "SIGMA",
      learnMore: "了解更多",
    },
    footer: {
      rights: "© 2026 SIGMA 协议。保留所有权利。",
      statusPrefix: "系统状态:",
      statusValue: "最佳",
      tagline: "Web3 · 战略 · 精准",
      navAriaLabel: "页脚",
      links: [],
    },
    trustedBy: {
      sectionLabel: "合作伙伴",
      logos: [],
    },
    testimonials: [],
  },
  ES: {
    nav: {
      system: "Sistema",
      capabilities: "Capacidades",
      network: "Red",
      metrics: "Métricas",
      sigmaPro: "Sigma Pro",
      contact: "Contacto",
      navCta: "Asociarse con Sigma",
      insights: "Perspectivas",
      insightsAccessLabel: "Acceso",
    },
    insights: {
      pageTitle: "Perspectivas de Sigma",
      pageSubtitle:
        "Notas de campo desde la frontera del crecimiento financiero y Web3 — playbooks regionales, economía IB, estrategia KOL y distribución de lanzamientos.",
      pageEyebrow: "INSIGHTS",
      filterAllLabel: "Todo",
      readLabel: "Leer insight",
      relatedHeading: "Perspectivas relacionadas",
      backToInsights: "Perspectivas",
      sigmaHome: "Sigma",
      chromeNavAriaLabel: "Navegación de insights",
      categoryTablistAriaLabel: "Categorías",
      featuredLabel: "Destacado",
      emptyState: "No hay informes en esta vista.",
      insightBadge: "Insight Sigma",
      insightAriaLabel: "Insight de Sigma",
      articleCtaMidHeading: "¿Necesitas infraestructura de crecimiento, no solo marketing?",
      articleCtaMidSupporting:
        "Sistemas de ejecución para adquisición, liquidez y alcance de mercado.",
      articleCtaMidButton: "Obtener acceso",
      articleCtaEndHeading: "Trabaja con Sigma",
      articleCtaEndSupporting:
        "Conecta usuarios, liquidez y distribución de red con un solo sistema estratégico.",
      articleCtaEndButton: "Trabaja con Sigma",
      categories: {
        growth: "Crecimiento",
        distribution: "Distribución",
        liquidity: "Liquidez",
      },
    },
    whatIsSigma: {
      label: "QUÉ ES SIGMA",
      headline:
        "Una red de infraestructura de crecimiento financiero para cripto, forex, acciones y Web3",
      description:
        "Sigma es una red global de infraestructura de crecimiento financiero que ayuda a exchanges, brokers, prop firms, KOLs, IBs, traders y plataformas a crecer mediante adquisición de usuarios, infraestructura KOL, programas IB/afiliados, activación de liquidez, gestión de comunidad, expansión regional y alianzas estratégicas. A diferencia de las agencias de marketing cripto de un solo canal, Sigma opera como la capa operativa de crecimiento sobre toda la cadena de valor financiera. Sigma no es broker, exchange, fondo de inversión ni asesor financiero con licencia — no gestiona, custodia ni opera fondos de usuarios.",
      pillars: [
        {
          title: "Inteligencia de crecimiento",
          description:
            "Auditorías de mercado, análisis SEO/SERP competitivo, investigación de audiencia y feedback de product-market fit — cada campaña empieza con señal, no suposición.",
        },
        {
          title: "Red de distribución",
          description:
            "1.500+ KOLs, IBs, community managers y socios BD verificados en MENA, GCC, Turquía, Europa, LATAM, CEI y mercados persas — desplegables desde el día uno.",
        },
        {
          title: "Liquidez y volumen",
          description:
            "Arquitecturas de campaña que convierten adquisición en volumen recurrente — onboarding VIP/whale, intros a market makers, coordinación de listings y bucles de retención calibrados.",
        },
      ],
    },
    about: {
      kicker: "CONSTRUIDO POR OPERADORES",
      title: "LAS PERSONAS DETRÁS DE SIGMA",
      description:
        "Sigma está liderada por un equipo núcleo de consultores de crecimiento, BD, marketing y expansión de mercado con experiencia en grandes ecosistemas de exchange y plataformas financieras — apoyada por operadores regionales en más de 40 mercados.",
    },
    metrics: {
      kicker: "Red",
      title:
        "Enrutamiento global, profundidad de liquidez y telemetría de nivel ejecución, diseñados para escalar.",
      stats: [
        { label: "Valor total bloqueado", target: 50, suffix: "B+" },
        { label: "Nodos activos", target: 14, suffix: "K+" },
        { label: "Latencia de red", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "Red",
      title: "Grafo de comunidad",
      body: "Los nodos se alinean por incentivos compartidos. Sigma mapea la malla: confianza, rendimiento y estado verificable.",
    },
    sigmaPro: {
      badge: "VIP · ACCESO ÉLITE",
      title: "SigmaPRO — Operaciones de crecimiento dedicadas para socios de alto volumen",
      description:
        "Throughput privado, enrutamiento prioritario y mesa de crecimiento senior reservados para exchanges, brokers, protocolos e instituciones de alto volumen.",
      bullets: [
        "Mesa de crecimiento dedicada con playbooks respaldados por SLA",
        "Enrutamiento prioritario en liquidez y distribución",
        "Telemetría confidencial, reportes a medida y escalación directa",
        "Revisiones estratégicas trimestrales con el liderazgo de Sigma",
      ],
      footnote: "El acceso es limitado y sujeto a calificación.",
    },
    contact: {
      kicker: "INICIAR · ACCEDER AL SISTEMA",
      title: "MANTENTE CONECTADO CON SIGMA",
      description:
        "Alianzas, crecimiento de exchanges y brokers, solicitudes KOL, programas IB y consultas institucionales — escribe al equipo o abre la lista de canales.",
      emailCta: "Correo",
      socialCta: "Canales y redes",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "INICIAR · ACCEDER AL SISTEMA",
      title: "Mantente conectado con Sigma",
      description:
        "Alianzas, crecimiento de exchanges y brokers, solicitudes KOL, programas IB y consultas institucionales.",
      reachUsPrefix: "Escríbenos a",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "Conectar",
      subtitle:
        "Canales oficiales, perfiles sociales y contacto directo en un hub único.",
      backHome: "Volver a Sigma",
      empty:
        "Aún no hay enlaces configurados. Define las variables NEXT_PUBLIC_SOCIAL_* en tu entorno.",
      labels: {
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        telegram: "Telegram",
        discord: "Discord",
        email: "Correo",
        website: "Sitio web",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "INICIAR",
      description: "ACCEDER AL SISTEMA",
      primaryCta: "Entrar al ecosistema",
      secondaryCta: "Solicitar briefing",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "Soporte en vivo",
      liveSupportPanel: { ...livePanelES },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "Abrir menú",
        closeMenuAria: "Cerrar menú",
        languageMenuAria: "Cambiar idioma",
      },
      logoAlt: "SIGMA",
      learnMore: "Saber más",
    },
    footer: {
      rights: "© 2026 PROTOCOLO SIGMA. TODOS LOS DERECHOS RESERVADOS.",
      statusPrefix: "EST.SIS:",
      statusValue: "ÓPTIMO",
      tagline: "Web3 · Estratégico · Preciso",
      navAriaLabel: "Pie de página",
      links: [],
    },
    trustedBy: {
      sectionLabel: "CONFIADO POR",
      logos: [],
    },
    testimonials: [],
  },
  RU: {
    nav: {
      system: "Система",
      capabilities: "Возможности",
      network: "Сеть",
      metrics: "Метрики",
      sigmaPro: "Sigma Pro",
      contact: "Контакты",
      navCta: "Стать партнёром Sigma",
      insights: "Инсайты",
      insightsAccessLabel: "Доступ",
    },
    insights: {
      pageTitle: "Инсайты Sigma",
      pageSubtitle:
        "Полевые заметки с фронтира финансового и Web3-роста — региональные playbook’и, экономика IB, KOL-стратегия и дистрибуция запусков.",
      pageEyebrow: "ИНСАЙТЫ",
      filterAllLabel: "Все",
      readLabel: "Читать инсайт",
      relatedHeading: "Похожие инсайты",
      backToInsights: "Инсайты",
      sigmaHome: "Sigma",
      chromeNavAriaLabel: "Навигация инсайтов",
      categoryTablistAriaLabel: "Категории",
      featuredLabel: "Главное",
      emptyState: "В этом разделе пока нет материалов.",
      insightBadge: "Инсайт Sigma",
      insightAriaLabel: "Инсайт Sigma",
      articleCtaMidHeading:
        "Нужна инфраструктура роста, а не только маркетинг?",
      articleCtaMidSupporting:
        "Системы исполнения для привлечения, ликвидности и рыночного охвата.",
      articleCtaMidButton: "Получить доступ",
      articleCtaEndHeading: "Работайте с Sigma",
      articleCtaEndSupporting:
        "Объедините пользователей, ликвидность и сетевую дистрибуцию в одной стратегической системе.",
      articleCtaEndButton: "Работайте с Sigma",
      categories: {
        growth: "Рост",
        distribution: "Дистрибуция",
        liquidity: "Ликвидность",
      },
    },
    whatIsSigma: {
      label: "ЧТО ТАКОЕ SIGMA",
      headline:
        "Сеть финансовой инфраструктуры роста для crypto, forex, акций и Web3",
      description:
        "Sigma — глобальная сеть финансовой инфраструктуры роста, которая помогает crypto-биржам, forex-брокерам, prop firms, KOL, IB, трейдерам и финансовым платформам расти через привлечение пользователей, KOL-инфраструктуру, IB/affiliate-программы, активацию ликвидности, управление сообществами, региональную экспансию и стратегические партнёрства. В отличие от агентств с одним каналом, Sigma — операционный слой роста над всей финансовой цепочкой ценности. Sigma не является брокером, биржей, инвестфондом или лицензированным финансовым советником и не управляет, не хранит и не торгует средствами пользователей.",
      pillars: [
        {
          title: "Аналитика роста",
          description:
            "Аудиты рынка, конкурентный SEO/SERP, исследование аудитории и product-market fit — каждая кампания начинается с сигнала, а не догадок.",
        },
        {
          title: "Сеть дистрибуции",
          description:
            "1 500+ проверенных KOL, IB, community-менеджеров и BD-партнёров в MENA, GCC, Турции, Европе, LATAM, СНГ и персоязычных рынках — готовы с первого дня.",
        },
        {
          title: "Ликвидность и объём",
          description:
            "Архитектуры кампаний, превращающие привлечение в повторяющийся торговый объём — VIP/whale onboarding, интро к market makers, листинги и retention-циклы под вашу площадку.",
        },
      ],
    },
    about: {
      kicker: "СОЗДАНО ОПЕРАТОРАМИ",
      title: "ЛЮДИ ЗА SIGMA",
      description:
        "Sigma возглавляется ядром консультантов по росту, BD, маркетингу и экспансии с практическим опытом в крупных биржевых экосистемах и финансовых платформах — при поддержке региональных операторов в 40+ рынках.",
    },
    metrics: {
      kicker: "Сеть",
      title:
        "Глобальная маршрутизация, глубина ликвидности и телеметрия уровня исполнения, спроектированные для масштаба.",
      stats: [
        { label: "Общая заблокированная стоимость", target: 50, suffix: "B+" },
        { label: "Активные узлы", target: 14, suffix: "K+" },
        { label: "Задержка сети", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "Сеть",
      title: "Граф сообщества",
      body: "Узлы выравниваются общими стимулами. Sigma картографирует mesh: доверие, пропускная способность и проверяемое состояние.",
    },
    sigmaPro: {
      badge: "VIP · ЭЛИТНЫЙ ДОСТУП",
      title: "SigmaPRO — выделенные операции роста для партнёров с высоким объёмом",
      description:
        "Приватный throughput, приоритетная маршрутизация и senior growth-деск для высокообъёмных бирж, брокеров, протоколов и институциональных партнёров.",
      bullets: [
        "Выделенный growth-деск с плейбуками и SLA",
        "Приоритетная маршрутизация по ликвидности и дистрибуции",
        "Конфиденциальная телеметрия, кастомная отчётность и прямая эскалация",
        "Ежеквартальные стратегические сессии с руководством Sigma",
      ],
      footnote: "Доступ ограничен и предоставляется после квалификации.",
    },
    contact: {
      kicker: "ЗАПУСК · ДОСТУП К СИСТЕМЕ",
      title: "ОСТАВАЙТЕСЬ НА СВЯЗИ С SIGMA",
      description:
        "Партнёрства, рост бирж и брокеров, заявки KOL, IB-программы и институциональные запросы — напишите команде или откройте список каналов.",
      emailCta: "Почта",
      socialCta: "Каналы и соцсети",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "ЗАПУСК · ДОСТУП К СИСТЕМЕ",
      title: "Оставайтесь на связи с Sigma",
      description:
        "Партнёрства, рост бирж и брокеров, заявки KOL, IB-программы и институциональные запросы.",
      reachUsPrefix: "Напишите нам:",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "Связаться",
      subtitle:
        "Официальные каналы, соцпрофили и прямые контакты в формате link-hub.",
      backHome: "Назад к Sigma",
      empty:
        "Ссылки пока не настроены. Укажите переменные NEXT_PUBLIC_SOCIAL_* в окружении.",
      labels: {
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        telegram: "Telegram",
        discord: "Discord",
        email: "Почта",
        website: "Сайт",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "ЗАПУСК",
      description: "ДОСТУП К СИСТЕМЕ",
      primaryCta: "Войти в экосистему",
      secondaryCta: "Запросить бриф",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "Онлайн-поддержка",
      liveSupportPanel: { ...livePanelRU },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "Открыть меню",
        closeMenuAria: "Закрыть меню",
        languageMenuAria: "Сменить язык",
      },
      logoAlt: "SIGMA",
      learnMore: "Узнать больше",
    },
    footer: {
      rights: "© 2026 ПРОТОКОЛ SIGMA. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
      statusPrefix: "СТАТ.СИСТ:",
      statusValue: "ОПТИМАЛЬНО",
      tagline: "Web3 · Стратегия · Точность",
      navAriaLabel: "Футер",
      links: [],
    },
    trustedBy: {
      sectionLabel: "НАМ ДОВЕРЯЮТ",
      logos: [],
    },
    testimonials: [],
  },
  FA: {
    nav: {
      system: "سیستم",
      capabilities: "قابلیت‌ها",
      network: "شبکه",
      metrics: "متریک‌ها",
      sigmaPro: "Sigma Pro",
      contact: "تماس",
      navCta: "همکاری با Sigma",
      insights: "بینش‌ها",
      insightsAccessLabel: "دسترسی",
    },
    insights: {
      pageTitle: "بینش‌های Sigma",
      pageSubtitle:
        "یادداشت‌های میدانی از مرز رشد مالی و Web3 — playbookهای منطقه‌ای، اقتصاد IB، استراتژی KOL و توزیع عرضه.",
      pageEyebrow: "بینش‌ها",
      filterAllLabel: "همه",
      readLabel: "مطالعه بینش",
      relatedHeading: "بینش‌های مرتبط",
      backToInsights: "بینش‌ها",
      sigmaHome: "سیگما",
      chromeNavAriaLabel: "ناوبری بینش‌ها",
      categoryTablistAriaLabel: "دسته‌بندی‌ها",
      featuredLabel: "ویژه",
      emptyState: "در این نما گزارشی وجود ندارد.",
      insightBadge: "بینش سیگما",
      insightAriaLabel: "بینش سیگما",
      articleCtaMidHeading: "به زیرساخت رشد نیاز دارید، نه فقط بازاریابی؟",
      articleCtaMidSupporting:
        "سیستم‌های اجرایی برای جذب، نقدینگی و دسترسی بازار.",
      articleCtaMidButton: "دریافت دسترسی",
      articleCtaEndHeading: "با سیگما همکاری کنید",
      articleCtaEndSupporting:
        "کاربران، نقدینگی و توزیع شبکه را در یک سیستم استراتژیک یکپارچه کنید.",
      articleCtaEndButton: "با سیگما همکاری کنید",
      categories: {
        growth: "رشد",
        distribution: "توزیع",
        liquidity: "نقدینگی",
      },
    },
    whatIsSigma: {
      label: "Sigma چیست",
      headline:
        "شبکه زیرساخت رشد مالی برای کریپتو، فارکس، سهام و Web3",
      description:
        "Sigma یک شبکه جهانی زیرساخت رشد مالی است که به صرافی‌های کریپتو، بروکرهای فارکس، prop firmها، KOLها و IBهای سهام و Web3، تریدرها و پلتفرم‌های مالی در جذب کاربر، زیرساخت KOL، برنامه‌های IB/affiliate، فعال‌سازی نقدینگی، مدیریت جامعه، گسترش بازار منطقه‌ای و مشارکت‌های استراتژیک کمک می‌کند. برخلاف آژانس‌های بازاریابی تک‌کاناله، Sigma به‌عنوان لایه عملیاتی رشد بالای کل زنجیره ارزش مالی عمل می‌کند. Sigma بروکر، صرافی، صندوق سرمایه‌گذاری یا مشاور مالی دارای مجوز نیست — وجوه کاربران را مدیریت، نگهداری یا معامله نمی‌کند.",
      pillars: [
        {
          title: "هوش رشد",
          description:
            "ممیزی بازار، تحلیل SEO/SERP رقبا، تحقیق مخاطب و بازخورد product-market fit — هر کمپین با سیگنال شروع می‌شود، نه حدس.",
        },
        {
          title: "شبکه توزیع",
          description:
            "بیش از ۱٬۵۰۰ KOL، IB، مدیر جامعه و شریک BD تأییدشده در MENA، GCC، ترکیه، اروپا، LATAM، CIS و بازارهای فارسی‌زبان — از روز اول قابل استقرار.",
        },
        {
          title: "نقدینگی و حجم",
          description:
            "معماری کمپین که جذب را به حجم معاملاتی تکرارشونده تبدیل می‌کند — VIP/whale onboarding، معرفی market maker، هماهنگی لیستینگ و حلقه‌های retention متناسب با پلتفرم شما.",
        },
      ],
    },
    about: {
      kicker: "ساخته‌شده توسط اپراتورها",
      title: "افراد پشت Sigma",
      description:
        "Sigma توسط تیمی از مشاوران رشد، BD، بازاریابی و گسترش بازار با تجربه عملی در اکوسیستم‌های بزرگ صرافی و پلتفرم‌های مالی هدایت می‌شود — با پشتیبانی اپراتورهای منطقه‌ای در بیش از ۴۰ بازار.",
    },
    metrics: {
      kicker: "شبکه",
      title:
        "مسیریابی جهانی، عمق نقدینگی و تلهمتری درجه اجرا — مهندسی‌شده برای مقیاس.",
      stats: [
        { label: "کل ارزش قفل شده", target: 50, suffix: "B+" },
        { label: "نودهای فعال", target: 14, suffix: "K+" },
        { label: "تاخیر شبکه", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "شبکه",
      title: "گراف جامعه",
      body: "گره‌ها از طریق انگیزه‌های مشترک هم‌راستا می‌شوند. سیگما مش را نقشه‌برداری می‌کند—یال‌ها اعتماد، توان و وضعیت قابل‌تأیید هستند.",
    },
    sigmaPro: {
      badge: "VIP · دسترسی ویژه",
      title: "SigmaPRO — عملیات رشد اختصاصی برای شرکای پرحجم",
      description:
        "توان اختصاصی، مسیریابی اولویت‌دار و میز رشد ارشد برای صرافی‌ها، بروکرها، پروتکل‌ها و شرکای نهادی پرحجم.",
      bullets: [
        "میز رشد اختصاصی با نقشه‌های اجرای تضمین‌شده SLA",
        "مسیریابی اولویت‌دار در مسیرهای نقدینگی و توزیع",
        "تلهمتری محرمانه، گزارش سفارشی و اسکالیشن مستقیم",
        "بازبینی‌های استراتژیک فصلی با رهبری Sigma",
      ],
      footnote: "دسترسی محدود و مشروط به تأیید صلاحیت است.",
    },
    contact: {
      kicker: "آغاز · دسترسی به سیستم اصلی",
      title: "با Sigma در ارتباط بمانید",
      description:
        "همکاری، رشد صرافی و بروکر، درخواست KOL، برنامه‌های IB و پرسش‌های سازمانی — به تیم ایمیل بزنید یا فهرست کانال‌ها را باز کنید.",
      emailCta: "ایمیل",
      socialCta: "کانال‌ها و شبکه‌ها",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "آغاز · دسترسی به سیستم اصلی",
      title: "با Sigma در ارتباط بمانید",
      description:
        "همکاری، رشد صرافی و بروکر، درخواست KOL، برنامه‌های IB و پرسش‌های سازمانی.",
      reachUsPrefix: "راه تماس:",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "ارتباط",
      subtitle:
        "کانال‌های رسمی، شبکه‌های اجتماعی و تماس مستقیم — مثل یک صفحهٔ لینک‌دونی.",
      backHome: "بازگشت به سیگما",
      empty:
        "هنوز لینکی تنظیم نشده. متغیرهای NEXT_PUBLIC_SOCIAL_* را در محیط اجرا قرار دهید (نگاه کنید به .env.example).",
      labels: {
        instagram: "اینستاگرام",
        x: "ایکس",
        linkedin: "لینکدین",
        telegram: "تلگرام",
        discord: "دیسکورد",
        email: "ایمیل",
        website: "وب‌سایت",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "آغاز",
      description: "دسترسی به سیستم اصلی",
      primaryCta: "ورود به اکوسیستم",
      secondaryCta: "درخواست جلسه",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "پشتیبانی زنده",
      liveSupportPanel: { ...livePanelFA },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "باز کردن منو",
        closeMenuAria: "بستن منو",
        languageMenuAria: "انتخاب زبان",
      },
      logoAlt: "SIGMA",
      learnMore: "بیشتر بدانید",
    },
    footer: {
      rights: "© 2026 پروتکل سیگما. تمامی حقوق محفوظ است.",
      statusPrefix: "وضعیت سیستم:",
      statusValue: "بهینه",
      tagline: "وب۳ · استراتژیک · دقیق",
      navAriaLabel: "پاورقی",
      links: [],
    },
    trustedBy: {
      sectionLabel: "مورد اعتماد",
      logos: [],
    },
    testimonials: [],
  },
  AR: {
    nav: {
      system: "النظام",
      capabilities: "القدرات",
      network: "الشبكة",
      metrics: "المؤشرات",
      sigmaPro: "Sigma Pro",
      contact: "اتصل",
      navCta: "شارك مع Sigma",
      insights: "الرؤى",
      insightsAccessLabel: "الوصول",
    },
    insights: {
      pageTitle: "رؤى Sigma",
      pageSubtitle:
        "مذكرات ميدانية من خط نمو التمويل وWeb3 — playbooks إقليمية، اقتصاد IB، استراتيجية KOL وتوزيع الإطلاق.",
      pageEyebrow: "الرؤى",
      filterAllLabel: "الكل",
      readLabel: "اقرأ الرؤية",
      relatedHeading: "رؤى ذات صلة",
      backToInsights: "الرؤى",
      sigmaHome: "سيغما",
      chromeNavAriaLabel: "تنقل الرؤى",
      categoryTablistAriaLabel: "الفئات",
      featuredLabel: "مختار",
      emptyState: "لا توجد مواد في هذا العرض.",
      insightBadge: "رؤية سيغما",
      insightAriaLabel: "رؤية سيغما",
      articleCtaMidHeading: "هل تحتاج بنية تحتية للنمو وليس تسويقاً فقط؟",
      articleCtaMidSupporting:
        "أنظمة تنفيذ للاكتساس والسيولة والوصول للسوق.",
      articleCtaMidButton: "احصل على وصول",
      articleCtaEndHeading: "اعمل مع سيغما",
      articleCtaEndSupporting:
        "اربط المستخدمين والسيولة وتوزيع الشبكة في نظام استراتيجي واحد.",
      articleCtaEndButton: "اعمل مع سيغما",
      categories: {
        growth: "النمو",
        distribution: "التوزيع",
        liquidity: "السيولة",
      },
    },
    whatIsSigma: {
      label: "ما هو Sigma",
      headline:
        "شبكة بنية تحتية للنمو المالي في crypto وforex والأسهم وWeb3",
      description:
        "Sigma شبكة عالمية للبنية التحتية للنمو المالي تساعد بورصات crypto ووسطاء forex وشركات prop وKOL وIB في الأسهم وWeb3 والمتداولين والمنصات المالية على النمو عبر اكتساب المستخدمين، بنية KOL، برامج IB/affiliate، تنشيط السيولة، إدارة المجتمعات، التوسع الإقليمي والشراكات الاستراتيجية. على عكس وكالات التسويق أحادية القناة، تعمل Sigma كطبقة تشغيل نمو فوق سلسلة القيمة المالية بأكملها. Sigma ليست وسيطاً أو بورصة أو صندوق استثمار أو مستشاراً مالياً مرخصاً — ولا تدير أو تحتفظ أو تتداول أموال المستخدمين.",
      pillars: [
        {
          title: "ذكاء النمو",
          description:
            "تدقيق السوق، تحليل SEO/SERP للمنافسين، بحث الجمهور وملاءمة المنتج للسوق — كل حملة تبدأ بالإشارة لا بالافتراض.",
        },
        {
          title: "شبكة التوزيع",
          description:
            "أكثر من 1,500 KOL وIB ومدير مجتمع وشريك BD موثّقين عبر MENA وGCC وتركيا وأوروبا وLATAM وCIS والأسواق الناطقة بالفارسية — جاهزون من اليوم الأول.",
        },
        {
          title: "السيولة والحجم",
          description:
            "هندسة حملات تحوّل الاكتساب إلى حجم تداول متكرر — VIP/whale onboarding، تعريف market makers، تنسيق الإدراج وحلقات احتفاظ مضبوطة لمنصتك.",
        },
      ],
    },
    about: {
      kicker: "بناها مشغّلون",
      title: "الأشخاص وراء Sigma",
      description:
        "تقود Sigma فريق أساسي من مستشاري النمو وBD والتسويق وتوسع السوق بخبرة ميدانية في منظومات البورصات الكبرى والمنصات المالية — مدعوماً بمشغّلين إقليميين في أكثر من 40 سوقاً.",
    },
    metrics: {
      kicker: "الشبكة",
      title:
        "توجيه عالمي، عمق سيولة، وبيانات تشغيل — مصممة للمقياس.",
      stats: [
        { label: "إجمالي القيمة المقفلة", target: 50, suffix: "B+" },
        { label: "العقد النشطة", target: 14, suffix: "K+" },
        { label: "زمن انتظار الشبكة", target: 12, suffix: "ms" },
      ],
    },
    network: {
      kicker: "الشبكة",
      title: "بيان مجتمعي",
      body: "تنسَّق العقد عبر حوافز مشتركة. ترسم سيغما الشبكة — الحواف هي الثقة والسعة وحالة يمكن التحقق منها.",
    },
    sigmaPro: {
      badge: "VIP · وصول نخبوي",
      title: "SigmaPRO — عمليات نمو مخصصة للشركاء عالي الحجم",
      description:
        "سعة مخصصة، توجيه أسبقية، ومكتب نمو أول للبورصات والوسطاء والبروتوكولات والشركاء المؤسسيين عالي الحجم.",
      bullets: [
        "مكتب نمو مخصص مع خطط تنفيذ واتفاقيات مستوى الخدمة",
        "توجيه أسبقية عبر مسارات السيولة والتوزيع",
        "بيانات تشغيل سرية، تقارير مخصصة، وتصعيد مباشر",
        "مراجعات استراتيجية ربع سنوية مع قيادة Sigma",
      ],
      footnote: "الوصول محدود ويُمنح بعد الأهلية.",
    },
    contact: {
      kicker: "ابدأ · الوصول إلى النظام",
      title: "ابقَ على تواصل مع Sigma",
      description:
        "للشراكات ونمو البورصات والوسطاء وطلبات KOL وبرامج IB والاستفسارات المؤسسية — راسل الفريق أو افتح قائمة القنوات.",
      emailCta: "البريد",
      socialCta: "القنوات والشبكات",
      fallbackMailto: "mailto:BD@sigmaa.pro",
    },
    stayConnected: {
      kicker: "ابدأ · الوصول إلى النظام",
      title: "ابقَ على تواصل مع Sigma",
      description:
        "للشراكات ونمو البورصات والوسطاء وطلبات KOL وبرامج IB والاستفسارات المؤسسية.",
      reachUsPrefix: "تواصل معنا:",
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
    },
    contactHub: {
      pageEyebrow: "SIGMA",
      title: "تواصل",
      subtitle:
        "قنوات رسمية، حسابات اجتماعية، واتصال مباشر — كصفحة روابط موحّدة.",
      backHome: "العودة إلى سيغما",
      empty:
        "لم يتم ضبط الروابط بعد. عيّن متغيرات NEXT_PUBLIC_SOCIAL_* في البيئة (راجع .env.example).",
      labels: {
        instagram: "إنستغرام",
        x: "X",
        linkedin: "لينكدإن",
        telegram: "تيليغرام",
        discord: "ديسكورد",
        email: "البريد",
        website: "الموقع",
      },
      footerLine: "© 2026 SIGMA",
    },
    cta: {
      title: "إطلاق",
      description: "الوصول إلى النظام الأساسي",
      primaryCta: "دخول المنظومة",
      secondaryCta: "اطلب جلسة",
      primaryHref: "#capabilities",
      secondaryHref: "#contact",
    },
    ui: {
      liveSupport: "دعم مباشر",
      liveSupportPanel: { ...livePanelAR },
      navChrome: {
        brandAria: "SIGMA",
        openMenuAria: "فتح القائمة",
        closeMenuAria: "إغلاق القائمة",
        languageMenuAria: "اختيار اللغة",
      },
      logoAlt: "SIGMA",
      learnMore: "اعرف المزيد",
    },
    footer: {
      rights: "© 2026 بروتوكول سيغما. جميع الحقوق محفوظة.",
      statusPrefix: "حالة النظام:",
      statusValue: "مثالي",
      tagline: "Web3 · استراتيجية · دقة",
      navAriaLabel: "تذييل",
      links: [],
    },
    trustedBy: {
      sectionLabel: "يثقون بنا",
      logos: [],
    },
    testimonials: [],
  },
};
