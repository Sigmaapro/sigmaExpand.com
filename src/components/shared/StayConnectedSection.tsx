import Link from "next/link";
import type { ComponentType } from "react";
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
import { socialContactEmail, socialLinks, type SocialPlatformKey } from "@/content/socials";

type SocialItem = {
  key: SocialPlatformKey;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const socialItems: SocialItem[] = [
  { key: "x", label: "X (Twitter)", href: socialLinks.x, icon: FaXTwitter },
  { key: "instagram", label: "Instagram", href: socialLinks.instagram, icon: FaInstagram },
  { key: "telegram", label: "Telegram", href: socialLinks.telegram, icon: FaTelegram },
  { key: "linkedin", label: "LinkedIn", href: socialLinks.linkedin, icon: FaLinkedinIn },
  { key: "youtube", label: "YouTube", href: socialLinks.youtube, icon: FaYoutube },
  { key: "whatsapp", label: "WhatsApp", href: socialLinks.whatsapp, icon: FaWhatsapp },
  { key: "discord", label: "Discord", href: socialLinks.discord, icon: FaDiscord },
  { key: "tiktok", label: "TikTok", href: socialLinks.tiktok, icon: FaTiktok },
];

export function StayConnectedSection() {
  return (
    <section
      id="contact"
      className="relative z-10 border-t border-white/[0.06] bg-[#0b0f16]/88 px-4 py-12 backdrop-blur-sm sm:px-6 md:px-10 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1420]/80 via-[#0d1220]/70 to-[#0a0f18]/75 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-center md:gap-10 lg:p-9">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#bde0fe]/90">
            CONTACT
          </p>
          <h2 className="text-balance font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Stay Connected with Sigma
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#aeb5bd] sm:text-[15px]">
            Follow Sigma across strategic channels for network updates, market intelligence,
            and direct communication with our growth infrastructure team.
          </p>
          <p className="mt-4 text-xs text-[#8f98a3] sm:text-sm">
            Reach us at{" "}
            <a
              href={`mailto:${socialContactEmail}`}
              className="font-medium text-[#d4e8ff] underline-offset-4 hover:underline"
            >
              {socialContactEmail}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {socialItems.map((item) => {
            const Icon = item.icon;
            const enabled = item.href.trim().length > 0;
            const cardClass =
              "group flex min-h-[76px] items-center gap-2.5 rounded-xl border px-3 py-3 transition-[transform,border-color,box-shadow,background-color] duration-250 " +
              (enabled
                ? "border-white/[0.1] bg-white/[0.03] text-[#e3edf8] hover:scale-[1.06] hover:border-[#6ea8ff]/50 hover:bg-[#1c39bb]/[0.14] hover:shadow-[0_0_28px_rgba(28,57,187,0.25)]"
                : "cursor-not-allowed border-white/[0.06] bg-white/[0.015] text-[#6f7884] opacity-55");

            const content = (
              <>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#bde0fe] transition-colors group-hover:text-white">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
              </>
            );

            if (!enabled) {
              return (
                <div key={item.key} className={cardClass} aria-disabled>
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
