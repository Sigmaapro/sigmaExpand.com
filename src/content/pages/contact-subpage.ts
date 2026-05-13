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
    "Tell us about your roadmap and constraints. Prefer async? Send a short brief and our team will respond with next-step options.",
  bookCall: {
    title: "Book a strategy call",
    subtitle:
      "Book a private strategy call with Sigma. We review your market, traction stage, and growth constraints before the session so the conversation starts with context.",
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
