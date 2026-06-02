import { NextResponse } from "next/server";
import {
  sendPartnerEmail,
  type EmailAttachment,
} from "@/lib/contact/server-send";
import { escapeHtml, isValidEmail, sanitizeText } from "@/lib/contact/sanitize";

export const runtime = "nodejs";

const MAX_TEXT = 12000;
const MAX_NAME = 200;
const MAX_COMPANY = 240;
const MAX_URL = 600;
const MAX_COUNTRY = 140;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const PARTNER_RECIPIENT = "BD@sigmaa.pro";

const ALLOWED_FILE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
]);

type IntentType = "company" | "kol";
type KolRole = "KOL" | "IB" | "Trader";
const ALLOWED_KOL_ROLES = new Set<KolRole>(["KOL", "IB", "Trader"]);

function normalizeOptionalUrl(raw: string): string | null {
  const value = sanitizeText(raw, MAX_URL);
  if (!value) return null;
  try {
    const url = value.startsWith("http://") || value.startsWith("https://")
      ? new URL(value)
      : new URL(`https://${value}`);
    return url.toString();
  } catch {
    return null;
  }
}

function parseIntentType(value: FormDataEntryValue | null): IntentType | null {
  if (typeof value !== "string") return null;
  if (value === "company" || value === "kol") return value;
  return null;
}

function parseKolRoles(values: FormDataEntryValue[]): { roles: KolRole[]; hasInvalid: boolean } {
  const roleStrings = values
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  const roles: KolRole[] = [];
  let hasInvalid = false;
  for (const value of roleStrings) {
    if (ALLOWED_KOL_ROLES.has(value as KolRole)) {
      roles.push(value as KolRole);
    } else {
      hasInvalid = true;
    }
  }

  return { roles: Array.from(new Set(roles)), hasInvalid };
}

function getFromAddress() {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.FROM_EMAIL?.trim() ||
    "Sigma <onboarding@resend.dev>"
  );
}

function buildCommonHtml(params: {
  formType: string;
  locale: string;
  submittedFrom: string;
  timestamp: string;
}) {
  return `
    <p><strong>Form Type:</strong> ${escapeHtml(params.formType)}</p>
    <p><strong>Locale:</strong> ${escapeHtml(params.locale || "—")}</p>
    <p><strong>Submitted From:</strong> ${escapeHtml(params.submittedFrom || "—")}</p>
    <p><strong>Timestamp:</strong> ${escapeHtml(params.timestamp)}</p>
  `;
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const honeypot = sanitizeText(
    typeof formData.get("website_honeypot") === "string"
      ? (formData.get("website_honeypot") as string)
      : "",
    200,
  );
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const intentType = parseIntentType(formData.get("intentType"));
  if (!intentType) {
    return NextResponse.json({ error: "Invalid intent type" }, { status: 400 });
  }

  const locale = sanitizeText(
    typeof formData.get("locale") === "string" ? (formData.get("locale") as string) : "",
    20,
  );
  const submittedFrom = sanitizeText(
    typeof formData.get("submittedFrom") === "string"
      ? (formData.get("submittedFrom") as string)
      : "",
    700,
  );
  const timestamp = new Date().toISOString();

  const fullName = sanitizeText(
    typeof formData.get("fullName") === "string" ? (formData.get("fullName") as string) : "",
    MAX_NAME,
  );
  const email = sanitizeText(
    typeof formData.get("email") === "string" ? (formData.get("email") as string) : "",
    320,
  );
  const description = sanitizeText(
    typeof formData.get("description") === "string"
      ? (formData.get("description") as string)
      : "",
    MAX_TEXT,
  );

  if (!fullName || !description) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const to = PARTNER_RECIPIENT;
  const from = getFromAddress();

  try {
    if (intentType === "company") {
      const companyName = sanitizeText(
        typeof formData.get("companyName") === "string"
          ? (formData.get("companyName") as string)
          : "",
        MAX_COMPANY,
      );
      if (!companyName) {
        return NextResponse.json({ error: "Company name required" }, { status: 400 });
      }

      const rawWebsite = typeof formData.get("websiteAddress") === "string"
        ? (formData.get("websiteAddress") as string)
        : "";
      const websiteAddress = rawWebsite ? normalizeOptionalUrl(rawWebsite) : null;
      if (rawWebsite && !websiteAddress) {
        return NextResponse.json({ error: "Invalid website address" }, { status: 400 });
      }

      const subject = "New Sigma Company Partnership Request";
      const html = `
        ${buildCommonHtml({
          formType: "Company",
          locale,
          submittedFrom,
          timestamp,
        })}
        <p><strong>Name &amp; Last Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Company Name:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Website Address:</strong> ${escapeHtml(websiteAddress ?? "—")}</p>
        <p><strong>Description:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(description)}</pre>
      `;

      await sendPartnerEmail({ to, from, subject, html });
      return NextResponse.json({ ok: true });
    }

    const { roles, hasInvalid } = parseKolRoles(formData.getAll("roles"));
    if (hasInvalid) {
      return NextResponse.json({ error: "Invalid role value" }, { status: 400 });
    }
    if (roles.length === 0) {
      return NextResponse.json({ error: "Role required" }, { status: 400 });
    }

    const rawSocial = typeof formData.get("socialLink") === "string"
      ? (formData.get("socialLink") as string)
      : "";
    const socialLink = rawSocial ? normalizeOptionalUrl(rawSocial) : null;
    if (rawSocial && !socialLink) {
      return NextResponse.json({ error: "Invalid social link" }, { status: 400 });
    }

    const country = sanitizeText(
      typeof formData.get("country") === "string" ? (formData.get("country") as string) : "",
      MAX_COUNTRY,
    );

    const rawFile = formData.get("performanceScreenshot");
    let screenshotText = "Not provided";
    let attachments: EmailAttachment[] | undefined;

    if (rawFile instanceof File && rawFile.size > 0) {
      if (rawFile.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
      }
      if (!ALLOWED_FILE_TYPES.has(rawFile.type)) {
        return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
      }

      const cleanFilename = sanitizeText(rawFile.name || "performance-file", 180);
      const bytes = Buffer.from(await rawFile.arrayBuffer());
      attachments = [
        {
          filename: cleanFilename || "performance-file",
          content: bytes.toString("base64"),
          type: rawFile.type,
        },
      ];
      screenshotText = `${cleanFilename} (attached)`;
    }

    const subject = "New Sigma KOL / IB / Trader Application";
    const html = `
      ${buildCommonHtml({
        formType: "KOL / IB / Trader",
        locale,
        submittedFrom,
        timestamp,
      })}
      <p><strong>Name &amp; Last Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Role(s):</strong> ${escapeHtml(roles.join(", "))}</p>
      <p><strong>Social Media Link:</strong> ${escapeHtml(socialLink ?? "—")}</p>
      <p><strong>Country:</strong> ${escapeHtml(country || "—")}</p>
      <p><strong>Performance Screenshot:</strong> ${escapeHtml(screenshotText)}</p>
      <p><strong>Description:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(description)}</pre>
    `;

    await sendPartnerEmail({ to, from, subject, html, attachments });
    return NextResponse.json({ ok: true, attached: Boolean(attachments?.length) });
  } catch (error) {
    console.error("[partner] submission failed", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("Email API key not configured")) {
      return NextResponse.json({ error: "Lead capture is not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
