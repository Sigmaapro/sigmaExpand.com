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
  sections: { title: string; body: string }[];
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
};

export const termsPageContentByLang: Record<LangCode, TermsPageContent> = {
  EN: {
    kicker: "Legal",
    headline: "Terms of use",
    updatedLabel: "Last updated",
    updatedDate: "May 2026",
    sections: [
      {
        title: "Agreement",
        body: "By accessing this website you agree to these terms. If you do not agree, do not use the site.",
      },
      {
        title: "No investment advice",
        body: "Content is informational and does not constitute financial, legal, or investment advice. Past performance does not guarantee future results.",
      },
      {
        title: "Contact & submissions",
        body: "Information you submit through forms may be used to respond and improve our services, consistent with our privacy notice.",
      },
      {
        title: "Limitation of liability",
        body: "To the fullest extent permitted by law, Sigma disclaims liability for indirect or consequential damages arising from use of this site.",
      },
      {
        title: "Changes",
        body: "We may update these terms; continued use after changes constitutes acceptance. Material updates will be reflected on this page.",
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
};
