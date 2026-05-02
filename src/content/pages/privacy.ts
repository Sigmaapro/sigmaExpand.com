import type { PageMeta } from "./meta";

export const privacyPageMeta: PageMeta = {
  title: "Privacy",
  description:
    "How Sigma handles information when you use our website and contact channels.",
};

export const privacyPageContent = {
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
};
