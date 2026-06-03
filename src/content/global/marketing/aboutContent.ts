import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

export type AboutCoreMember = {
  name: string;
  role: string;
  bio: string;
};

export type AboutPageBody = {
  kicker: string;
  headline: string;
  subhead: string;
  bodyLine: string;
  identity: [string, string, string];
  whySigmaExists: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  founderNote: {
    eyebrow: string;
    title: string;
    quote: string;
    attribution: string;
  };
  coreTeam: {
    eyebrow: string;
    title: string;
    intro: string;
    members: AboutCoreMember[];
    extendedNetwork: string;
    ndaLine: string;
    ctaLabel: string;
    ctaHref: string;
  };
  industryPov: {
    eyebrow: string;
    title: string;
    intro: string;
    principles: string[];
  };
  insideNetwork: {
    eyebrow: string;
    title: string;
    body: string;
    operatingPoints: { title: string; body: string }[];
  };
  vision: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  recognition: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  transparency: {
    eyebrow: string;
    title: string;
    body: string;
  };
  invitation: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

export const aboutPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  TR: {
    title: "Sigma Hakkında | Küresel Web3 Büyüme Ağının Operatörleri",
    description:
      "Sigma; borsaları büyüten, KOL portföyleri yöneten ve IB programları kuran operatörler tarafından, bu deneyimi altyapıya dönüştürerek yönetilir.",
  },
  FA: {
    title: "درباره Sigma | اپراتورهای پشت یک شبکه جهانی رشد Web3",
    description:
      "Sigma توسط اپراتورهایی هدایت می‌شود که درون صنعت صرافی‌ها را رشد داده‌اند، پورتفوی KOL را مدیریت کرده‌اند و برنامه‌های IB ساخته‌اند.",
  },
  ZH: {
    title: "关于 Sigma | 全球 Web3 增长网络背后的操盘团队",
    description:
      "Sigma 由来自行业内部的一线操盘团队领导，他们曾主导交易所增长、KOL 组合运营和 IB 体系搭建。",
  },
  ES: {
    title: "Sobre Sigma | Operadores detrás de una red global de crecimiento Web3",
    description:
      "Sigma está liderada por operadores que hicieron crecer exchanges, gestionaron portafolios KOL y construyeron programas IB desde dentro de la industria.",
  },
  RU: {
    title: "О Sigma | Операторы глобальной сети роста Web3",
    description:
      "Sigma возглавляют операторы, которые изнутри индустрии масштабировали биржи, вели KOL-портфели и строили IB-программы.",
  },
  AR: {
    title: "حول Sigma | المشغّلون خلف شبكة نمو Web3 عالمية",
    description:
      "تقود Sigma نخبة من المشغّلين الذين نمّوا منصات التداول وأداروا محافظ KOL وبنوا برامج IB من داخل الصناعة.",
  },
};

