"use client";

import {
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { ComponentType } from "react";
import { useCallback, useState, type FormEvent } from "react";
import { CalendarPlus } from "lucide-react";
import { BookCallModal } from "@/components/sigma/BookCallModal";
import { MarketingSubpageScaffold } from "@/components/site/MarketingSubpageScaffold";
import {
  contactSubpageContentByLang,
} from "@/content/global/marketing/contactSubpageContent";
import { pickLang } from "@/content/global/marketing/helpers";
import {
  socialLinks,
  type SocialPlatformKey,
} from "@/content/socials";
import { isValidEmail } from "@/lib/contact/sanitize";
import { submitLead } from "@/lib/contact/client";
import { useLanguage } from "@/context/LanguageContext";

const SOCIAL_ORDER: SocialPlatformKey[] = [
  "x",
  "instagram",
  "telegram",
  "linkedin",
  "youtube",
  "whatsapp",
  "discord",
  "tiktok",
];

const SOCIAL_ICON_MAP: Record<
  SocialPlatformKey,
  ComponentType<{ className?: string }>
> = {
  x: FaXTwitter,
  instagram: FaInstagram,
  telegram: FaTelegram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  discord: FaDiscord,
  tiktok: FaTiktok,
};

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSubpageView() {
  const { t, isRtl, language } = useLanguage();
  const copy = pickLang(contactSubpageContentByLang, language);
  const sc = t.stayConnected;

  const [bookOpen, setBookOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setErrorText("");
      const em = email.trim();
      const msg = message.trim();
      if (!em || !msg) {
        setFormState("error");
        setErrorText(copy.form.validationError);
        return;
      }
      if (!isValidEmail(em)) {
        setFormState("error");
        setErrorText(copy.form.invalidEmailError);
        return;
      }
      try {
        setFormState("loading");
        const result = await submitLead({
          email: em,
          name: name.trim() || undefined,
          message: msg,
          source: "live-support",
        });
        if (!result.ok) throw new Error(result.error);
        setFormState("success");
        setMessage("");
      } catch {
        setFormState("error");
        setErrorText(copy.form.sendError);
      }
    },
    [copy.form, email, message, name],
  );

  return (
    <MarketingSubpageScaffold>
      <BookCallModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        isRtl={isRtl}
        lang={language}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {copy.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {copy.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#b6bcc4] md:text-base">
            {copy.intro}
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12">
          <section className="rounded-2xl border border-white/[0.08] bg-[#07090f]/70 p-6 shadow-[0_20px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-lg font-semibold text-white">
                {copy.bookCall.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#8b939e]">
                {copy.bookCall.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/25 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_32px_rgba(28,57,187,0.28)] transition-[background,transform] hover:bg-[#1c39bb]/45 active:scale-[0.99]"
            >
              <CalendarPlus className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {copy.bookCall.cta}
            </button>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-[#07090f]/70 p-6 backdrop-blur-md sm:p-8">
            <h2 className="font-display text-lg font-semibold text-white">
              {copy.form.title}
            </h2>
            {formState === "success" ? (
              <p className="mt-6 text-sm leading-relaxed text-[#bde0fe]">{copy.form.success}</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {formState === "error" && errorText ? (
                  <p className="text-sm text-[#ff8f8f]" role="alert">
                    {errorText}
                  </p>
                ) : null}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#868e96]"
                  >
                    {copy.form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#05070c] px-3 py-2.5 text-sm text-[#f1f3f5] outline-none focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#868e96]"
                  >
                    {copy.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#05070c] px-3 py-2.5 text-sm text-[#f1f3f5] outline-none focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#868e96]"
                  >
                    {copy.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 min-h-[6rem] w-full resize-y rounded-md border border-white/[0.1] bg-[#05070c] px-3 py-2.5 text-sm text-[#f1f3f5] outline-none focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#2a4ecf]/80 bg-[#1c39bb] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-[background,opacity] hover:bg-[#152a8a] disabled:opacity-60"
                >
                  {formState === "loading" ? copy.form.sending : copy.form.submit}
                </button>
              </form>
            )}
          </section>
        </div>

        <section className="mx-auto mt-14 max-w-5xl">
          <h2 className="font-display text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#8b939e]">
            {copy.social.title}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {SOCIAL_ORDER.map((key) => {
              const Icon = SOCIAL_ICON_MAP[key];
              const href = socialLinks[key].trim();
              const enabled = href.length > 0;
              const label = sc.socialLabels[key];
              const cardClass =
                "group flex min-h-[76px] items-center gap-2.5 rounded-xl border px-3 py-3 transition-[transform,border-color,background-color] duration-200 " +
                (enabled
                  ? "border-white/[0.1] bg-white/[0.03] text-[#e3edf8] hover:scale-[1.02] hover:border-[#6ea8ff]/50 hover:bg-[#1c39bb]/[0.14]"
                  : "cursor-not-allowed border-white/[0.06] bg-white/[0.015] text-[#6f7884] opacity-55");

              const inner = (
                <>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#bde0fe] transition-colors group-hover:text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-xs font-medium tracking-wide">{label}</span>
                </>
              );

              if (!enabled) {
                return (
                  <div key={key} className={cardClass} aria-disabled>
                    {inner}
                  </div>
                );
              }

              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </MarketingSubpageScaffold>
  );
}
