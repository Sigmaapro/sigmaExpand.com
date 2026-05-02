import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type PrivacySection = { title: string; body: string };

export type PrivacyMarketingBody = {
  kicker: string;
  headline: string;
  updatedLabel: string;
  updatedDate: string;
  sections: PrivacySection[];
};

export const privacyPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "Privacy",
    description: "How Sigma handles information when you use our website and contact channels.",
  },
  TR: {
    title: "Gizlilik",
    description: "Web sitemizi ve iletişim kanallarını kullandığınızda Sigma’nın bilgileri nasıl işlediği.",
  },
  FA: {
    title: "حریم خصوصی",
    description: "هنگام استفاده از وب‌سایت و کانال‌های تماس، سیگما چگونه با اطلاعات برخورد می‌کند.",
  },
  ZH: {
    title: "隐私",
    description: "当您使用我们的网站与联系渠道时，Sigma 如何处理信息。",
  },
  ES: {
    title: "Privacidad",
    description: "Cómo Sigma trata la información cuando usa el sitio y los canales de contacto.",
  },
  RU: {
    title: "Конфиденциальность",
    description: "Как Sigma обрабатывает данные при использовании сайта и контактных каналов.",
  },
};

export const privacyPageContentByLang: Record<LangCode, PrivacyMarketingBody> = {
  EN: {
    kicker: "Legal",
    headline: "Privacy notice",
    updatedLabel: "Last updated",
    updatedDate: "May 2026",
    sections: [
      {
        title: "Overview",
        body: "This notice describes how Sigma collects and uses information submitted through this website (including contact and lead forms). It is intended for a general audience and does not replace jurisdiction-specific disclosures your counsel may require.",
      },
      {
        title: "Information we collect",
        body: "When you submit forms or book a call, we may collect your name, email address, message content, and technical metadata such as browser type and approximate region derived from standard server logs. Analytics tools, if enabled, may process usage data as described in their respective policies.",
      },
      {
        title: "How we use information",
        body: "We use submissions to respond to inquiries, operate our services, improve the site, and—where permitted—send relevant follow-up about Sigma offerings. We do not sell personal information.",
      },
      {
        title: "Retention & security",
        body: "We retain contact records only as long as needed for the purposes above or as required by law. We apply reasonable technical and organizational safeguards; no method of transmission over the Internet is completely secure.",
      },
      {
        title: "Your choices",
        body: "You may request access, correction, or deletion of personal information where applicable law provides those rights. Contact us using the email or form on this site. We may need to verify your identity before fulfilling a request.",
      },
      {
        title: "Changes",
        body: "We may update this notice from time to time. Material changes will be reflected on this page with an updated date.",
      },
    ],
  },
  TR: {
    kicker: "Yasal",
    headline: "Gizlilik bildirimi",
    updatedLabel: "Son güncelleme",
    updatedDate: "Mayıs 2026",
    sections: [
      {
        title: "Genel bakış",
        body: "Bu bildirim, bu web sitesi üzerinden (iletişim ve lead formları dahil) gönderilen bilgilerin Sigma tarafından nasıl toplanıp kullanıldığını açıklar. Genel kitle içindir; hukuk danışmanınızın talep edebileceği bölgesel açıklamaların yerini almaz.",
      },
      {
        title: "Topladığımız bilgiler",
        body: "Form gönderdiğinizde veya görüşme ayırdığınızda ad, e-posta, mesaj içeriği ve sunucu günlüklerinden türeyen tarayıcı ve yaklaşık bölge gibi teknik üst veriler toplanabilir. Analitik araçlar etkinse kullanım verisi ilgili politikalarına göre işlenebilir.",
      },
      {
        title: "Bilgilerin kullanımı",
        body: "Gönderileri soruları yanıtlamak, hizmetleri işletmek, siteyi geliştirmek ve izin verilen ölçüde Sigma teklifleri hakkında takip için kullanırız. Kişisel bilgi satmayız.",
      },
      {
        title: "Saklama ve güvenlik",
        body: "Kayıtları yukarıdaki amaçlar veya yasal gereklilikler için gerekli süre boyunca tutarız. Makul teknik ve organizasyonel önlemler uygularız; internet üzerinden iletim tamamen risksiz değildir.",
      },
      {
        title: "Seçenekleriniz",
        body: "Yürürlükteki hukuk çerçevesinde erişim, düzeltme veya silme talep edebilirsiniz. Bu sitedeki e-posta veya form ile iletişime geçin; talepten önce kimlik doğrulaması isteyebiliriz.",
      },
      {
        title: "Değişiklikler",
        body: "Bu bildirimi zaman zaman güncelleyebiliriz. Önemli değişiklikler güncellenmiş tarihle bu sayfada yer alır.",
      },
    ],
  },
  FA: {
    kicker: "حقوقی",
    headline: "اطلاعیه حریم خصوصی",
    updatedLabel: "آخرین به‌روزرسانی",
    updatedDate: "مه ۲۰۲۶",
    sections: [
      {
        title: "نمای کلی",
        body: "این اطلاعیه توضیح می‌دهد سیگما چگونه اطلاعات ارسالی از این وب‌سایت (شامل فرم‌های تماس و سرنخ) را جمع‌آوری و استفاده می‌کند. برای مخاطب عمومی است و جای افشاهای مختص هر حوزه قضایی را که وکیل شما الزام می‌کند نمی‌گیرد.",
      },
      {
        title: "اطلاعاتی که جمع می‌کنیم",
        body: "با ارسال فرم یا رزرو تماس، ممکن است نام، ایمیل، متن پیام و فراداده فنی مانند نوع مرورگر و حوزه تقریبی از لاگ‌های سرور را دریافت کنیم. در صورت فعال بودن ابزار تحلیل، داده استفاده مطابق خط‌مشی همان ابزار پردازش می‌شود.",
      },
      {
        title: "چگونه استفاده می‌کنیم",
        body: "ارسال‌ها برای پاسخ به پرسش‌ها، ارائه خدمات، بهبود سایت و در صورت مجاز بودن پیگیری مرتبط با پیشنهادهای سیگما استفاده می‌شود. اطلاعات شخصی نمی‌فروشیم.",
      },
      {
        title: "نگهداری و امنیت",
        body: "تا زمانی که برای اهداف بالا یا مطابق قانون لازم باشد سوابق را نگه می‌داریم. تدابیر فنی و سازمانی معقول اعمال می‌شود؛ انتقال اینترنتی بی‌ریسک نیست.",
      },
      {
        title: "انتخاب‌های شما",
        body: "در صورت وجود حق قانونی می‌توانید دسترسی، اصلاح یا حذف درخواست کنید. از ایمیل یا فرم همین سایت تماس بگیرید؛ ممکن است قبل از انجام درخواست هویت را تأیید کنیم.",
      },
      {
        title: "تغییرات",
        body: "این اطلاعیه ممکن است به‌روز شود؛ تغییرات مهم با تاریخ جدید در همین صفحه منعکس می‌شود.",
      },
    ],
  },
  ZH: {
    kicker: "法律",
    headline: "隐私声明",
    updatedLabel: "最近更新",
    updatedDate: "2026年5月",
    sections: [
      {
        title: "概述",
        body: "本声明说明 Sigma 如何通过本网站（包括联系与线索表单）收集和使用信息。面向一般读者，不能替代您法律顾问要求的特定司法辖区披露。",
      },
      {
        title: "我们收集的信息",
        body: "当您提交表单或预约通话时，我们可能收集姓名、电子邮件、消息内容及浏览器类型、服务器日志推导的大致地区等技术元数据。若启用分析工具，其处理将遵循各自政策。",
      },
      {
        title: "信息的使用",
        body: "我们使用提交内容来回应咨询、运营服务、改进网站，并在许可范围内发送与 Sigma 相关的跟进信息。我们不出售个人信息。",
      },
      {
        title: "保存与安全",
        body: "我们仅在实现上述目的或法律要求所需期间保留联系记录，并采取合理的技术与组织措施；互联网传输并非绝对安全。",
      },
      {
        title: "您的选择",
        body: "在适用法律赋予权利的范围内，您可请求访问、更正或删除个人信息。请通过本站电子邮件或表单联系我们；我们可能需在满足请求前验证身份。",
      },
      {
        title: "变更",
        body: "我们可能不时更新本声明；重大变更将在此页面注明更新日期。",
      },
    ],
  },
  ES: {
    kicker: "Legal",
    headline: "Aviso de privacidad",
    updatedLabel: "Última actualización",
    updatedDate: "Mayo 2026",
    sections: [
      {
        title: "Resumen",
        body: "Este aviso describe cómo Sigma recopila y usa la información enviada por este sitio (incluidos formularios de contacto y leads). Es general y no sustituye revelaciones específicas que exija tu asesor.",
      },
      {
        title: "Datos que recopilamos",
        body: "Al enviar formularios o reservar una llamada podemos recoger nombre, correo, contenido del mensaje y metadatos técnicos como navegador y región aproximada desde logs. Si hay analítica, se rige por sus políticas.",
      },
      {
        title: "Uso de la información",
        body: "Usamos los envíos para responder, operar servicios, mejorar el sitio y—si procede—seguimiento sobre Sigma. No vendemos información personal.",
      },
      {
        title: "Conservación y seguridad",
        body: "Conservamos registros solo el tiempo necesario para los fines anteriores o por ley. Aplicamos salvaguardas razonables; ninguna transmisión es totalmente segura.",
      },
      {
        title: "Tus opciones",
        body: "Puedes solicitar acceso, corrección o supresión donde la ley lo permita. Contáctanos por email o formulario; podemos verificar tu identidad antes de cumplir.",
      },
      {
        title: "Cambios",
        body: "Podemos actualizar este aviso; los cambios relevantes aparecerán aquí con nueva fecha.",
      },
    ],
  },
  RU: {
    kicker: "Правовая информация",
    headline: "Уведомление о конфиденциальности",
    updatedLabel: "Последнее обновление",
    updatedDate: "Май 2026",
    sections: [
      {
        title: "Обзор",
        body: "Здесь описано, как Sigma собирает и использует данные, отправленные через сайт (включая контактные и лид-формы). Документ общий и не заменяет локальные раскрытия, которые может требовать ваш юрист.",
      },
      {
        title: "Какие данные собираем",
        body: "При отправке форм или записи на звонок мы можем получить имя, email, текст сообщения и технические метаданные (браузер, примерный регион из логов). Аналитика, если включена, обрабатывает данные по своим правилам.",
      },
      {
        title: "Как используем",
        body: "Ответы на запросы, работа сервисов, улучшение сайта и—где позволено—след-up по предложениям Sigma. Продажу персональных данных не осуществляем.",
      },
      {
        title: "Хранение и безопасность",
        body: "Храним записи только столько, сколько нужно для целей выше или по закону. Применяем разумные меры; передача через интернет не бывает абсолютно безопасной.",
      },
      {
        title: "Ваши права",
        body: "Вы можете запросить доступ, исправление или удаление там, где это предусмотрено законом. Свяжитесь через email или форму; перед выполнением можем верифицировать личность.",
      },
      {
        title: "Изменения",
        body: "Уведомление может обновляться; существенные изменения отражаются здесь с новой датой.",
      },
    ],
  },
};
