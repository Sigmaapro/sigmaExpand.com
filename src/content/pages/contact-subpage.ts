import type { PageMeta } from "./meta";

/** SEO + UI copy for `/contact` (full marketing page; distinct from `contactPageContent` in `contact.ts` for ContactHub) */
export const contactSubpageMeta: PageMeta = {
  title: "Contact",
  description:
    "Book a strategy call or send a message to Sigma. We help exchanges and protocols with liquidity, distribution, and technical execution.",
};

export const contactSubpageContent = {
  kicker: "Start a conversation",
  headline: "Let’s build what’s next",
  intro:
    "Tell us about your roadmap and constraints. For structured discovery, book a call—we’ll come prepared with relevant benchmarks and options.",
  bookCall: {
    title: "Book a strategy call",
    subtitle:
      "Reserve time with our team. If Calendly is configured, you’ll see live availability; otherwise we’ll follow up by email.",
    cta: "Book a call",
  },
  form: {
    title: "Send a message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "How can we help?",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks—your message is on its way. We’ll reply shortly.",
    validationError: "Please enter your email and a message.",
    invalidEmailError: "Enter a valid email address.",
    sendError: "Something went wrong. Try again or email us directly.",
  },
  social: {
    title: "Connect",
  },
};
