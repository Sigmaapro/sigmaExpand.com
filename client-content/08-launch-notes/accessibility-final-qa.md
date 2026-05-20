# Accessibility final QA — manual checklist

Use after deploy to **https://sigmaa.pro**. Automated lint/build do not replace keyboard and screen-reader testing.

## Tools

- Keyboard only (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)
- macOS **VoiceOver** (Safari) or iOS VoiceOver
- Android **TalkBack** (Chrome) — optional
- Chrome DevTools → Lighthouse → Accessibility (secondary)
- System **Reduce motion** enabled for one pass

## Languages

Test at minimum: **EN**, **FA**, **AR**, plus **TR** or **ES**.

---

## 1. Keyboard navigation

- [ ] Tab through homepage header: logo, language switcher, menu button, in-page CTAs
- [ ] Open mobile menu with Enter/Space on hamburger; Tab through links; Escape closes
- [ ] After menu close, focus returns to a sensible element (menu button or prior focus)
- [ ] Tab through footer links (no keyboard traps)
- [ ] Tab through `/contact` form fields in logical order
- [ ] Submit contact form with Enter from a field
- [ ] Open **Book a Call** modal; Tab stays inside modal; Escape closes
- [ ] Open **Live support** panel; Tab through fields; Escape closes
- [ ] Tab through insights listing cards and article CTAs

## 2. Focus visibility

- [ ] Every focused link/button shows a visible ring (uranian/blue `#bde0fe` style)
- [ ] Language switcher trigger shows focus when tabbed
- [ ] Market region tabs show focus when tabbed
- [ ] Form inputs show border/ring on focus

## 3. Language switcher (combobox + listbox)

- [ ] Trigger announces expanded/collapsed (screen reader)
- [ ] Arrow Down/Up opens list and moves active option
- [ ] Home / End jump to first/last language
- [ ] Enter or Space on option applies language
- [ ] Escape closes and returns focus to trigger
- [ ] All 7 languages selectable: EN, FA, AR, TR, RU, ZH, ES
- [ ] FA/AR switch: page `dir` becomes RTL; layout remains usable

## 4. Mobile navigation

- [ ] Menu button has clear accessible name (open/close)
- [ ] `aria-expanded` reflects open state
- [ ] Panel labeled (`sheetAriaLabel` / dialog semantics)
- [ ] Close (×) button reachable and labeled
- [ ] Section links and accordions (Locations, Services, Insights) readable
- [ ] Choosing a link closes menu and navigates/scrolls
- [ ] Body scroll restored after close (not permanently locked)

## 5. Book Call modal

- [ ] Announced as dialog; title and description referenced
- [ ] Close button labeled
- [ ] Focus trapped while open
- [ ] Escape closes
- [ ] With Calendly: iframe has descriptive `title`
- [ ] Without Calendly: form labels associated with inputs; errors announced (`role="alert"`)
- [ ] Success message announced (`role="status"`)

## 6. Contact page & live support

- [ ] All fields have labels (visible or screen-reader-only)
- [ ] Required fields marked (`required` / `aria-required`)
- [ ] Validation errors use `role="alert"`
- [ ] Success uses `role="status"`
- [ ] Submit shows busy state while sending (`aria-busy`)
- [ ] Honeypot field not in tab order and hidden from AT
- [ ] FA/AR: labels and errors read in correct direction

## 7. Reduced motion

- [ ] With **Reduce motion** on: smooth scroll off; heavy motion minimized
- [ ] WebGL canvas not shown on desktop reduced-motion (or acceptable static fallback)
- [ ] Mobile: no WebGL (gradient background only)
- [ ] Magnetic CTA buttons do not shift on keyboard focus (mobile/narrow)

## 8. Color & contrast (spot check)

- [ ] Body text on dark background readable
- [ ] Footer/metadata `#8b939e` / `#adb5bd` readable
- [ ] Error text `#ff8f8f` readable on dark panels
- [ ] Disabled buttons still identifiable (not only by color)
- [ ] Placeholder text not sole indicator of field purpose

## 9. Insights & articles

- [ ] Card titles and “read more” links descriptive
- [ ] RTL: read-more arrow direction correct (FA/AR)
- [ ] Article CTA buttons keyboard-accessible

## 10. Lighthouse / automated (optional)

- [ ] Run Lighthouse Accessibility on Home, Contact, one Insight article
- [ ] Note any contrast or heading-order issues for follow-up

---

## Sign-off

| Tester | Date | Browser / AT | Pass / notes |
|--------|------|----------------|--------------|
| | | | |

Known limitations to accept or track:

- Custom combobox (not native `<select>`) — verify with VoiceOver/TalkBack
- Calendly iframe accessibility depends on third-party embed
- Some homepage motion remains for users without reduced-motion preference
