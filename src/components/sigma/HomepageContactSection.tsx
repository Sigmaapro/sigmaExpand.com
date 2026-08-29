"use client";

import { useMemo, type ComponentType } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
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
import { getGlobalFooter } from "@/content/global/footer";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import { pickLang } from "@/content/global/marketing/helpers";
import { ROUTES } from "@/content/global/routes";
import { contactSubpageContentByLang } from "@/content/global/marketing/contactSubpageContent";
import {
  getConfiguredSocials,
  socialContactEmail,
  type SocialPlatformKey,
} from "@/content/socials";
import { useLanguage } from "@/context/LanguageContext";
import { useClientMinWidth } from "@/hooks/useMedia";
import { localeBody, localeCta, localeEyebrow, localeHeading } from "@/lib/localeTypography";
import "./HomepageContactSection.css";

type HubNode = {
  id: string;
  href: string;
  label: string;
  ariaLabel: string;
  external: boolean;
  Icon: ComponentType<{ className?: string }>;
};

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

export function HomepageContactSection() {
  const { language, isRtl } = useLanguage();
  const copy = pickLang(contactSubpageContentByLang, language);
  const footer = getGlobalFooter(language);
  const cta = getHomeSectionLinks(language).contact;
  const reduceMotion = useReducedMotion() ?? false;
  const isDesktop = useClientMinWidth(1024);
  const useMotionDock = isDesktop === true && !reduceMotion;

  const nodes = useMemo<HubNode[]>(
    () => [
      {
        id: "email",
        href: `mailto:${socialContactEmail}`,
        label: copy.form.emailLabel,
        ariaLabel: `${copy.form.emailLabel}: ${socialContactEmail}`,
        external: false,
        Icon: Mail,
      },
      ...getConfiguredSocials().map((item) => ({
        id: item.key,
        href: item.href,
        label: footer.socialLabels[item.key],
        ariaLabel: footer.socialLabels[item.key],
        external: true,
        Icon: SOCIAL_ICON_MAP[item.key],
      })),
    ],
    [copy.form.emailLabel, footer.socialLabels],
  );

  return (
    <section
      id="contact"
      className="sigma-contact-hub sigma-landing-section-shell relative z-10 scroll-mt-24 px-5 py-14 sm:px-6 sm:py-16 md:scroll-mt-28 md:px-12 md:py-20 lg:px-20"
      aria-labelledby="homepage-contact-heading"
    >
      <div className="sigma-contact-hub__inner">
        <div className="sigma-contact-hub__stage">
          <div className="sigma-contact-hub__frame">
            <span className="sigma-contact-hub__border-beam" aria-hidden />
            <span className="sigma-contact-hub__border-beam-b" aria-hidden />
            <div className="sigma-contact-hub__panel">
              <div className="sigma-contact-hub__copy">
                <p
                  className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:mb-4 sm:text-[11px] ${localeEyebrow(language)}`}
                >
                  {copy.kicker}
                </p>
                <h2
                  id="homepage-contact-heading"
                  className={`mx-auto max-w-[18ch] font-display text-[clamp(1.35rem,5.6vw,1.9rem)] font-semibold uppercase leading-[1.12] tracking-normal text-white text-balance sm:text-[2.35rem] md:max-w-none md:text-5xl md:tracking-tight lg:text-[3.15rem] ${localeHeading(language)}`}
                >
                  {copy.headline}
                </h2>
                <p
                  className={`mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#cfd6de] sm:mt-5 sm:text-[15px] md:mt-6 md:text-base md:text-[#b6bcc4] ${localeBody(language)}`}
                >
                  {copy.intro}
                </p>
              </div>

              <div className="sigma-contact-hub__cta-wrap">
                <Link
                  href={ROUTES.contact}
                  className={`sigma-contact-hub__cta ${localeCta(language)}`}
                >
                  <span>{cta.label}</span>
                  <ArrowUpRight
                    className={`size-4 shrink-0 ${isRtl ? "-scale-x-100" : ""}`}
                    aria-hidden
                    strokeWidth={2.25}
                  />
                </Link>
              </div>
            </div>
          </div>

          <ul className="sigma-contact-hub__dock" aria-label={footer.landmarkSocial}>
            {nodes.map((node) => {
              const Icon = node.Icon;
              const shared = {
                className: `sigma-contact-hub__node ${localeCta(language)}`,
                href: node.href,
                "aria-label": node.ariaLabel,
              };

              const inner = (
                <>
                  <Icon className="size-4" />
                  <span className="sigma-contact-hub__node-tip">{node.label}</span>
                </>
              );

              if (useMotionDock) {
                return (
                  <li key={node.id}>
                    <motion.a
                      {...shared}
                      {...(node.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.4 }}
                    >
                      {inner}
                    </motion.a>
                  </li>
                );
              }

              return (
                <li key={node.id}>
                  <a
                    {...shared}
                    {...(node.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
