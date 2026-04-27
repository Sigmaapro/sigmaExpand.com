import type { LangCode, ServicesContent } from "./types";

const EN: ServicesContent = {
  sectionLabel: "01 // ARCHITECTURE",
  headline: "CORE ECOSYSTEM",
  cards: [
    {
      title: "LIQUIDITY PROTOCOLS",
      description:
        "Algorithmic market making engines designed for zero-slippage trade execution at institutional scale.",
      icon: "activity",
    },
    {
      title: "NETWORK SECURITY",
      description:
        "Cryptographic consensus mechanisms engineered to withstand quantum-level attack vectors.",
      icon: "shield",
    },
    {
      title: "NODE INFRASTRUCTURE",
      description:
        "Decentralized, globally distributed bare-metal networks ensuring 100% uptime.",
      icon: "cpu",
    },
    {
      title: "SMART CONTRACTS",
      description:
        "Formal verification and rigorous auditing of complex financial primitives.",
      icon: "code2",
    },
  ],
};

const TR: ServicesContent = {
  sectionLabel: "01 // MİMARİ",
  headline: "TEMEL EKOSİSTEM",
  cards: [
    {
      title: "LİKİDİTE PROTOKOLLERİ",
      description:
        "Kurumsal ölçekte sıfır kayma ile işlem yürütmek için tasarlanmış algoritmik piyasa yapıcı motorlar.",
      icon: "activity",
    },
    {
      title: "AĞ GÜVENLİĞİ",
      description:
        "Kuantum düzeyindeki saldırı vektörlerine dayanacak şekilde tasarlanmış kriptografik mutabakat mekanizmaları.",
      icon: "shield",
    },
    {
      title: "DÜĞÜM ALTYAPISI",
      description:
        "%100 çalışma süresi sağlayan merkeziyetsiz, küresel olarak dağıtılmış donanım ağları.",
      icon: "cpu",
    },
    {
      title: "AKILLI SÖZLEŞMELER",
      description:
        "Karmaşık finansal temellerin resmi doğrulaması ve titiz denetimi.",
      icon: "code2",
    },
  ],
};

const ZH: ServicesContent = {
  sectionLabel: "01 // 架构",
  headline: "核心生态系统",
  cards: [
    {
      title: "流动性协议",
      description:
        "专为机构规模的零滑点交易执行而设计的算法做市引擎。",
      icon: "activity",
    },
    {
      title: "网络安全",
      description: "旨在抵御量子级攻击向量的加密共识机制。",
      icon: "shield",
    },
    {
      title: "节点基础设施",
      description: "确保 100% 正常运行时间的去中心化、全球分布的裸金属网络。",
      icon: "cpu",
    },
    {
      title: "智能合约",
      description: "对复杂金融原语的正式验证和严格审计。",
      icon: "code2",
    },
  ],
};

const FA: ServicesContent = {
  sectionLabel: "01 // معماری",
  headline: "اکوسیستم هسته",
  cards: [
    {
      title: "پروتکل‌های نقدینگی",
      description:
        "موتورهای بازارساز الگوریتمی طراحی شده برای اجرای معاملات بدون لغزش در مقیاس نهادی.",
      icon: "activity",
    },
    {
      title: "امنیت شبکه",
      description:
        "مکانیسم‌های اجماع رمزنگاری مهندسی شده برای مقاومت در برابر بردارهای حمله سطح کوانتومی.",
      icon: "shield",
    },
    {
      title: "زیرساخت نود",
      description:
        "شبکه‌های فلز لخت غیرمتمرکز و توزیع شده در سطح جهانی که 100٪ آپتایم را تضمین می‌کنند.",
      icon: "cpu",
    },
    {
      title: "قراردادهای هوشمند",
      description: "تأیید رسمی و حسابرسی دقیق اصول اولیه مالی پیچیده.",
      icon: "code2",
    },
  ],
};

const ES: ServicesContent = {
  sectionLabel: "01 // ARQUITECTURA",
  headline: "ECOSISTEMA CENTRAL",
  cards: [
    {
      title: "PROTOCOLOS DE LIQUIDEZ",
      description:
        "Motores algorítmicos de market making diseñados para ejecución institucional con deslizamiento mínimo.",
      icon: "activity",
    },
    {
      title: "SEGURIDAD DE RED",
      description:
        "Mecanismos criptográficos de consenso diseñados para resistir vectores de ataque de nivel cuántico.",
      icon: "shield",
    },
    {
      title: "INFRAESTRUCTURA DE NODOS",
      description:
        "Redes bare-metal descentralizadas y distribuidas globalmente para alta disponibilidad.",
      icon: "cpu",
    },
    {
      title: "CONTRATOS INTELIGENTES",
      description:
        "Verificación formal y auditoría rigurosa de primitivas financieras complejas.",
      icon: "code2",
    },
  ],
};

const RU: ServicesContent = {
  sectionLabel: "01 // АРХИТЕКТУРА",
  headline: "ЯДРО ЭКОСИСТЕМЫ",
  cards: [
    {
      title: "ПРОТОКОЛЫ ЛИКВИДНОСТИ",
      description:
        "Алгоритмические движки маркет-мейкинга для исполнения сделок институционального уровня с минимальным проскальзыванием.",
      icon: "activity",
    },
    {
      title: "БЕЗОПАСНОСТЬ СЕТИ",
      description:
        "Криптографические механизмы консенсуса, рассчитанные на устойчивость к атакам квантового уровня.",
      icon: "shield",
    },
    {
      title: "ИНФРАСТРУКТУРА УЗЛОВ",
      description:
        "Децентрализованные глобально распределённые bare-metal сети для стабильного аптайма.",
      icon: "cpu",
    },
    {
      title: "СМАРТ-КОНТРАКТЫ",
      description:
        "Формальная верификация и строгий аудит сложных финансовых примитивов.",
      icon: "code2",
    },
  ],
};

export const servicesByLang: Record<LangCode, ServicesContent> = {
  EN,
  TR,
  ZH,
  FA,
  ES,
  RU,
};
