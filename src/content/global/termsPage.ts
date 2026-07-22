import type { LangCode } from "../types";

export type TermsPageMeta = {
  title: string;
  description: string;
};

export type TermsPageContent = {
  kicker: string;
  headline: string;
  updatedLabel: string;
  updatedDate: string;
  sections: { title: string; body: string; items?: string[] }[];
};

export const termsPageMetaByLang: Record<LangCode, TermsPageMeta> = {
  EN: {
    title: "Terms",
    description: "Terms of use for the Sigma marketing website and contact channels.",
  },
  TR: {
    title: "Şartlar",
    description: "Sigma pazarlama sitesi ve iletişim kanalları için kullanım şartları.",
  },
  FA: {
    title: "شرایط",
    description: "شرایط استفاده از وب‌سایت بازاریابی سیگما و کانال‌های تماس.",
  },
  ZH: {
    title: "条款",
    description: "Sigma 营销网站与联系渠道的使用条款。",
  },
  ES: {
    title: "Términos",
    description: "Términos de uso del sitio de marketing y canales de contacto de Sigma.",
  },
  RU: {
    title: "Условия",
    description: "Условия использования маркетингового сайта и контактных каналов Sigma.",
  },
  AR: {
    title: "الشروط",
    description: "شروط استخدام موقع سيغما التسويقي وقنوات التواصل.",
  },
};

