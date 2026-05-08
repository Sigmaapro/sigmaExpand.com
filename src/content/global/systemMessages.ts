import type { LangCode } from "@/content/types";

export type ErrorPageCopy = {
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
    message:
      "Something went wrong loading this page. If you are in development, stop the server, run npm run dev:clean, then hard-refresh the browser.",
    retryLabel: "Try again",
  },
  TR: {
    message:
      "Bu sayfa yüklenirken bir sorun oluştu. Geliştirme ortamındaysanız sunucuyu durdurup npm run dev:clean çalıştırın, ardından tarayıcıyı sert yenileyin.",
    retryLabel: "Tekrar dene",
  },
  FA: {
    message:
      "در بارگذاری این صفحه مشکلی رخ داد. اگر در محیط توسعه هستید، سرور را متوقف کنید، npm run dev:clean را اجرا کنید و مرورگر را hard refresh کنید.",
    retryLabel: "تلاش دوباره",
  },
  AR: {
    message:
      "حدثت مشكلة أثناء تحميل هذه الصفحة. إذا كنت في بيئة التطوير، أوقف الخادم ثم شغّل npm run dev:clean وبعدها حدّث المتصفح تحديثًا كاملًا.",
    retryLabel: "المحاولة مجددًا",
  },
  ZH: {
    message:
      "页面加载时出现问题。如果你在开发环境，请停止服务，运行 npm run dev:clean，然后强制刷新浏览器。",
    retryLabel: "重试",
  },
  ES: {
    message:
      "Hubo un problema al cargar esta página. Si estás en desarrollo, detén el servidor, ejecuta npm run dev:clean y luego haz una recarga forzada del navegador.",
    retryLabel: "Reintentar",
  },
  RU: {
    message:
      "При загрузке страницы произошла ошибка. Если вы в режиме разработки, остановите сервер, выполните npm run dev:clean и сделайте жесткое обновление браузера.",
    retryLabel: "Повторить",
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
