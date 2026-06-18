import type { LangCode } from "@/content/types";

export type ErrorPageCopy = {
  title: string;
  message: string;
  retryLabel: string;
};

export type NotFoundCopy = {
  title: string;
  description: string;
  body: string;
  backHome: string;
  wordmark: string;
};

const ERROR_COPY: Record<LangCode, ErrorPageCopy> = {
  EN: {
    title: "Something went offline.",
    message:
      "The Sigma interface could not complete this request. Please try again in a moment.",
    retryLabel: "Try again",
  },
  TR: {
    title: "Bir şeyler ters gitti.",
    message:
      "Sigma arayüzü bu isteği tamamlayamadı. Lütfen biraz sonra tekrar deneyin.",
    retryLabel: "Tekrar dene",
  },
  FA: {
    title: "مشکلی پیش آمد.",
    message:
      "رابط Sigma نتوانست این درخواست را کامل کند. لطفاً چند لحظه دیگر دوباره تلاش کنید.",
    retryLabel: "تلاش دوباره",
  },
  AR: {
    title: "حدث خطأ ما.",
    message:
      "تعذّر على واجهة Sigma إكمال هذا الطلب. يرجى المحاولة مرة أخرى بعد قليل.",
    retryLabel: "حاول مرة أخرى",
  },
  ZH: {
    title: "出现了一些问题。",
    message:
      "Sigma 界面无法完成此请求。请稍后重试。",
    retryLabel: "重试",
  },
  ES: {
    title: "Algo salió mal.",
    message:
      "La interfaz de Sigma no pudo completar esta solicitud. Inténtalo de nuevo en un momento.",
    retryLabel: "Intentar de nuevo",
  },
  RU: {
    title: "Что-то пошло не так.",
    message:
      "Интерфейс Sigma не смог завершить этот запрос. Попробуйте ещё раз через несколько минут.",
    retryLabel: "Попробовать снова",
  },
};

const NOT_FOUND_COPY: Record<LangCode, NotFoundCopy> = {
  EN: {
    title: "Page not found",
    description: "The requested Sigma page could not be found.",
    body: "This page could not be found.",
    backHome: "Back to home",
    wordmark: "SIGMA",
  },
  TR: {
    title: "Sayfa bulunamadı",
    description: "İstenen Sigma sayfası bulunamadı.",
    body: "Bu sayfa bulunamadı.",
    backHome: "Ana sayfaya dön",
    wordmark: "SIGMA",
  },
  FA: {
    title: "صفحه پیدا نشد",
    description: "صفحه درخواستی سیگما پیدا نشد.",
    body: "این صفحه پیدا نشد.",
    backHome: "بازگشت به خانه",
    wordmark: "سیگما",
  },
  AR: {
    title: "الصفحة غير موجودة",
    description: "تعذّر العثور على صفحة سيغما المطلوبة.",
    body: "تعذّر العثور على هذه الصفحة.",
    backHome: "العودة إلى الرئيسية",
    wordmark: "سيغما",
  },
  ZH: {
    title: "页面未找到",
    description: "未找到请求的 Sigma 页面。",
    body: "未找到此页面。",
    backHome: "返回首页",
    wordmark: "Sigma",
  },
  ES: {
    title: "Página no encontrada",
    description: "No se encontró la página solicitada de Sigma.",
    body: "No se pudo encontrar esta página.",
    backHome: "Volver al inicio",
    wordmark: "SIGMA",
  },
  RU: {
    title: "Страница не найдена",
    description: "Запрошенная страница Sigma не найдена.",
    body: "Эта страница не найдена.",
    backHome: "Вернуться на главную",
    wordmark: "Сигма",
  },
};

export function getErrorPageCopy(lang: LangCode): ErrorPageCopy {
  return ERROR_COPY[lang];
}

export function getNotFoundCopy(lang: LangCode): NotFoundCopy {
  return NOT_FOUND_COPY[lang];
}
