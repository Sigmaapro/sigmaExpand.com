import type { LangCode } from "@/content/types";

type SeoAltSet = {
  home: {
    web3Growth: string;
    cryptoMarketing: string;
    liquiditySystem: string;
  };
  services: {
    servicesDashboard: string;
    liquidityExchange: string;
  };
};

const SEO_IMAGE_ALTS: Record<LangCode, SeoAltSet> = {
  EN: {
    home: {
      web3Growth: "Web3 growth infrastructure dashboard",
      cryptoMarketing: "Crypto marketing performance analytics",
      liquiditySystem: "Liquidity system visualization",
    },
    services: {
      servicesDashboard: "crypto marketing services dashboard",
      liquidityExchange: "web3 liquidity and exchange growth",
    },
  },
  TR: {
    home: {
      web3Growth: "Web3 büyüme altyapısı paneli",
      cryptoMarketing: "Kripto pazarlama performans analitiği",
      liquiditySystem: "Likidite sistemi görselleştirmesi",
    },
    services: {
      servicesDashboard: "kripto pazarlama hizmetleri paneli",
      liquidityExchange: "web3 likidite ve borsa büyümesi",
    },
  },
  FA: {
    home: {
      web3Growth: "داشبورد زیرساخت رشد وب۳",
      cryptoMarketing: "تحلیل عملکرد بازاریابی رمزارز",
      liquiditySystem: "نمای سیستم نقدینگی",
    },
    services: {
      servicesDashboard: "داشبورد خدمات بازاریابی رمزارز",
      liquidityExchange: "رشد نقدینگی وب۳ و صرافی",
    },
  },
  AR: {
    home: {
      web3Growth: "لوحة بنية النمو في Web3",
      cryptoMarketing: "تحليلات أداء تسويق العملات المشفرة",
      liquiditySystem: "تصوّر نظام السيولة",
    },
    services: {
      servicesDashboard: "لوحة خدمات تسويق العملات المشفرة",
      liquidityExchange: "نمو السيولة وتوسّع المنصات في Web3",
    },
  },
  ZH: {
    home: {
      web3Growth: "Web3 增长基础设施仪表盘",
      cryptoMarketing: "加密营销表现分析",
      liquiditySystem: "流动性系统可视化",
    },
    services: {
      servicesDashboard: "加密营销服务仪表盘",
      liquidityExchange: "Web3 流动性与交易所增长",
    },
  },
  ES: {
    home: {
      web3Growth: "panel de infraestructura de crecimiento Web3",
      cryptoMarketing: "analítica de rendimiento de marketing cripto",
      liquiditySystem: "visualización del sistema de liquidez",
    },
    services: {
      servicesDashboard: "panel de servicios de marketing cripto",
      liquidityExchange: "crecimiento de liquidez Web3 y exchange",
    },
  },
  RU: {
    home: {
      web3Growth: "панель инфраструктуры роста Web3",
      cryptoMarketing: "аналитика эффективности криптомаркетинга",
      liquiditySystem: "визуализация системы ликвидности",
    },
    services: {
      servicesDashboard: "панель услуг криптомаркетинга",
      liquidityExchange: "рост ликвидности Web3 и бирж",
    },
  },
};

export function getSeoImageAlts(lang: LangCode): SeoAltSet {
  return SEO_IMAGE_ALTS[lang];
}