export const termsPageContentByLang: Record<LangCode, TermsPageContent> = {
  EN: {
    kicker: "Terms of Use",
    headline: "Terms of Use",
    updatedLabel: "Last updated",
    updatedDate: "2026-01-XX",
    sections: [
      {
        title: "About these terms",
        body: "These terms govern your use of the Sigma website at sigmaa.pro, our content, our communications, and our publicly accessible services. Engagement contracts between Sigma and active partners govern those specific relationships and override these general terms where they apply. By using the site, you agree to these terms. If you don't agree, don't use the site.",
      },
      {
        title: "Who Sigma is",
        body: "Sigma is a global growth network operating across multiple jurisdictions. We provide growth, marketing, BD, KOL infrastructure, IB program design, and related services to partners in crypto, forex, and Web3 industries. We are not a broker, exchange, fund, or licensed financial advisor. The full picture sits at /risk-disclosure.",
      },
      {
        title: "What you can do",
        body: "Read our site, share our content with attribution, link to our pages, apply for services, send us inquiries, and use any tools or resources we publish.",
      },
      {
        title: "What you can't do",
        body: "The following uses are prohibited:",
        items: [
          "Scrape the site or its content for resale or training",
          "Republish substantial portions of our content without permission",
          "Misrepresent yourself or your project in applications or communications",
          "Use Sigma's name, logo, or testimonials without written consent",
          "Engage in reverse engineering, credential stuffing, or anything that disrupts site operation",
          "Use the site to send unsolicited commercial messages to people associated with Sigma",
          "Attempt to imply association with Sigma where none exists",
        ],
      },
      {
        title: "Content on this site",
        body: "Content on the Sigma site — articles, guides, market commentary, and educational materials — is for informational purposes only. It is not investment advice, legal advice, tax advice, or a recommendation to engage in any specific transaction. Always consult licensed professionals in your jurisdiction for personalized advice. Forward-looking statements are estimates and good-faith projections, not guarantees.",
      },
      {
        title: "Intellectual property",
        body: "Sigma's name, logo, content, dashboards, tools, frameworks, and proprietary methodologies are owned by Sigma or licensed to Sigma. You can read, share with attribution, and reference — but you can't copy, modify, sell, or build derivative products from our intellectual property without written permission. Content you submit to Sigma (applications, briefs, communications) remains yours; you grant us a limited license to use it for the purpose of evaluating fit, running the engagement, and delivering services.",
      },
      {
        title: "Engagements override",
        body: "Where you become an active Sigma partner under a signed engagement contract, that contract governs the specific commercial and legal relationship. These site terms continue to apply to your use of the website, content, and any non-contractual interactions.",
      },
      {
        title: "Limitations and disclaimers",
        body: "To the maximum extent permitted by applicable law:",
        items: [
          'The site and its content are provided "as is" without warranties of any kind',
          "Sigma is not liable for losses arising from your use of the site, reliance on its content, or trading decisions made based on anything published",
          "Sigma is not responsible for the security, solvency, or performance of third-party platforms mentioned or linked",
          "Sigma's total liability for any claim related to the site (separate from engagement contracts) is limited to what you've paid us, if anything, in the 12 months preceding the claim",
        ],
      },
      {
        title: "Governing law",
        body: "These terms are governed by the laws of the jurisdiction where Sigma's principal operating entity is registered. Specific engagement contracts specify their own governing law.",
      },
      {
        title: "Disputes",
        body: "Most disputes get resolved by talking. Where a formal process is needed, engagement contracts specify arbitration or court jurisdiction. For site-related disputes outside an engagement, the governing law above applies.",
      },
      {
        title: "Changes",
        body: "We can update these terms. The effective date above reflects the current version. Substantive changes get notified to active partners.",
      },
      {
        title: "Contact",
        body: "Questions about these terms: legal@sigmaa.pro.",
      },
    ],
  },
  TR: {
    kicker: "Yasal",
    headline: "Kullanım şartları",
    updatedLabel: "Son güncelleme",
    updatedDate: "Mayıs 2026",
    sections: [
      {
        title: "Kabul",
        body: "Bu siteye erişerek bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız siteyi kullanmayın.",
      },
      {
        title: "Yatırım tavsiyesi değildir",
        body: "İçerik bilgilendiricidir; finansal, hukuki veya yatırım tavsiyesi değildir.",
      },
      {
        title: "İletişim",
        body: "Formlar aracılığıyla gönderdiğiniz bilgiler yanıt vermek ve hizmetleri geliştirmek için kullanılabilir.",
      },
      {
        title: "Sorumluluk",
        body: "Yürürlükteki hukukun izin verdiği ölçüde, dolaylı zararlardan sorumluluk reddedilir.",
      },
      {
        title: "Değişiklikler",
        body: "Şartlar güncellenebilir; değişikliklerden sonra kullanım devamını kabul sayarız.",
      },
    ],
  },
  FA: {
    kicker: "حقوقی",
    headline: "شرایط استفاده",
    updatedLabel: "آخرین به‌روزرسانی",
    updatedDate: "مه ۲۰۲۶",
    sections: [
      {
        title: "موافقت",
        body: "با ورود به این سایت این شرایط را می‌پذیرید. در غیر این صورت از سایت استفاده نکنید.",
      },
      {
        title: "عدم مشاوره سرمایه‌گذاری",
        body: "محتوا صرفاً اطلاع‌رسانی است و مشورتی مالی یا حقوقی محسوب نمی‌شود.",
      },
      {
        title: "تماس",
        body: "اطلاعات ارسالی از طریق فرم‌ها ممکن است برای پاسخ‌گویی و بهبود خدمات استفاده شود.",
      },
      {
        title: "مسئولیت",
        body: "تا حد مجاز قانون، مسئولیت خسارات غیرمستقیم سلب می‌شود.",
      },
      {
        title: "تغییرات",
        body: "این شرایط ممکن است به‌روز شوند؛ ادامه استفاده به‌منزله پذیرش است.",
      },
    ],
  },
  ZH: {
    kicker: "法律",
    headline: "使用条款",
    updatedLabel: "最近更新",
    updatedDate: "2026年5月",
    sections: [
      {
        title: "同意",
        body: "访问本网站即表示您同意这些条款。若不同意，请勿使用。",
      },
      {
        title: "非投资建议",
        body: "内容仅供参考，不构成财务、法律或投资建议。",
      },
      {
        title: "联系与提交",
        body: "您通过表单提交的信息可用于回复与改进服务。",
      },
      {
        title: "责任限制",
        body: "在法律允许范围内，我们对间接损失不承担责任。",
      },
      {
        title: "变更",
        body: "我们可能更新条款；继续使用视为接受。",
      },
    ],
  },
  ES: {
    kicker: "Legal",
    headline: "Términos de uso",
    updatedLabel: "Última actualización",
    updatedDate: "Mayo de 2026",
    sections: [
      {
        title: "Acuerdo",
        body: "Al acceder a este sitio aceptas estos términos. Si no estás de acuerdo, no lo uses.",
      },
      {
        title: "No es asesoramiento",
        body: "El contenido es informativo y no constituye asesoramiento financiero o legal.",
      },
      {
        title: "Contacto",
        body: "La información enviada en formularios puede usarse para responder y mejorar servicios.",
      },
      {
        title: "Responsabilidad",
        body: "En la medida permitida por la ley, se excluye responsabilidad por daños indirectos.",
      },
      {
        title: "Cambios",
        body: "Podemos actualizar los términos; el uso continuado implica aceptación.",
      },
    ],
  },
  RU: {
    kicker: "Правовая информация",
    headline: "Условия использования",
    updatedLabel: "Обновлено",
    updatedDate: "Май 2026",
    sections: [
      {
        title: "Согласие",
        body: "Используя сайт, вы принимаете эти условия. Если не согласны — не используйте сайт.",
      },
      {
        title: "Не инвестиционный совет",
        body: "Материалы носят информационный характер и не являются финансовой или юридической консультацией.",
      },
      {
        title: "Контакт",
        body: "Данные из форм могут использоваться для ответа и улучшения сервиса.",
      },
      {
        title: "Ограничение ответственности",
        body: "В максимально допустимой степени ответственность за косвенный ущерб ограничивается.",
      },
      {
        title: "Изменения",
        body: "Условия могут обновляться; продолжение использования означает согласие.",
      },
    ],
  },
  AR: {
    kicker: "قانوني",
    headline: "شروط الاستخدام",
    updatedLabel: "آخر تحديث",
    updatedDate: "مايو 2026",
    sections: [
      {
        title: "الموافقة",
        body: "باستخدام الموقع فإنك توافق على هذه الشروط. إذا لم توافق، لا تستخدم الموقع.",
      },
      {
        title: "ليس استثماراً أو نصيحة قانونية",
        body: "المحتوى معلوماتي ولا يُعدّ استشارة مالية أو قانونية.",
      },
      {
        title: "الاتصال",
        body: "قد تُستخدم البيانات المرسلة عبر النماذج للرد وتحسين الخدمة.",
      },
      {
        title: "حدود المسؤولية",
        body: "إلى أقصى ما يسمح به القانون، تُستثنى المسؤولية عن الأضرار غير المباشرة.",
      },
      {
        title: "التغييرات",
        body: "قد نحدّث الشروط؛ استمرار الاستخدام يعني الموافقة.",
      },
    ],
  },
};
