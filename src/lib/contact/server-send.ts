import { escapeHtml } from "./sanitize";

export type LeadSource = "book-call" | "live-support" | "contact-form";
export type EmailAttachment = {
  filename: string;
  content: string;
  type?: string;
};

function getResendKey(): string | undefined {
  const k = process.env.RESEND_API_KEY ?? process.env.EMAIL_API_KEY;
  return k?.trim() || undefined;
}

export async function sendLeadEmail(params: {
  to: string;
  from: string;
  name: string;
  email: string;
  message: string;
  source: LeadSource;
}): Promise<void> {
  const key = getResendKey();
  if (!key) {
    throw new Error("Email API key not configured");
  }

  const subject = `New Sigma lead (${params.source})`;
  const html = `
    <p><strong>Source:</strong> ${escapeHtml(params.source)}</p>
    <p><strong>Name:</strong> ${escapeHtml(params.name || "—")}</p>
    <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(params.message || "—")}</pre>
  `;

  await sendResendEmail({
    key,
    from: params.from,
    to: params.to,
    subject,
    html,
  });
}

async function sendResendEmail(params: {
  key: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      ...(params.attachments && params.attachments.length > 0
        ? { attachments: params.attachments }
        : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
}

export async function sendPartnerEmail(params: {
  to: string;
  from: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<void> {
  const key = getResendKey();
  if (!key) {
    throw new Error("Email API key not configured");
  }

  await sendResendEmail({
    key,
    from: params.from,
    to: params.to,
    subject: params.subject,
    html: params.html,
    attachments: params.attachments,
  });
}

export async function sendLeadTelegram(params: {
  token: string;
  chatId: string;
  name: string;
  email: string;
  message: string;
  source: LeadSource;
}): Promise<void> {
  const text = [
    `New Sigma lead (${params.source})`,
    `Name: ${params.name || "—"}`,
    `Email: ${params.email}`,
    `Message: ${params.message || "—"}`,
  ].join("\n");

  const url = `https://api.telegram.org/bot${encodeURIComponent(params.token)}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: params.chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram ${res.status}: ${body.slice(0, 200)}`);
  }
}

export function getEmailTransportReady(): boolean {
  const to = process.env.CONTACT_EMAIL?.trim();
  return Boolean(getResendKey() && to);
}

export function getTelegramReady(): boolean {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  return Boolean(token && chatId);
}
