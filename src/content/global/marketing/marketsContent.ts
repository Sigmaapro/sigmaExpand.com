import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type MarketsIndexRegion = {
  title: string;
  body: string;
  keywordFocus: string;
};

export type MarketsIndexContent = {
  kicker: string;
  title: string;
  intro: string;
  regions: MarketsIndexRegion[];
  ctaLabel: string;
  ctaHref: string;
};

const EN_CONTENT: MarketsIndexContent = {
  kicker: "Regional Crypto Marketing",
  title: "Built for Where Your Next Users Actually Live",
  intro:
    "Web3 growth does not happen at the global average. It happens region by region. Sigma operates with native KOLs, on-the-ground BD, and locally calibrated funnels across MENA/WANA, CIS, APAC, Europe, and LATAM.",
  regions: [
    {
      title: "MENA / WANA",
      body:
        "Arabic, Persian, and GCC-native growth infrastructure across MENA, WANA, Dubai/GCC, and Persian-speaking financial communities.",
      keywordFocus:
        "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
    },
    {
      title: "CIS",
      body:
        "Russian-language distribution, futures and prop-trading audiences, and regional crypto and finance communities across CIS markets.",
      keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
    },
    {
      title: "APAC",
      body:
        "Korean, Vietnamese, Thai, Indonesian, and broader Asia-Pacific growth surfaces with regional KOL access and Bali-linked execution presence.",
      keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
    },
    {
      title: "Europe",
      body:
        "MiCA-aware campaigns across Germany, Spain, Italy, Poland, the Balkans, and Turkey, with Telegram-first communities, FX-aware messaging, and native Turkish creator networks.",
      keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
    },
    {
      title: "LATAM",
      body:
        "Portuguese and Spanish funnels, stablecoin-first narratives, Spain-linked Spanish-speaking growth, and regional trading communities.",
      keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
    },
  ],
  ctaLabel: "Plan Your Regional Expansion",
  ctaHref: ROUTES.contact,
};