const EN_CONTENT: AboutPageBody = {
  kicker: "Who We Are",
  headline: "We Did Not Learn This Market From a Deck. We Built Inside It.",
  subhead:
    "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  bodyLine:
    "This page is about the people, the principles, and the path that brought Sigma into existence — not what we sell.",
  identity: ["Strategic.", "Trusted.", "Scalable."],
  whySigmaExists: {
    eyebrow: "Why Sigma Exists",
    title: "The Gap We Kept Seeing From the Inside",
    paragraphs: [
      "Most growth networks in crypto and finance were built by marketers looking at this industry from outside. We were already inside it.",
      "We watched exchanges spend millions on user acquisition while their IB programs ran in a different room. We watched brokers pay for KOL campaigns that hit the wrong audience in the wrong language. We watched token projects launch into 40 countries with one English deck and a Notion page. We watched creators build huge audiences they could not monetize. We watched IBs grind referrals without infrastructure, dashboards, or partner support.",
      "Marketing, product, KOLs, IBs, distribution, liquidity — all running on different clocks. Growth was leaking everywhere in between, and nobody was building the layer that connects them.",
      "Sigma exists to be that layer.",
    ],
  },
  story: {
    eyebrow: "Our Story",
    title: "How Sigma Was Built",
    paragraphs: [
      "The earliest version of Sigma was a group chat. Operators across crypto exchanges, broker desks, KOL networks, and BD teams — people who had worked on growth programs at LBank, BingX, MEXC, and during the Binance-era expansion, alongside multiple other crypto and finance platforms — comparing notes on what was actually working in different regions.",
      "What started as informal coordination became structural. We realized the same playbooks, the same KOL relationships, the same IB frameworks, the same regional intelligence — could be operated as infrastructure, not as one-off favors.",
      "We began running joint campaigns. Then joint launches. Then we noticed a pattern: every venue that plugged into the shared network grew faster than the ones that kept running alone. Not because the campaigns were more clever, but because acquisition, distribution, and liquidity were finally running on the same operating clock.",
      "That was the moment Sigma became a network, not a circle.",
      "Today, Sigma is a global infrastructure layer connecting platforms, creators, partners, and traders across crypto, forex, stocks, and Web3 — with operators on the ground in Dubai, Istanbul, Bali, Canada, and across MENA, GCC, Turkey, LATAM, CIS, and Persian-speaking markets.",
    ],
  },
  founderNote: {
    eyebrow: "From the Founder",
    title: "A Note from Omid Modaber",
    quote:
      "Sigma is the network I wished existed when I started inside this industry. Every operator I knew was solving the same problems alone — finding the right KOLs, structuring the right IB deals, breaking into the right regions, building the right campaigns. Everyone had pieces of the answer. Nobody had the system.\n\nSigma is the system. It is the infrastructure I would want to plug into if I were running an exchange today, growing a KOL channel, scaling an IB business, or entering a new market.\n\nWe are not here to be loud. We are here to be useful. Long after the bull market noise fades, the operators who built quietly — with structure, trust, and real performance — are the ones who compound. That is the brand we are building.",
    attribution: "Omid Modaber, Founder, Sigma",
  },
  coreTeam: {
    eyebrow: "The Core Team",
    title: "Who Builds Sigma",
    intro: "Sigma is led by five core partners, each running a domain of the network.",
    members: [
      {
        name: "Omid Modaber",
        role: "Strategic Growth Consultant",
        bio: "Sets the long-term direction of Sigma. Focused on strategy, exchange partnerships, regional expansion, and the operating principles the network runs on.",
      },
      {
        name: "Arad Moaf",
        role: "Strategic Growth Consultant",
        bio: "Owns how Sigma enters and grows in new regions. Builds the relationships and execution frameworks that make Sigma operate locally — not just globally.",
      },
      {
        name: "Novin Ghasemi",
        role: "Strategic Growth Consultant",
        bio: "Runs the engine room. Translates strategy into campaigns, partnerships, and growth motions across the network’s platforms and creators.",
      },
      {
        name: "Hosein Rostami",
        role: "Strategic Growth Consultant",
        bio: "Connects the moving parts. Ensures that what is promised on the strategy side is actually executable on the operations side — across teams, regions, and partners.",
      },
      {
        name: "Mostafa Moradi",
        role: "Strategic Growth Consultant",
        bio: "Owns Sigma’s community side. Builds and maintains the human layer that turns campaigns into long-term loyalty and creators into compounding networks.",
      },
    ],
    extendedNetwork:
      "Beyond the five core partners, Sigma operates with regional community managers, KOL managers, BD specialists, content collaborators, localization leads, and partner operators in every priority market.",
    ndaLine:
      "Several Sigma team members hold senior roles inside operating financial platforms. Specific platform affiliations are protected under NDA.",
    ctaLabel: "Full Team Page",
    ctaHref: ROUTES.team,
  },
  industryPov: {
    eyebrow: "Industry POV",
    title: "The Principles Behind Every Decision We Make",
    intro:
      "These are the convictions Sigma was built on. They explain not just what we do, but what we refuse to do.",
    principles: [
      "We believe growth is a system, not a campaign. Any agency can run a campaign. Almost none can build the operating system around it. We build the system first — campaigns are outputs, not strategies.",
      "We believe operators beat marketers in this industry. The financial industry is too technical, too risk-aware, and too compliance-bound for outside marketers to fake. The people running growth should have lived inside the product.",
      "We believe distribution is the most underbuilt layer in Web3. Everyone builds product. Almost no one builds the network that gets that product to the right region, the right language, the right creator, the right user — in the right order. That is the gap we fill.",
      "We believe trust outlasts every market cycle. Bull markets reward hype. Bear markets reward trust. We are building for both — which means no guaranteed-profit promises, no fake numbers, no shortcuts that cost partners later.",
      "We believe regional execution beats global average. “Web3 is global” is true at the airport. On the ground, every market has its own KOLs, its own language, its own payment behavior, its own compliance constraints. We grow region by region.",
      "We believe in long compounding over short impressions. We measure success in quarters and years, not weeks. Vanity metrics do not appear in Sigma reports.",
    ],
  },
  insideNetwork: {
    eyebrow: "Inside the Network",
    title: "How We Run",
    body:
      "Sigma is not built like a traditional agency. There is no creative department, no account managers, no client-services layer between operators and partners.",
    operatingPoints: [
      {
        title: "One operating rhythm.",
        body: "Every partner engagement runs on a weekly telemetry cadence. Strategy, execution, and reporting happen on the same clock — not in different rooms.",
      },
      {
        title: "Senior-led delivery.",
        body: "The person you meet at kickoff is the person delivering the work three months later. We do not hand off to junior teams after the contract closes.",
      },
      {
        title: "Cross-domain teams.",
        body: "Every Sigma engagement includes operators from BD, KOL, community, and analytics — not handed off between silos. Growth problems are cross-functional; the team should be too.",
      },
      {
        title: "Regional autonomy with central intelligence.",
        body: "Local operators run local execution. Central Sigma intelligence shares what is working across regions — so playbooks compound instead of being reinvented.",
      },
    ],
  },
  vision: {
    eyebrow: "Vision",
    title: "The Sigma We’re Building",
    paragraphs: [
      "Inside one year, Sigma will be the recognized financial growth network across MENA, GCC, Turkey, Europe, LATAM, CIS, and Persian-speaking communities — with named regional operators and live execution in every priority market.",
      "Inside three years, Sigma will be the default growth infrastructure layer for Finance and Web3 globally — with proprietary growth tools, an institutional KOL and BD network, helper products serving every layer of the financial value chain, and a brand position alongside the most trusted names in crypto growth.",
      "But the more honest version of the vision is this: we want to be the network that operators inside the industry recommend to each other when nobody is watching. Public credibility is built; private credibility is earned.",
      "We are building for private credibility first.",
    ],
  },
  recognition: {
    eyebrow: "The Network That Trusts Sigma",
    title: "Who We Work With",
    body:
      "Sigma’s team has contributed to growth, BD, and KOL operations across major global exchange ecosystems, multiple crypto and finance platforms, and a network of token projects, brokers, prop firms, and Web3 protocols. Specific platform names and engagement details are protected under NDA. Verified case studies and references are available to qualified partners on request.",
    ctaLabel: "Request References & Case Studies",
    ctaHref: ROUTES.contact,
  },
  transparency: {
    eyebrow: "Transparency",
    title: "For the Avoidance of Doubt",
    body:
      "Sigma is a growth network. Sigma is not a broker, exchange, investment fund, fund manager, or licensed financial advisor. Sigma does not hold, custody, or trade user funds. Sigma does not guarantee profits, withdrawals, or financial outcomes. Users are responsible for their own financial decisions and regulatory compliance.",
  },
  invitation: {
    eyebrow: "If You’re Reading This",
    title: "Two Kinds of People Should Get In Touch",
    body:
      "If you operate a platform, run a KOL channel, lead an IB business, or trade at serious volume — and you have read this page and felt that we are speaking the same language — get in touch. That alignment usually predicts a good partnership.\n\nIf you came to this page looking for guaranteed returns, magic signals, or a shortcut to overnight growth — we are not the network for you, and we will save us both some time by saying so here.",
    primaryCtaLabel: "Partner with Sigma",
    primaryCtaHref: ROUTES.contact,
    secondaryCtaLabel: "Apply as KOL / IB",
    secondaryCtaHref: ROUTES.contact,
  },
};

