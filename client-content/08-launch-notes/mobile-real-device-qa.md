# Mobile real-device QA checklist

Use this after deploy to **https://sigmaa.pro**. Desktop responsive mode in DevTools is useful for quick checks, but **real phones are required** before launch sign-off.

## Devices (priority)

1. **iPhone** — Safari (primary)
2. **Android** — Chrome (if available)
3. Desktop browser responsive mode — secondary only

## Languages to test

| Priority | Lang | Notes |
|----------|------|--------|
| Required | EN | Baseline |
| Required | FA | RTL |
| Required | AR | RTL |
| Required | TR or ES | One additional LTR locale |

Switch language via the globe control in the homepage nav (mobile: center of nav bar) or Marketing header on inner pages.

---

## Pages

### 1. Home (`/`)

- [ ] Page loads without long white flash
- [ ] **No horizontal scroll** (swipe left/right on body)
- [ ] Hero headline and subtitle readable; primary + secondary CTAs visible without excessive scroll
- [ ] Tap **Get Access** / secondary CTA — navigates correctly (same tab)
- [ ] Open **hamburger menu** — panel opens; close (×) works; Escape closes
- [ ] Tap a section link (About, Capabilities, etc.) — scrolls and menu closes
- [ ] **Locations** accordion lists UAE, Turkey, WANA, Greater China, LATAM, Balkans, Global — links work
- [ ] **Markets** section: region tabs scroll horizontally; active tab visible; panel text readable
- [ ] **Book a Call** (bottom CTA) — modal opens; form or Calendly usable; closes cleanly
- [ ] **Live support** (headphones, bottom corner) — panel opens; does not cover primary CTAs; safe-area respected on iPhone
- [ ] Footer links tappable; email/social open as expected
- [ ] Animations feel acceptable (no severe jank); WebGL should **not** run on phone (gradient fallback only)

### 2. Services (`/services`)

- [ ] Header: logo, Get Access, language switcher fit on narrow screen
- [ ] No horizontal overflow
- [ ] CTAs tappable (min ~44px touch target)

### 3. Markets (`/markets/uae`, `/markets/wana`, etc.)

- [ ] Heading and description wrap (long FA/AR copy)
- [ ] Back/nav via header works

### 4. Insights (`/insights`)

- [ ] Cards stack in one column
- [ ] Category + date row wraps
- [ ] Read-more arrow direction correct in FA/AR

### 5. Article detail (`/insights/[slug]`)

- [ ] Hero image scales; title wraps
- [ ] Body readable; no side scroll
- [ ] Article CTA block tappable

### 6. Contact (`/contact`)

- [ ] Two blocks stack on mobile (Book call + message form)
- [ ] Form fields full width; labels aligned (check FA/AR)
- [ ] Submit shows loading → success or clear error
- [ ] Social grid usable (2 columns)

### 7. 404 (optional)

- [ ] Helpful message; link home works

---

## RTL-specific (FA / AR)

- [ ] Page `dir` feels correct (text flows right-to-left)
- [ ] Hero eyebrow accent line on correct side
- [ ] CTA arrows point appropriately (not mirrored wrong)
- [ ] Mobile menu sheet reads naturally
- [ ] Market tab scroll still works
- [ ] Insight card “read more” arrow
- [ ] Contact form labels and errors aligned

---

## Performance & interaction

- [ ] No console errors in remote debug (Safari Web Inspector / Chrome `chrome://inspect`)
- [ ] Network: `/api/contact` only when submitting forms (not on every page load)
- [ ] Pinch-zoom not broken (viewport meta)
- [ ] Fixed nav does not jump when address bar shows/hides (iOS Safari)
- [ ] `prefers-reduced-motion: reduce` — animations minimized (system setting test)

---

## Calendly (if `NEXT_PUBLIC_CALENDLY_URL` set)

- [ ] Book Call modal shows embed
- [ ] iframe scrollable inside modal; modal scroll does not trap page
- [ ] Close returns to page

---

## Sign-off

| Tester | Date | Device | Pass / issues |
|--------|------|--------|----------------|
| | | | |

Log issues with: page URL, language, screenshot, and steps to reproduce.
