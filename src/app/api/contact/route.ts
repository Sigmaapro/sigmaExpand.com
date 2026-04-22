import { NextResponse } from "next/server";
import { sanitizeText, isValidEmail } from "@/lib/contact/sanitize";
import {
  getEmailTransportReady,
  getTelegramReady,
  sendLeadEmail,
  sendLeadTelegram,
  type LeadSource,
} from "@/lib/contact/server-send";

const MAX_NAME = 200;
const MAX_MESSAGE = 8000;

const SOURCES = new Set<LeadSource>(["book-call", "live-support"]);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const rawEmail = typeof o.email === "string" ? o.email : "";
  const email = sanitizeText(rawEmail, 320);
  const name = sanitizeText(typeof o.name === "string" ? o.name : "", MAX_NAME);
  const message = sanitizeText(typeof o.message === "string" ? o.message : "", MAX_MESSAGE);
  const sourceRaw = typeof o.source === "string" ? o.source : "book-call";
  const source = SOURCES.has(sourceRaw as LeadSource)
    ? (sourceRaw as LeadSource)
    : ("book-call" as LeadSource);

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (source === "live-support" && !message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const emailReady = getEmailTransportReady();
  const telegramReady = getTelegramReady();

  if (!emailReady && !telegramReady) {
    return NextResponse.json(
      { error: "Lead capture is not configured" },
      { status: 503 },
    );
  }

  const results: boolean[] = [];

  if (emailReady) {
    const to = process.env.CONTACT_EMAIL!.trim();
    const from =
      process.env.EMAIL_FROM?.trim() ||
      process.env.FROM_EMAIL?.trim() ||
      "Sigma <onboarding@resend.dev>";

    try {
      await sendLeadEmail({ to, from, name, email, message, source });
      results.push(true);
    } catch (e) {
      console.error("[contact] email send failed", e);
      results.push(false);
    }
  }

  if (telegramReady) {
    try {
      await sendLeadTelegram({
        token: process.env.TELEGRAM_BOT_TOKEN!.trim(),
        chatId: process.env.TELEGRAM_CHAT_ID!.trim(),
        name,
        email,
        message,
        source,
      });
      results.push(true);
    } catch (e) {
      console.error("[contact] telegram send failed", e);
      results.push(false);
    }
  }

  if (results.length === 0) {
    return NextResponse.json(
      { error: "Lead capture is not configured" },
      { status: 503 },
    );
  }

  if (!results.some(Boolean)) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }

  const partial =
    results.length > 1 && results.some(Boolean) && results.some((r) => !r);

  return NextResponse.json({ ok: true, ...(partial ? { partial: true } : {}) });
}
