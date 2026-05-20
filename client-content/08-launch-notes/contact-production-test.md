# Contact & lead routing — production test checklist

Use this after deploying to **https://sigmaa.pro** with production env vars set in Vercel.

## Before you test

1. **Vercel → Project → Settings → Environment Variables (Production)**
   - `NEXT_PUBLIC_SITE_URL` = `https://sigmaa.pro`
   - `RESEND_API_KEY` = your Resend API key (server only)
   - `CONTACT_EMAIL` = inbox that should receive leads (e.g. `BD@sigmaa.pro`)
   - `EMAIL_FROM` = verified sender in Resend (e.g. `Sigma <leads@sigmaa.pro>`)
   - Optional: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
   - Optional: `NEXT_PUBLIC_CALENDLY_URL` (inline embed URL from Calendly)
   - Optional: `NEXT_PUBLIC_SOCIAL_EMAIL` (shown on `/contact` hub if set)

2. **Resend**
   - Add and verify sending domain (`sigmaa.pro`) in Resend → Domains.
   - Confirm `EMAIL_FROM` uses that verified domain (not `onboarding@resend.dev` in production).

3. Redeploy after changing env vars.

## Manual tests

### A. Contact page form (`/contact`)

1. Open `/contact` in **EN**.
2. Submit name, email, and message → expect success copy; no console errors.
3. Check **CONTACT_EMAIL** inbox and **Resend → Logs** for the lead.
4. Repeat in **FA** and **AR** — confirm RTL layout and localized labels/errors.

### B. Book a Call modal (homepage)

1. Open homepage → **Book a Call** (final CTA section).
2. If `NEXT_PUBLIC_CALENDLY_URL` is set: Calendly iframe loads; pick a test slot or confirm embed loads without console errors.
3. If Calendly is **not** set: submit the lead form → success state; verify email/Telegram as above.

### C. Live support widget (homepage, headphones button)

1. Open panel, submit email + message.
2. Confirm delivery to inbox / Resend / Telegram (if configured).

### D. Misconfiguration check (optional, staging only)

1. Temporarily remove `RESEND_API_KEY` on a preview deploy.
2. Submit form → user should see localized “temporarily unavailable” (503), not a stack trace.

### E. Legacy / spam

1. Do not fill hidden honeypot fields (automation should leave `website` empty).
2. Confirm no secrets appear in browser Network tab responses.

## What to verify

| Check | Pass? |
|-------|-------|
| Lead email received at `CONTACT_EMAIL` | |
| Resend log shows `delivered` (or clear error) | |
| Telegram message (if enabled) | |
| Calendly embed or form fallback works | |
| EN / FA / AR forms usable on mobile | |
| No `RESEND_API_KEY` in client bundle or Network responses | |

## If email fails

- Resend log error → domain not verified or `EMAIL_FROM` not allowed.
- 503 on submit → missing `RESEND_API_KEY` or `CONTACT_EMAIL`.
- 502 → both email and Telegram failed; check Resend/Telegram credentials.

## Client confirmation

Confirm with Babak/client:

- Final mailbox: `BD@sigmaa.pro` vs `partners@sigmaa.pro` (or other).
- Production `EMAIL_FROM` address and verified domain.
- Whether Telegram alerts are required for launch.