export const marketsIndexContentByLang: Record<LangCode, MarketsIndexContent> = {
  EN: EN_CONTENT,
  TR: {
    ...EN_CONTENT,
    kicker: "Bölgesel Kripto Pazarlama",
    title: "Bir Sonraki Kullanıcılarınızın Gerçekten Yaşadığı Yerler İçin",
    intro:
      "Web3 büyümesi küresel ortalamada değil, bölge bölge gerçekleşir. Sigma; MENA/WANA, CIS, APAC, Avrupa ve LATAM boyunca yerel KOL, saha BD ve yerel kalibreli hunilerle çalışır.",
    regions: [
      {
        title: "MENA / WANA",
        body: "MENA, WANA, Dubai/GCC ve Farsça konuşan finans topluluklarında Arapça, Farsça ve GCC-yerel büyüme altyapısı.",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "CIS pazarlarında Rusça dağıtım, futures ve prop-trading kitleleri ile bölgesel crypto/finance toplulukları.",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "Korece, Vietnamca, Tayca, Endonezce ve geniş Asya-Pasifik büyüme yüzeyleri; bölgesel KOL erişimi ve Bali bağlantılı icra.",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "Germany, Spain, Italy, Poland, Balkans ve Türkiye genelinde MiCA-aware kampanyalar; Telegram-first topluluklar, FX-aware mesajlama ve yerel Türk creator ağları.",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "Portekizce ve İspanyolca huniler, stablecoin-first anlatılar, Spain bağlantılı İspanyolca büyüme ve bölgesel trading toplulukları.",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "Bölgesel Genişlemenizi Planlayın",
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "区域加密营销",
    title: "为下一批用户真正所在的市场而打造",
    intro:
      "Web3 增长并非发生在全球平均值，而是按区域发生。Sigma 在 MENA/WANA、CIS、APAC、欧洲和 LATAM 通过本地 KOL、在地 BD 与区域化漏斗执行增长。",
    regions: [
      {
        title: "MENA / WANA",
        body: "覆盖 MENA、WANA、Dubai/GCC 与波斯语金融社群的阿语、波斯语与 GCC 本地增长基础设施。",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "面向 CIS 的俄语分发、期货与 prop-trading 受众，以及区域 crypto/finance 社群能力。",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "覆盖韩语、越南语、泰语、印尼语及更广泛亚太市场的增长面，配合区域 KOL 触达与 Bali 相关执行。",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "在 Germany、Spain、Italy、Poland、Balkans 与 Turkey 推进 MiCA-aware 增长，并结合 Telegram-first 社区、FX-aware 信息与土耳其本地创作者网络。",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "西语/葡语漏斗、stablecoin-first 叙事、Spain 相关西语增长与区域交易社群能力。",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "规划您的区域扩张",
  },
  FA: {
    ...EN_CONTENT,
    kicker: "مارکتینگ منطقه‌ای کریپتو",
    title: "برای جایی ساخته شده که کاربران بعدی شما واقعاً آنجا هستند",
    intro:
      "رشد Web3 در میانگین جهانی رخ نمی‌دهد؛ منطقه‌به‌منطقه اتفاق می‌افتد. Sigma در MENA/WANA، CIS، APAC، اروپا و LATAM با KOL بومی، BD میدانی و قیف‌های محلی فعالیت می‌کند.",
    regions: [
      {
        title: "MENA / WANA",
        body: "زیرساخت رشد بومی عربی، فارسی و GCC در MENA، WANA، Dubai/GCC و جوامع مالی فارسی‌زبان.",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "توزیع روسی‌زبان، مخاطبان futures و prop-trading، و جوامع منطقه‌ای crypto/finance در بازارهای CIS.",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "سطوح رشد کره‌ای، ویتنامی، تایلندی، اندونزیایی و گستره آسیا-پاسیفیک با دسترسی KOL منطقه‌ای و اجرای Bali-linked.",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "کمپین‌های MiCA-aware در Germany، Spain، Italy، Poland، Balkans و Turkey همراه با کامیونیتی‌های Telegram-first، پیام‌رسانی FX-aware و شبکه کریتورهای بومی ترکی.",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "قیف‌های پرتغالی و اسپانیایی، روایت stablecoin-first، رشد اسپانیاییِ Spain-linked و جوامع معاملاتی منطقه‌ای.",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "برنامه‌ریزی توسعه منطقه‌ای",
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Marketing Cripto Regional",
    title: "Diseñado para donde viven de verdad tus próximos usuarios",
    intro:
      "El crecimiento Web3 no ocurre en el promedio global; ocurre región por región. Sigma ejecuta en MENA/WANA, CIS, APAC, Europa y LATAM con KOL nativos, BD en terreno y embudos locales.",
    regions: [
      {
        title: "MENA / WANA",
        body: "Infraestructura de crecimiento nativa en árabe, persa y GCC en MENA, WANA, Dubai/GCC y comunidades financieras persoparlantes.",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "Distribución en ruso, audiencias de futures y prop-trading, y comunidades crypto/finance regionales en mercados CIS.",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "Superficies de crecimiento coreanas, vietnamitas, tailandesas, indonesias y Asia-Pacífico con acceso KOL regional y ejecución vinculada a Bali.",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "Campañas MiCA-aware en Germany, Spain, Italy, Poland, Balkans y Turkey, con comunidades Telegram-first, mensajería FX-aware y redes de creadores turcos nativos.",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "Embudos en portugués y español, narrativas stablecoin-first, crecimiento hispanohablante vinculado a Spain y comunidades regionales de trading.",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "Planifica tu expansión regional",
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Региональный криптомаркетинг",
    title: "Сделано для рынков, где реально живут ваши следующие пользователи",
    intro:
      "Рост Web3 не происходит по «среднему миру» — он происходит регион за регионом. Sigma работает в MENA/WANA, CIS, APAC, Европе и LATAM через локальные KOL, полевой BD и локальные воронки.",
    regions: [
      {
        title: "MENA / WANA",
        body: "Арабская, персидская и GCC-native инфраструктура роста в MENA, WANA, Dubai/GCC и персоязычных финансовых сообществах.",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "Русскоязычная дистрибуция, аудитории futures и prop-trading, а также региональные crypto/finance сообщества в рынках CIS.",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "Корейские, вьетнамские, тайские, индонезийские и более широкие Asia-Pacific поверхности роста с региональным KOL-доступом и Bali-linked исполнением.",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "MiCA-aware кампании по Germany, Spain, Italy, Poland, Balkans и Turkey с Telegram-first сообществами, FX-aware сообщениями и локальными турецкими creator-сетями.",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "Португальские и испанские воронки, stablecoin-first нарративы, Spain-linked испаноязычный рост и региональные трейдерские сообщества.",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "Спланировать региональную экспансию",
  },
  AR: {
    ...EN_CONTENT,
    kicker: "تسويق إقليمي للعملات المشفرة",
    title: "مصمّم للأسواق التي يعيش فيها مستخدموك القادمون فعلياً",
    intro:
      "نمو Web3 لا يحدث عند المتوسط العالمي، بل منطقةً بمنطقة. تعمل Sigma عبر MENA/WANA وCIS وAPAC وأوروبا وLATAM من خلال KOL محليين وBD ميداني ومسارات جذب مُعايرة لكل سوق.",
    regions: [
      {
        title: "MENA / WANA",
        body: "بنية نمو عربية وفارسية وGCC-native عبر MENA وWANA وDubai/GCC والمجتمعات المالية الناطقة بالفارسية.",
        keywordFocus:
          "MENA crypto marketing · Arabic crypto KOL · crypto marketing agency GCC · Dubai crypto agency · Persian crypto KOL agency · Farsi crypto marketing",
      },
      {
        title: "CIS",
        body: "توزيع باللغة الروسية، وجماهير futures وprop-trading، ومجتمعات crypto/finance إقليمية في أسواق CIS.",
        keywordFocus: "CIS crypto agency · Russian crypto marketing · Russian-language crypto distribution · CIS crypto marketing",
      },
      {
        title: "APAC",
        body: "أسطح نمو كورية وفيتنامية وتايلندية وإندونيسية وعلى مستوى آسيا-المحيط الهادئ مع وصول KOL إقليمي وتنفيذ مرتبط بـ Bali.",
        keywordFocus: "APAC crypto marketing · Asia crypto KOL · Bali crypto agency · Asia-Pacific Web3 growth · Southeast Asia crypto marketing",
      },
      {
        title: "Europe",
        body: "حملات MiCA-aware عبر Germany وSpain وItaly وPoland وBalkans وTurkey مع مجتمعات Telegram-first ورسائل FX-aware وشبكات صناع محتوى أتراك محليين.",
        keywordFocus: "MiCA crypto marketing · EU crypto agency · Europe crypto marketing · Balkans crypto marketing · Turkey crypto KOL agency · Istanbul crypto marketing · European Web3 growth",
      },
      {
        title: "LATAM",
        body: "مسارات إسبانية وبرتغالية، وسرديات stablecoin-first، ونمو إسباني مرتبط بـ Spain، ومجتمعات تداول إقليمية.",
        keywordFocus: "LATAM crypto marketing · Spanish crypto KOL · Spain crypto marketing · Latin America crypto agency · Portuguese crypto marketing",
      },
    ],
    ctaLabel: "خطّط لتوسّعك الإقليمي",
  },
};