function coreMembersByRole(role: string): AboutCoreMember[] {
  return EN_CONTENT.coreTeam.members.map((member) => ({ ...member, role }));
}

export const aboutPageContentByLang: Record<LangCode, AboutPageBody> = {
  EN: EN_CONTENT,
  TR: {
    ...EN_CONTENT,
    kicker: "Biz Kimiz",
    headline: "Bu Pazarı Sunumdan Öğrenmedik. İçinde İnşa Ettik.",
    subhead: "Sigma, sektörden gelen operatörlerin gerçek saha deneyimini altyapıya dönüştürmesiyle kuruldu.",
    bodyLine: "Bu sayfa ne sattığımızı değil; Sigma'yı kuran insanları, ilkeleri ve yolu anlatır.",
    identity: ["Stratejik.", "Güvenilir.", "Ölçeklenebilir."],
    whySigmaExists: {
      eyebrow: "Sigma Neden Var",
      title: "İçeriden Sürekli Gördüğümüz Boşluk",
      paragraphs: [
        "Büyüme, KOL, IB, ürün ve likidite ekipleri çoğu zaman ayrı çalışıyordu; sonuçta performans parçalanıyordu.",
        "Sigma bu parçaları tek ritimde çalıştıran operasyon katmanı olarak kuruldu.",
      ],
    },
    story: {
      eyebrow: "Hikayemiz",
      title: "Sigma Nasıl Kuruldu",
      paragraphs: [
        "İlk hali farklı borsa ve büyüme operatörlerinin not paylaştığı bir koordinasyon alanıydı.",
        "Zamanla tekrar eden yöntemleri tek seferlik destek olmaktan çıkarıp ölçeklenebilir bir sisteme dönüştürdük.",
      ],
    },
    founderNote: {
      eyebrow: "Kurucudan",
      title: "Omid Modaber’den Not",
      quote:
        "Sigma, sektörde çalışırken ihtiyaç duyduğum sistemin kendisi. Gürültüye değil faydaya odaklanıyoruz; uzun vadeli güven ve ölçülebilir performans inşa ediyoruz.",
      attribution: "Omid Modaber, Kurucu, Sigma",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "Çekirdek Ekip",
      title: "Sigma’yı Kim İnşa Ediyor",
      intro: "Sigma, ağın farklı alanlarını yöneten beş çekirdek ortak tarafından yönetilir.",
      members: coreMembersByRole("Stratejik Büyüme Danışmanı"),
      extendedNetwork:
        "Çekirdek ortakların ötesinde Sigma, öncelikli pazarlarda bölgesel topluluk, KOL, BD, içerik ve lokalizasyon operatörleriyle çalışır.",
      ndaLine:
        "Bazı Sigma ekip üyeleri aktif finansal platformlarda kıdemli rollerdedir. Platform detayları NDA kapsamındadır.",
      ctaLabel: "Tam Ekip Sayfası",
    },
    industryPov: {
      eyebrow: "Sektör Perspektifi",
      title: "Kararlarımızı Yöneten İlkeler",
      intro: "Yaptığımız işi ve yapmayı reddettiğimiz şeyleri belirleyen temel ilkeler.",
      principles: [
        "Büyüme bir kampanya değil, bir sistemdir.",
        "Bu sektörde saha operatörleri dışarıdan pazarlamacılardan daha güçlü sonuç üretir.",
        "Küresel ortalama yerine bölgesel uygulama kalıcı büyüme sağlar.",
      ],
    },
    insideNetwork: {
      eyebrow: "Ağın İçinden",
      title: "Nasıl Çalışıyoruz",
      body: "Sigma klasik ajans modelinde çalışmaz; strateji ve icra aynı ekipte ilerler.",
      operatingPoints: [
        { title: "Tek operasyon ritmi.", body: "Strateji, uygulama ve raporlama aynı haftalık ritimde yürür." },
        { title: "Kıdemli teslimat.", body: "İlk görüşmedeki ekip, operasyon boyunca işi sahiplenmeye devam eder." },
      ],
    },
    vision: {
      eyebrow: "Vizyon",
      title: "İnşa Ettiğimiz Sigma",
      paragraphs: [
        "Hedefimiz, öncelikli bölgelerde tanınan güvenilir büyüme altyapısı olmaktır.",
        "Uzun vadede finans ve Web3 için varsayılan büyüme işletim katmanına dönüşmeyi amaçlıyoruz.",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "Sigma’ya Güvenen Ağ",
      title: "Birlikte Çalıştıklarımız",
      body:
        "Sigma ekibi, global borsa ekosistemleri ve finans platformlarında büyüme, BD ve KOL operasyonlarına katkı sundu. Detaylar NDA kapsamında korunur.",
      ctaLabel: "Referans ve Vaka Talep Et",
    },
    transparency: {
      eyebrow: "Şeffaflık",
      title: "Açık Beyan",
      body:
        "Sigma bir büyüme ağıdır; broker, borsa, yatırım fonu veya lisanslı finansal danışman değildir. Kullanıcı fonlarını tutmaz ve finansal sonuç garantisi vermez.",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "Bunu Okuyorsanız",
      title: "Bizimle İletişime Geçmesi Gereken İki Kitle Var",
      body:
        "Platform, KOL kanalı, IB işi veya yüksek hacimli işlem yönetiyorsanız ve yaklaşımımız size uyuyorsa, bağlantı kuralım.\n\nHızlı kazanç vaadi arıyorsanız Sigma doğru adres değildir.",
      primaryCtaLabel: "Sigma ile Ortak Olun",
      secondaryCtaLabel: "KOL / IB Olarak Başvurun",
    },
  },
  FA: {
    ...EN_CONTENT,
    kicker: "ما که هستیم",
    headline: "این بازار را از روی دک یاد نگرفتیم؛ داخلش ساختیم.",
    subhead: "Sigma نتیجه تجربه واقعی اپراتورهایی است که رشد صرافی، KOL و IB را از داخل صنعت اجرا کرده‌اند.",
    bodyLine: "این صفحه درباره چیزی که می‌فروشیم نیست؛ درباره آدم‌ها، اصول و مسیر شکل‌گیری Sigma است.",
    identity: ["استراتژیک.", "قابل‌اعتماد.", "مقیاس‌پذیر."],
    whySigmaExists: {
      eyebrow: "چرا Sigma وجود دارد",
      title: "خلائی که از داخل همیشه می‌دیدیم",
      paragraphs: [
        "تیم‌های رشد، KOL، IB، محصول و نقدینگی معمولاً جدا از هم کار می‌کردند و خروجی در میانه راه هدر می‌رفت.",
        "Sigma برای یکپارچه‌کردن این لایه‌ها با یک ریتم عملیاتی مشترک ساخته شد.",
      ],
    },
    story: {
      eyebrow: "داستان ما",
      title: "Sigma چگونه ساخته شد",
      paragraphs: [
        "نسخه اولیه Sigma یک فضای هماهنگی میان اپراتورهای بایننس‌-محور، صرافی‌ها و تیم‌های رشد بود.",
        "همان پلی‌بوک‌های تکرارشونده را از همکاری‌های موردی به یک سیستم زیرساختی تبدیل کردیم.",
      ],
    },
    founderNote: {
      eyebrow: "از طرف بنیان‌گذار",
      title: "یادداشتی از Omid Modaber",
      quote:
        "Sigma همان سیستمی است که در سال‌های فعالیت داخل صنعت به آن نیاز داشتم. تمرکز ما روی سروصدا نیست؛ روی کار مفید، ساختار، اعتماد و عملکرد پایدار است.",
      attribution: "Omid Modaber، بنیان‌گذار Sigma",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "تیم اصلی",
      title: "چه کسانی Sigma را می‌سازند",
      intro: "Sigma توسط پنج شریک اصلی مدیریت می‌شود که هرکدام یک حوزه عملیاتی شبکه را هدایت می‌کنند.",
      members: coreMembersByRole("مشاور رشد استراتژیک"),
      extendedNetwork:
        "فراتر از تیم اصلی، Sigma با مدیران کامیونیتی منطقه‌ای، مدیران KOL، متخصصان BD، همکاران محتوا و لیدهای بومی‌سازی در بازارهای اولویت‌دار کار می‌کند.",
      ndaLine:
        "برخی اعضای تیم Sigma در پلتفرم‌های مالی فعال نقش ارشد دارند. جزئیات وابستگی‌ها تحت NDA محافظت می‌شود.",
      ctaLabel: "صفحه کامل تیم",
    },
    industryPov: {
      eyebrow: "نگاه صنعتی",
      title: "اصولی که تصمیم‌های ما را هدایت می‌کند",
      intro: "این‌ها اصولی هستند که نشان می‌دهند چه کارهایی انجام می‌دهیم و چه کارهایی را انجام نمی‌دهیم.",
      principles: [
        "رشد یک سیستم است، نه یک کمپین مقطعی.",
        "در این صنعت، اپراتورهای داخل محصول بهتر از مارکترهای بیرونی نتیجه می‌سازند.",
        "اجرای منطقه‌ای دقیق از میانگین جهانی ارزشمندتر است.",
      ],
    },
    insideNetwork: {
      eyebrow: "داخل شبکه",
      title: "چطور عمل می‌کنیم",
      body: "Sigma مثل آژانس سنتی ساخته نشده؛ استراتژی و اجرا در یک ریتم واحد پیش می‌رود.",
      operatingPoints: [
        { title: "یک ریتم عملیاتی.", body: "استراتژی، اجرا و گزارش‌گیری در یک چرخه هفتگی مشترک هم‌زمان می‌شود." },
        { title: "تحویل توسط نیروهای ارشد.", body: "همان تیمی که شروع می‌کند، تحویل عملیاتی را ادامه می‌دهد." },
      ],
    },
    vision: {
      eyebrow: "چشم‌انداز",
      title: "Sigma که می‌سازیم",
      paragraphs: [
        "هدف کوتاه‌مدت ما تبدیل‌شدن به شبکه رشد قابل‌اعتماد در بازارهای اولویت‌دار است.",
        "هدف بلندمدت ما ساخت لایه عملیاتی پیش‌فرض رشد برای Finance و Web3 است.",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "شبکه‌ای که به Sigma اعتماد دارد",
      title: "با چه کسانی کار می‌کنیم",
      body:
        "تیم Sigma در عملیات رشد، BD و KOL در اکوسیستم‌های بزرگ صرافی و پلتفرم‌های مالی نقش داشته است. جزئیات همکاری‌ها تحت NDA محفوظ است.",
      ctaLabel: "درخواست رفرنس و کیس‌استادی",
    },
    transparency: {
      eyebrow: "شفافیت",
      title: "بیانیه روشن",
      body:
        "Sigma یک شبکه رشد است؛ Sigma بروکر، صرافی، صندوق سرمایه‌گذاری یا مشاور مالی دارای مجوز نیست. Sigma نگهداری وجوه کاربران یا تضمین سود مالی ارائه نمی‌دهد.",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "اگر این صفحه را می‌خوانید",
      title: "دو گروه بهتر است با ما ارتباط بگیرند",
      body:
        "اگر پلتفرم، کانال KOL، کسب‌وکار IB یا معاملات جدی را مدیریت می‌کنید و با رویکرد ما هم‌راستا هستید، با ما ارتباط بگیرید.\n\nاگر دنبال وعده سود تضمینی هستید، Sigma مناسب شما نیست.",
      primaryCtaLabel: "همکاری با Sigma",
      secondaryCtaLabel: "درخواست به‌عنوان KOL / IB",
    },
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "我们是谁",
    headline: "我们不是从演示文稿学会这个市场，而是在其中搭建出来的。",
    subhead: "Sigma 来自一线操盘经验：先做增长，再把方法沉淀为可复用的基础设施。",
    bodyLine: "这一页讲的不是销售话术，而是构成 Sigma 的人、原则与路径。",
    identity: ["战略化.", "可信赖.", "可扩展."],
    whySigmaExists: {
      eyebrow: "Sigma 为什么存在",
      title: "我们在行业内部反复看到的断层",
      paragraphs: [
        "增长、KOL、IB、产品与流动性常常各自运转，导致执行断裂与效率损失。",
        "Sigma 的目标是把这些关键层统一到同一套运营节奏中。",
      ],
    },
    story: {
      eyebrow: "我们的故事",
      title: "Sigma 如何建立",
      paragraphs: [
        "最早的 Sigma 是一群交易所与增长操盘手之间的信息协作网络。",
        "随后我们把重复验证的方法沉淀为系统化能力，从临时协作升级为基础设施。",
      ],
    },
    founderNote: {
      eyebrow: "来自创始人",
      title: "Omid Modaber 的一段话",
      quote:
        "Sigma 是我在行业内部最希望能直接接入的系统。我们不追求喧哗，而是追求长期有效、可验证且可复用的增长执行。",
      attribution: "Omid Modaber，Sigma 创始人",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "核心团队",
      title: "谁在建设 Sigma",
      intro: "Sigma 由五位核心合伙人共同领导，分别负责网络中的关键域。",
      members: coreMembersByRole("战略增长顾问"),
      extendedNetwork:
        "除核心团队外，Sigma 还与区域社群经理、KOL 经理、BD 专家、内容协作者与本地化负责人协同运营。",
      ndaLine: "Sigma 部分成员在金融平台担任高级岗位，具体平台关联受 NDA 保护。",
      ctaLabel: "查看完整团队",
    },
    industryPov: {
      eyebrow: "行业观点",
      title: "我们决策背后的原则",
      intro: "这些原则定义了我们做什么，也定义了我们明确不做什么。",
      principles: [
        "增长首先是系统工程，而不是单次 campaign。",
        "在这个行业里，产品内操盘经验比外部营销包装更关键。",
        "区域化执行优于“全球平均化”执行。",
      ],
    },
    insideNetwork: {
      eyebrow: "网络内部",
      title: "我们的运行方式",
      body: "Sigma 不是传统代理模式，策略与执行由同一运营节奏驱动。",
      operatingPoints: [
        { title: "统一运营节奏。", body: "策略、执行与复盘在同一周节奏下推进。" },
        { title: "高级成员主导交付。", body: "启动会议中的核心成员会持续参与后续执行。" },
      ],
    },
    vision: {
      eyebrow: "愿景",
      title: "我们在构建的 Sigma",
      paragraphs: [
        "短期目标是在重点区域建立可验证的增长基础设施能力。",
        "长期目标是成为 Finance 与 Web3 默认的增长运营层。",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "信任 Sigma 的网络",
      title: "我们合作的对象",
      body:
        "Sigma 团队参与过全球交易所生态及金融平台的增长、BD 与 KOL 运营。具体项目细节受 NDA 约束。",
      ctaLabel: "申请参考与案例",
    },
    transparency: {
      eyebrow: "透明声明",
      title: "明确边界",
      body:
        "Sigma 是增长基础设施网络，不是经纪商、交易所、基金或持牌金融顾问。Sigma 不托管用户资金，也不承诺金融收益。",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "如果你读到这里",
      title: "两类人应该联系 Sigma",
      body:
        "如果你在运营平台、KOL 渠道、IB 业务或高频交易体系，并认同我们的方法论，欢迎与我们联系。\n\n如果你在寻找“保证收益”的捷径，Sigma 并不适合你。",
      primaryCtaLabel: "与 Sigma 合作",
      secondaryCtaLabel: "申请成为 KOL / IB",
    },
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Quiénes Somos",
    headline: "No aprendimos este mercado en un deck. Lo construimos desde dentro.",
    subhead: "Sigma convierte experiencia operativa real en infraestructura de crecimiento para mercados financieros y Web3.",
    bodyLine: "Esta página no es sobre venta; es sobre personas, principios y el recorrido que construyó Sigma.",
    identity: ["Estratégico.", "Confiable.", "Escalable."],
    whySigmaExists: {
      eyebrow: "Por qué existe Sigma",
      title: "La brecha que veíamos desde dentro",
      paragraphs: [
        "Crecimiento, KOL, IB, producto y liquidez solían operar en silos, perdiendo rendimiento entre equipos.",
        "Sigma nace para conectar esas capas en un mismo sistema operativo.",
      ],
    },
    story: {
      eyebrow: "Nuestra historia",
      title: "Cómo se construyó Sigma",
      paragraphs: [
        "Sigma comenzó como un espacio de coordinación entre operadores de exchanges y equipos de crecimiento.",
        "Con el tiempo convertimos playbooks repetibles en infraestructura operable, no en favores puntuales.",
      ],
    },
    founderNote: {
      eyebrow: "Del fundador",
      title: "Nota de Omid Modaber",
      quote:
        "Sigma es el sistema que me habría gustado tener al operar dentro de la industria. No buscamos ruido; construimos utilidad, estructura y resultados sostenibles.",
      attribution: "Omid Modaber, Fundador, Sigma",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "Equipo Núcleo",
      title: "Quién construye Sigma",
      intro: "Sigma está liderada por cinco socios núcleo, cada uno responsable de un dominio de la red.",
      members: coreMembersByRole("Consultor de Crecimiento Estratégico"),
      extendedNetwork:
        "Además del núcleo, Sigma opera con managers regionales de comunidad, KOL managers, especialistas BD y líderes de localización en mercados prioritarios.",
      ndaLine:
        "Varios miembros del equipo Sigma ocupan roles senior en plataformas financieras activas. Los detalles se protegen bajo NDA.",
      ctaLabel: "Página completa del equipo",
    },
    industryPov: {
      eyebrow: "Visión de industria",
      title: "Principios detrás de nuestras decisiones",
      intro: "Estos principios explican qué hacemos y también qué decidimos no hacer.",
      principles: [
        "El crecimiento es un sistema, no solo una campaña.",
        "En este sector, operadores con experiencia real superan al marketing superficial.",
        "La ejecución regional gana a la media global.",
      ],
    },
    insideNetwork: {
      eyebrow: "Dentro de la red",
      title: "Cómo operamos",
      body: "Sigma no funciona como agencia tradicional: estrategia y ejecución avanzan en el mismo ritmo operativo.",
      operatingPoints: [
        { title: "Un ritmo operativo.", body: "Estrategia, ejecución y reporting siguen una misma cadencia semanal." },
        { title: "Entrega senior.", body: "El equipo que inicia el proyecto sigue presente durante la ejecución." },
      ],
    },
    vision: {
      eyebrow: "Visión",
      title: "La Sigma que estamos construyendo",
      paragraphs: [
        "Nuestro objetivo cercano es consolidar una infraestructura de crecimiento confiable en mercados prioritarios.",
        "A largo plazo buscamos ser la capa operativa por defecto para Finance y Web3.",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "La red que confía en Sigma",
      title: "Con quién trabajamos",
      body:
        "El equipo de Sigma ha contribuido en operaciones de crecimiento, BD y KOL en ecosistemas globales de exchanges y plataformas financieras. Los detalles se mantienen bajo NDA.",
      ctaLabel: "Solicitar referencias y casos",
    },
    transparency: {
      eyebrow: "Transparencia",
      title: "Aclaración importante",
      body:
        "Sigma es una red de infraestructura de crecimiento. No es broker, exchange, fondo de inversión ni asesor financiero con licencia. No custodia fondos ni garantiza resultados financieros.",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "Si estás leyendo esto",
      title: "Dos perfiles deberían ponerse en contacto",
      body:
        "Si operas una plataforma, canal KOL, negocio IB o trading de volumen y ves alineación con nuestro enfoque, hablemos.\n\nSi buscas promesas de retorno garantizado, Sigma no es para ti.",
      primaryCtaLabel: "Asociarse con Sigma",
      secondaryCtaLabel: "Aplicar como KOL / IB",
    },
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Кто мы",
    headline: "Мы не изучали этот рынок по слайдам. Мы строили изнутри.",
    subhead: "Sigma превращает реальный операционный опыт в инфраструктуру роста для Finance и Web3.",
    bodyLine: "Эта страница о людях, принципах и пути создания Sigma, а не о продаже услуг.",
    identity: ["Стратегично.", "Надёжно.", "Масштабируемо."],
    whySigmaExists: {
      eyebrow: "Зачем существует Sigma",
      title: "Разрыв, который мы видели изнутри",
      paragraphs: [
        "Рост, KOL, IB, продукт и ликвидность часто работали раздельно, из-за чего эффективность терялась между командами.",
        "Sigma создана как единый операционный слой, который синхронизирует эти направления.",
      ],
    },
    story: {
      eyebrow: "Наша история",
      title: "Как появилась Sigma",
      paragraphs: [
        "Сначала Sigma была пространством координации между операторами бирж и growth-командами.",
        "Позже повторяемые практики превратились в инфраструктурную систему, а не в разовые инициативы.",
      ],
    },
    founderNote: {
      eyebrow: "От основателя",
      title: "Комментарий Omid Modaber",
      quote:
        "Sigma — это система, к которой я хотел бы подключаться, работая внутри индустрии. Мы не строим шум, мы строим пользу, структуру и устойчивый результат.",
      attribution: "Omid Modaber, Основатель, Sigma",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "Основная команда",
      title: "Кто строит Sigma",
      intro: "Sigma управляется пятью ключевыми партнёрами, каждый отвечает за своё операционное направление.",
      members: coreMembersByRole("Стратегический консультант по росту"),
      extendedNetwork:
        "Помимо ядра, Sigma работает с региональными community- и KOL-менеджерами, BD-специалистами, контент-партнёрами и лидерами локализации.",
      ndaLine:
        "Некоторые участники команды Sigma занимают senior-роли в действующих финансовых платформах. Детали защищены NDA.",
      ctaLabel: "Полная страница команды",
    },
    industryPov: {
      eyebrow: "Позиция по индустрии",
      title: "Принципы наших решений",
      intro: "Эти принципы определяют, что мы делаем и что принципиально не делаем.",
      principles: [
        "Рост — это система, а не отдельная кампания.",
        "В этой сфере операторы с практикой сильнее внешнего маркетингового шума.",
        "Региональное исполнение эффективнее усреднённого глобального подхода.",
      ],
    },
    insideNetwork: {
      eyebrow: "Внутри сети",
      title: "Как мы работаем",
      body: "Sigma не построена как традиционное агентство: стратегия и исполнение идут в одном ритме.",
      operatingPoints: [
        { title: "Единый операционный ритм.", body: "Стратегия, исполнение и отчётность синхронизированы по недельному циклу." },
        { title: "Senior-доставка.", body: "Команда с этапа запуска остаётся в контуре исполнения проекта." },
      ],
    },
    vision: {
      eyebrow: "Видение",
      title: "Sigma, которую мы строим",
      paragraphs: [
        "Ближайшая цель — закрепить надёжную инфраструктуру роста в приоритетных регионах.",
        "Долгосрочно мы строим стандартный операционный слой роста для Finance и Web3.",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "Сеть, которая доверяет Sigma",
      title: "С кем мы работаем",
      body:
        "Команда Sigma участвовала в операциях роста, BD и KOL в крупнейших биржевых экосистемах и финансовых платформах. Детали сотрудничества закрыты NDA.",
      ctaLabel: "Запросить референсы и кейсы",
    },
    transparency: {
      eyebrow: "Прозрачность",
      title: "Чёткое разграничение",
      body:
        "Sigma — это сеть инфраструктуры роста. Sigma не является брокером, биржей, инвестфондом или лицензированным финансовым советником и не гарантирует финансовый результат.",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "Если вы это читаете",
      title: "Кому стоит связаться с нами",
      body:
        "Если вы управляете платформой, KOL-каналом, IB-направлением или серьёзной торговой активностью и разделяете наш подход — давайте поговорим.\n\nЕсли вы ищете гарантированную доходность, Sigma не для вас.",
      primaryCtaLabel: "Стать партнёром Sigma",
      secondaryCtaLabel: "Подать заявку как KOL / IB",
    },
  },
  AR: {
    ...EN_CONTENT,
    kicker: "من نحن",
    headline: "لم نتعلّم هذا السوق من عرض تقديمي. لقد بنيناه من الداخل.",
    subhead: "Sigma تحوّل الخبرة التشغيلية الحقيقية إلى بنية تحتية للنمو في Finance وWeb3.",
    bodyLine: "هذه الصفحة عن الأشخاص والمبادئ والمسار الذي بنى Sigma، وليست صفحة بيع خدمات.",
    identity: ["استراتيجي.", "موثوق.", "قابل للتوسّع."],
    whySigmaExists: {
      eyebrow: "لماذا وُجدت Sigma",
      title: "الفجوة التي كنّا نراها من الداخل",
      paragraphs: [
        "كانت فرق النمو وKOL وIB والمنتج والسيولة تعمل غالباً بشكل منفصل، فتضيع الكفاءة بين الطبقات.",
        "جاءت Sigma لربط هذه الطبقات ضمن إيقاع تشغيلي واحد قابل للقياس.",
      ],
    },
    story: {
      eyebrow: "قصتنا",
      title: "كيف بُنيت Sigma",
      paragraphs: [
        "بدأت Sigma كمساحة تنسيق بين مشغّلي المنصات وفرق النمو.",
        "ثم تحوّلت الأساليب المتكررة إلى بنية تحتية تشغيلية بدلاً من مبادرات مؤقتة.",
      ],
    },
    founderNote: {
      eyebrow: "من المؤسس",
      title: "رسالة من Omid Modaber",
      quote:
        "Sigma هي النظام الذي تمنّيت وجوده أثناء عملي داخل الصناعة. لا نبحث عن الضجيج، بل نبني فائدة حقيقية وهيكلاً موثوقاً ونتائج مستدامة.",
      attribution: "Omid Modaber، مؤسس Sigma",
    },
    coreTeam: {
      ...EN_CONTENT.coreTeam,
      eyebrow: "الفريق الأساسي",
      title: "من يبني Sigma",
      intro: "تُدار Sigma بواسطة خمسة شركاء أساسيين، كل واحد يقود نطاقاً تشغيلياً داخل الشبكة.",
      members: coreMembersByRole("مستشار نمو استراتيجي"),
      extendedNetwork:
        "إلى جانب الفريق الأساسي، تعمل Sigma مع مديري مجتمعات إقليميين ومديري KOL ومتخصصي BD ومتعاوني محتوى وقادة توطين في الأسواق ذات الأولوية.",
      ndaLine:
        "يشغل بعض أعضاء فريق Sigma أدواراً عليا داخل منصات مالية عاملة، وتفاصيل الانتماء محمية باتفاقيات NDA.",
      ctaLabel: "صفحة الفريق الكاملة",
    },
    industryPov: {
      eyebrow: "رؤية القطاع",
      title: "المبادئ وراء قراراتنا",
      intro: "هذه المبادئ تحدد ما نفعله وما نرفض القيام به.",
      principles: [
        "النمو نظام تشغيلي وليس حملة منفردة.",
        "في هذا القطاع، خبرة المشغّل الداخلي تتفوّق على التسويق الخارجي السطحي.",
        "التنفيذ الإقليمي أدق من متوسط عالمي عام.",
      ],
    },
    insideNetwork: {
      eyebrow: "داخل الشبكة",
      title: "كيف نعمل",
      body: "Sigma ليست وكالة تقليدية؛ الاستراتيجية والتنفيذ يسيران ضمن إيقاع واحد.",
      operatingPoints: [
        { title: "إيقاع تشغيلي موحّد.", body: "الاستراتيجية والتنفيذ والتقارير تعمل على دورة أسبوعية واحدة." },
        { title: "تنفيذ يقوده الكبار.", body: "الفريق الذي يبدأ الشراكة يستمر فعلياً في التسليم." },
      ],
    },
    vision: {
      eyebrow: "الرؤية",
      title: "Sigma التي نبنيها",
      paragraphs: [
        "هدفنا القريب هو ترسيخ بنية نمو موثوقة في الأسواق ذات الأولوية.",
        "وهدفنا البعيد أن نصبح طبقة التشغيل الافتراضية للنمو في Finance وWeb3.",
      ],
    },
    recognition: {
      ...EN_CONTENT.recognition,
      eyebrow: "الشبكة التي تثق بـ Sigma",
      title: "من نعمل معهم",
      body:
        "ساهم فريق Sigma في عمليات النمو وBD وKOL عبر منظومات منصات تداول عالمية ومنصات مالية متعددة، مع بقاء التفاصيل التشغيلية تحت NDA.",
      ctaLabel: "اطلب المراجع ودراسات الحالة",
    },
    transparency: {
      eyebrow: "الشفافية",
      title: "توضيح صريح",
      body:
        "Sigma شبكة بنية تحتية للنمو. Sigma ليست وسيطاً أو منصة تداول أو صندوق استثمار أو مستشاراً مالياً مرخصاً، ولا تقدّم ضماناً لنتائج مالية.",
    },
    invitation: {
      ...EN_CONTENT.invitation,
      eyebrow: "إذا كنت تقرأ هذا",
      title: "فئتان ينبغي أن تتواصلا معنا",
      body:
        "إذا كنت تدير منصة أو قناة KOL أو أعمال IB أو تداولاً بحجم جاد وترى توافقاً مع نهجنا، فتواصل معنا.\n\nأما إذا كنت تبحث عن وعود ربح مضمونة، فـ Sigma ليست الخيار المناسب.",
      primaryCtaLabel: "شارك مع Sigma",
      secondaryCtaLabel: "تقدّم كـ KOL / IB",
    },
  },
};
