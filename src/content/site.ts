import type { LangCode, SiteTranslations } from "./types";

export type SiteRest = Omit<SiteTranslations, "hero" | "services">;

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

export const siteRestByLang: Record<LangCode, SiteRest> = {
  EN: {
    nav: {
      system: "System",
      capabilities: "Capabilities",
      network: "Network",
      metrics: "Metrics",
      sigmaPro: "Sigma Pro",
      contact: "Contact",
      navCta: "Get Access",
      insights: "Insights",
      insightsAccessLabel: "Access",
    },
    whatIsSigma: {
      label: "WHAT IS SIGMA",
      headline: "A Strategic Growth Engine for Web3",
      description:
        "Sigma connects liquidity, users, and distribution into one scalable system.",
      pillars: [
        {
          title: "User Acquisition",
          description:
            "From zero to high-intent traders through targeted funnels.",
        },
        {
          title: "Liquidity Activation",
          description: "Turning traffic into real volume and sustained activity.",
        },
        {
          title: "Network Expansion",
          description:
            "Scaling through KOLs, communities, and strategic partnerships.",
        },
      ],
    },
    about: {
      kicker: "ABOUT US",
      title: "WE DO NOT ADAPT TO THE FUTURE. WE ENGINEER IT.",
      description:
        "Sigma operates at the intersection of high-frequency finance, military-grade cryptography, and advanced distributed networks. Precision is not an option; it is the protocol.",
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
      title: "SigmaPRO",
      description:
        "Private throughput, priority routing, and dedicated growth operations for high-volume teams, exchanges, and protocols.",
      bullets: [
        "Dedicated growth desk with SLA-backed execution playbooks",
        "Priority routing across liquidity and distribution surfaces",
        "Confidential telemetry, bespoke reporting, and direct escalation",
      ],
      footnote: "Access is limited and subject to qualification.",
    },
    contact: {
      kicker: "CONTACT",
      title: "REACH SIGMA",
      description:
        "Partnerships, media, and institutional inquiries — email the desk or open the full channel list (social, Telegram, and more).",
      emailCta: "Email",
      socialCta: "Channels & social",
      fallbackMailto: "mailto:hello@sigma.io",
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
      navCta: "Erişim Al",
      insights: "İçgörüler",
      insightsAccessLabel: "Erişim",
    },
    whatIsSigma: {
      label: "SIGMA NEDİR",
      headline: "Web3 İçin Stratejik Bir Büyüme Motoru",
      description:
        "Sigma, likiditeyi, kullanıcıları ve dağıtımı tek bir ölçeklenebilir sistemde birleştirir.",
      pillars: [
        {
          title: "Kullanıcı Edinimi",
          description: "Hedefli hunilerle sıfırdan yüksek niyetli trader’lara.",
        },
        {
          title: "Likidite Aktivasyonu",
          description: "Trafiği gerçek hacim ve sürdürülebilir aktiviteye dönüştürme.",
        },
        {
          title: "Ağ Genişlemesi",
          description: "KOL’lar, topluluklar ve stratejik ortaklıklarla ölçekleme.",
        },
      ],
    },
    about: {
      kicker: "HAKKIMIZDA",
      title: "GELECEĞE UYUM SAĞLAMIYORUZ. ONU İNŞA EDİYORUZ.",
      description:
        "Sigma, yüksek frekanslı finans, askeri düzeyde kriptografi ve gelişmiş dağıtık ağların kesişiminde çalışır. Kesinlik bir seçenek değil; protokoldür.",
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
      title: "SigmaPRO",
      description:
        "Yüksek hacimli ekipler, borsalar ve protokoller için özel işlem hacmi, öncelikli yönlendirme ve ayrılmış büyüme operasyonları.",
      bullets: [
        "SLA destekli yürütme planlarıyla ayrılmış büyüme masası",
        "Likidite ve dağıtım katmanlarında öncelikli yönlendirme",
        "Gizli telemetri, özel raporlama ve doğrudan eskalasyon",
      ],
      footnote: "Erişim sınırlıdır ve uygunluk koşullarına tabidir.",
    },
    contact: {
      kicker: "İLETİŞİM",
      title: "SIGMA İLE TEMAS",
      description:
        "Ortaklıklar, basın ve kurumsal talepler — ekibe e-posta gönderin veya tüm kanallar listesini açın.",
      emailCta: "E-posta",
      socialCta: "Kanallar ve sosyal",
      fallbackMailto: "mailto:hello@sigma.io",
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
      navCta: "获取权限",
      insights: "洞察",
      insightsAccessLabel: "接入",
    },
    whatIsSigma: {
      label: "什么是 SIGMA",
      headline: "面向 Web3 的战略增长引擎",
      description: "Sigma 将流动性、用户与分发整合为一套可扩展的系统。",
      pillars: [
        {
          title: "用户获取",
          description: "通过精准漏斗，从零到高意向交易者。",
        },
        {
          title: "流动性激活",
          description: "把流量转化为真实交易量与持续活跃度。",
        },
        {
          title: "网络扩张",
          description: "通过 KOL、社区与战略合作实现规模化。",
        },
      ],
    },
    about: {
      kicker: "关于我们",
      title: "我们不适应未来。我们创造未来。",
      description:
        "Sigma 运作于高频金融、军用级密码学和高级分布式网络的交汇处。精准不是一种选择；它就是协议。",
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
      title: "SigmaPRO",
      description:
        "为高交易量团队、交易所与协议提供私有吞吐、优先路由与专属增长运营。",
      bullets: [
        "专属增长台与 SLA 级执行方案",
        "流动性与分发路径的优先路由",
        "保密遥测、定制报告与直连升级",
      ],
      footnote: "名额有限，需通过资格审核。",
    },
    contact: {
      kicker: "联系",
      title: "联系 SIGMA",
      description:
        "合作、媒体与机构咨询 — 发送邮件或打开完整渠道列表（社交、Telegram 等）。",
      emailCta: "邮件",
      socialCta: "渠道与社交",
      fallbackMailto: "mailto:hello@sigma.io",
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
  FA: {
    nav: {
      system: "سیستم",
      capabilities: "قابلیت‌ها",
      network: "شبکه",
      metrics: "متریک‌ها",
      sigmaPro: "Sigma Pro",
      contact: "تماس",
      navCta: "دریافت دسترسی",
      insights: "بینش‌ها",
      insightsAccessLabel: "دسترسی",
    },
    whatIsSigma: {
      label: "سیگما چیست",
      headline: "موتور رشد استراتژیک برای Web3",
      description:
        "سیگما نقدینگی، کاربران و توزیع را در یک سیستم مقیاس‌پذیر به هم وصل می‌کند.",
      pillars: [
        {
          title: "جذب کاربر",
          description: "از صفر تا معامله‌گران با نیت بالا از مسیرهای هدفمند.",
        },
        {
          title: "فعال‌سازی نقدینگی",
          description: "تبدیل ترافیک به حجم واقعی و فعالیت پایدار.",
        },
        {
          title: "گسترش شبکه",
          description: "مقیاس‌دهی از طریق KOLها، جامعه‌ها و مشارکت‌های استراتژیک.",
        },
      ],
    },
    about: {
      kicker: "دربارهٔ ما",
      title: "ما با آینده سازگار نمی‌شویم. ما آن را مهندسی می‌کنیم.",
      description:
        "سیگما در تقاطع مالی با فرکانس بالا، رمزنگاری درجه نظامی و شبکه‌های توزیع شده پیشرفته عمل می‌کند. دقت یک گزینه نیست؛ این خود پروتکل است.",
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
      title: "SigmaPRO",
      description:
        "برای تیم‌های پرحجم، صرافی‌ها و پروتکل‌ها: توان اختصاصی، مسیریابی اولویت‌دار و عملیات رشد اختصاصی.",
      bullets: [
        "میز رشد اختصاصی با نقشه‌های اجرای تضمین‌شده SLA",
        "مسیریابی اولویت‌دار در مسیرهای نقدینگی و توزیع",
        "تلهمتری محرمانه، گزارش سفارشی و اسکالیشن مستقیم",
      ],
      footnote: "دسترسی محدود و مشروط به تأیید صلاحیت است.",
    },
    contact: {
      kicker: "تماس",
      title: "ارتباط با سیگما",
      description:
        "همکاری، رسانه و درخواست‌های سازمانی — به تیم ایمیل بزنید یا فهرست کامل کانال‌ها را باز کنید.",
      emailCta: "ایمیل",
      socialCta: "کانال‌ها و شبکه‌ها",
      fallbackMailto: "mailto:hello@sigma.io",
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
};
