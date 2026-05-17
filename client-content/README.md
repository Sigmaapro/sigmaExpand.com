# Sigma Website — Client Content Intake

## 1. Purpose

This folder is for collecting **all client-provided materials** for the Sigma Website before they are reviewed, cleaned, and moved into the production content system (`src/content/`, locale files, assets under `public/`, etc.).

Use it as the single internal drop zone for copy, brand assets, market notes, insight drafts, business details, feedback, and launch checklists.

---

## 2. Important rule

**Files here are internal only.** Nothing in `/client-content` is automatically published to the live website.

- Do not import these paths from app routes, components, or `src/content/`.
- Production updates happen only after review and explicit approval.

---

## 3. Folder guide

| Folder | Use for |
|--------|---------|
| **01-brand** | Logo files, brand notes, tone of voice, visual references, color/type references |
| **02-copy** | Homepage copy, about copy, services copy, CTA copy, multilingual copy notes |
| **03-assets** | Images, videos, icons, screenshots, visual references, raw design files |
| **04-market-pages** | UAE, Turkey, Iran, China, Global market content; regional proof/trust notes |
| **05-insights** | Article ideas, drafts, source notes, Web3 growth insights, SEO topic ideas |
| **06-contact-and-business-info** | Business email, contact details, Calendly links, social links, legal/company info, partner notes |
| **07-client-feedback** | Client comments, requested edits, approval notes, revision history |
| **08-launch-notes** | Domain notes, DNS notes, production launch checklist, post-launch tasks |

---

## 4. Content status labels

When naming files or adding a line at the top of a doc, use one of these labels:

| Label | Meaning |
|-------|---------|
| **RAW** | Just received; not reviewed |
| **REVIEWED** | Checked for quality and fit; may need edits |
| **APPROVED** | Client/sign-off ready for implementation |
| **NEEDS TRANSLATION** | Approved in one language; other locales pending |
| **READY FOR WEBSITE** | Cleared to move into `src/content/` or production assets |
| **DO NOT USE** | Out of scope, outdated, or rejected — keep for record only |

Example filename: `RAW_uae-market-positioning-v1.md`

---

## 5. Multilingual reminder

The live site supports:

- **EN** — English  
- **FA** — Persian (RTL)  
- **AR** — Arabic (RTL)  
- **TR** — Turkish  
- **RU** — Russian  
- **ZH** — Chinese (Simplified)  
- **ES** — Spanish  

**RTL languages:** FA, AR — ensure copy and layout notes account for right-to-left reading where relevant.

Do not place English-only copy in non-English production locale files without translation.

---

## 6. Workflow

1. **Client sends** content/assets (email, Drive, etc.).  
2. **Babak places** files in the correct subfolder here.  
3. **Content is reviewed** and cleaned; status label updated.  
4. **Approved content** is moved or transcribed into the real content system (`src/content/`, `public/`, env notes in `08-launch-notes`).  
5. **Cursor/Agent** updates production files **only after approval** — never directly from unreviewed drops in this folder.

---

## 7. Warning

**Do not directly import files from `/client-content` into production components without review.**

Templates in subfolders are guides only; they are not wired to the Next.js app.
