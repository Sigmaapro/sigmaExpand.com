"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Info,
  LayoutGrid,
  Mail,
  MapPin,
  Network,
  Newspaper,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "@/content/global/routes";
import { getCryptoAgency } from "@/content/sections/cryptoAgency";
import type { LangCode, MobileNavSheetStrings } from "@/content/types";
import { useLanguage } from "@/context/LanguageContext";
import { arCta, arEyebrow, arNav } from "@/lib/arabicTypography";

export type GlassNavId =
  | "about"
  | "capabilities"
  | "network"
  | "metrics"
  | "sigmapro"
  | "contact"
  | "connect";

type CoreNavId = Exclude<GlassNavId, "connect" | "metrics">;

const CORE_ORDER: { id: CoreNavId; icon: LucideIcon }[] = [
  { id: "about", icon: Info },
  { id: "capabilities", icon: LayoutGrid },
  { id: "network", icon: Network },
  { id: "sigmapro", icon: Sparkles },
];

type Props = {
  open: boolean;
  onClose: () => void;
  goToSection: (id: GlassNavId) => void;
  glassActive: GlassNavId | null;
  mobileNav: MobileNavSheetStrings;
  isRtl: boolean;
  /** Labels keyed by nav id (from primaryNav + contact) */
  labels: Record<CoreNavId | "contact", string>;
  aboutLabel: string;
  teamLabel: string;
  /** Bottom CTA — typically matches desktop nav CTA copy */
  workWithSigmaLabel: string;
};

const spring = { type: "spring" as const, stiffness: 420, damping: 34 };

function GlassAccordion({
  title,
  icon: Icon,
  children,
  open,
  onToggle,
  lang,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  lang: LangCode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[linear-gradient(155deg,rgba(18,22,32,0.92)_0%,rgba(7,9,14,0.88)_55%,rgba(12,16,24,0.9)_100%)] shadow-[0_12px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(28,57,187,0.06)] backdrop-blur-2xl">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full touch-manipulation items-center justify-between gap-3 px-4 py-4 text-start transition-[background] duration-200 hover:bg-white/[0.03] active:scale-[0.99]"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1c39bb]/25 bg-[#1c39bb]/12 text-[#bde0fe] shadow-[0_0_20px_rgba(28,57,187,0.12)]">
            <Icon className="size-[18px]" strokeWidth={2} aria-hidden />
          </span>
          <span
            className={`font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e9ecef] ${arNav(lang)}`}
          >
            {title}
          </span>
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-[#8b939e] transition-transform duration-300 ease-out ${
            open ? "rotate-180 text-[#bde0fe]" : ""
          }`}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06]"
          >
            <div className="space-y-1 px-3 pb-3 pt-1">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function NavLinkRow({
  href,
  label,
  onNavigate,
  lang,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
  lang: LangCode;
}) {
  const cls =
    `group flex min-h-[3rem] touch-manipulation items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d8dde3] transition-all duration-200 hover:border-[#1c39bb]/35 hover:bg-[#1c39bb]/12 hover:text-white hover:shadow-[0_0_28px_rgba(28,57,187,0.18)] active:scale-[0.98] ${arNav(lang)}`;
  return (
    <Link href={href} className={cls} onClick={onNavigate}>
      <span className="min-w-0">{label}</span>
      <ArrowUpRight
        className="size-4 shrink-0 opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-90 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-[-0.125rem]"
        strokeWidth={2}
        aria-hidden
      />
    </Link>
  );
}

export function SigmaMobileNavPanel({
  open,
  onClose,
  goToSection,
  glassActive,
  mobileNav,
  isRtl,
  labels,
  aboutLabel,
  teamLabel,
  workWithSigmaLabel,
}: Props) {
  const { lang } = useLanguage();
  const crypto = getCryptoAgency(lang);
  const locations = crypto.tabs.map((t) => ({ label: t.label, href: t.href }));

  const serviceLinks = React.useMemo(
    () =>
      [
        { label: mobileNav.linkGrowthEngine, href: `${ROUTES.services}#growth` },
        { label: mobileNav.linkKolMarketing, href: "/insights/kol-strategy-distribution-logic" },
        { label: mobileNav.linkLiquidity, href: `${ROUTES.services}#liquidity` },
      ] as const,
    [mobileNav.linkGrowthEngine, mobileNav.linkKolMarketing, mobileNav.linkLiquidity],
  );

  const insightLinks = React.useMemo(
    () =>
      [
        { label: mobileNav.linkFeatured, href: "/insights/how-web3-growth-scales" },
        {
          label: mobileNav.linkCryptoMarketing101,
          href: "/insights/kol-strategy-distribution-logic",
        },
      ] as const,
    [mobileNav.linkFeatured, mobileNav.linkCryptoMarketing101],
  );

  const [accLocations, setAccLocations] = React.useState(false);
  const [accServices, setAccServices] = React.useState(false);
  const [accInsights, setAccInsights] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setAccLocations(false);
      setAccServices(false);
      setAccInsights(false);
    }
  }, [open]);

  const navCore = CORE_ORDER.map(({ id, icon }) => ({
    id,
    icon,
    label: labels[id],
  }));

  const sheetDir = isRtl ? "rtl" : "ltr";

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[9998] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(28,57,187,0.35)_0%,transparent_55%),linear-gradient(180deg,rgba(3,5,10,0.94)_0%,rgba(6,8,14,0.92)_45%,rgba(2,3,8,0.96)_100%)] backdrop-blur-xl lg:hidden"
            aria-hidden
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={mobileNav.sheetAriaLabel}
            dir={sheetDir}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={spring}
            className="fixed inset-x-0 bottom-0 top-[calc(4.75rem+env(safe-area-inset-top,0px))] z-[9999] flex min-h-0 flex-col lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(28,57,187,0.14)_0%,transparent_58%)] opacity-90" />

            <div className="relative flex min-h-0 flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pb-4 [-webkit-overflow-scrolling:touch]">
                {/* A — Core */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[linear-gradient(155deg,rgba(16,20,30,0.94)_0%,rgba(8,10,16,0.9)_100%)] p-3 shadow-[0_16px_56px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl">
                  <p
                    className={`px-2 pb-2 text-start font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c39bb] ${arEyebrow(lang)}`}
                  >
                    {mobileNav.sectionCore}
                  </p>
                  <div className="grid gap-1.5">
                    {navCore.map(({ id, icon: Icon, label }) => {
                      const active = glassActive === id;
                      const isPro = id === "sigmapro";
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => goToSection(id)}
                          className={`flex min-h-[3.25rem] touch-manipulation items-center justify-between gap-3 rounded-xl px-3 py-3 text-start transition-all duration-200 active:scale-[0.98] ${
                            active
                              ? "border border-[#1c39bb]/45 bg-[#1c39bb]/22 text-white shadow-[0_0_32px_rgba(28,57,187,0.28)]"
                              : isPro
                                ? "border border-[#bde0fe]/12 bg-white/[0.04] text-[#e8eaed] hover:border-[#1c39bb]/35 hover:bg-[#1c39bb]/15 hover:shadow-[0_0_28px_rgba(28,57,187,0.2)]"
                                : "border border-transparent text-[#d1d8e0] hover:border-white/[0.08] hover:bg-white/[0.05] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <Icon
                              className={`size-[18px] shrink-0 ${isPro && !active ? "text-[#bde0fe]" : "opacity-90"}`}
                              strokeWidth={2}
                              aria-hidden
                            />
                            <span
                              className={`min-w-0 font-display text-[12px] font-semibold uppercase tracking-[0.11em] ${arNav(lang)}`}
                            >
                              {label}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="size-4 shrink-0 opacity-35 rtl:-scale-x-100"
                            strokeWidth={2}
                            aria-hidden
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <GlassAccordion
                  title={mobileNav.sectionLocations}
                  icon={MapPin}
                  open={accLocations}
                  onToggle={() => setAccLocations((v) => !v)}
                  lang={lang}
                >
                  {locations.map(({ label, href }) => (
                    <NavLinkRow
                      key={href}
                      href={href}
                      label={label}
                      onNavigate={onClose}
                      lang={lang}
                    />
                  ))}
                </GlassAccordion>

                <GlassAccordion
                  title={mobileNav.sectionServices}
                  icon={TrendingUp}
                  open={accServices}
                  onToggle={() => setAccServices((v) => !v)}
                  lang={lang}
                >
                  {serviceLinks.map(({ label, href }) => (
                    <NavLinkRow
                      key={href}
                      href={href}
                      label={label}
                      onNavigate={onClose}
                      lang={lang}
                    />
                  ))}
                </GlassAccordion>

                <GlassAccordion
                  title={mobileNav.sectionInsights}
                  icon={Newspaper}
                  open={accInsights}
                  onToggle={() => setAccInsights((v) => !v)}
                  lang={lang}
                >
                  {insightLinks.map(({ label, href }) => (
                    <NavLinkRow
                      key={href}
                      href={href}
                      label={label}
                      onNavigate={onClose}
                      lang={lang}
                    />
                  ))}
                </GlassAccordion>

                {/* E — Company */}
                <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[linear-gradient(155deg,rgba(14,18,26,0.94)_0%,rgba(7,9,14,0.9)_100%)] p-3 shadow-[0_12px_44px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                  <p
                    className={`px-2 pb-2 text-start font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c39bb] ${arEyebrow(lang)}`}
                  >
                    {mobileNav.sectionCompany}
                  </p>
                  <div className="grid gap-1.5">
                    <Link
                      href={ROUTES.about}
                      onClick={onClose}
                      className={`group flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d8dde3] transition-all hover:border-[#1c39bb]/30 hover:bg-[#1c39bb]/10 hover:text-white hover:shadow-[0_0_24px_rgba(28,57,187,0.14)] active:scale-[0.98] ${arNav(lang)}`}
                    >
                      <span className="flex items-center gap-3">
                        <Building2 className="size-[18px] text-[#bde0fe]/85" strokeWidth={2} aria-hidden />
                        {aboutLabel}
                      </span>
                      <ArrowUpRight
                        className="size-4 opacity-40 rtl:-scale-x-100 group-hover:opacity-80"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                    <Link
                      href={ROUTES.team}
                      onClick={onClose}
                      className={`group flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d8dde3] transition-all hover:border-[#1c39bb]/30 hover:bg-[#1c39bb]/10 hover:text-white hover:shadow-[0_0_24px_rgba(28,57,187,0.14)] active:scale-[0.98] ${arNav(lang)}`}
                    >
                      <span className="flex items-center gap-3">
                        <Users className="size-[18px] text-[#bde0fe]/85" strokeWidth={2} aria-hidden />
                        {teamLabel}
                      </span>
                      <ArrowUpRight
                        className="size-4 opacity-40 rtl:-scale-x-100 group-hover:opacity-80"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={() => goToSection("contact")}
                      className={`flex min-h-[3.25rem] w-full touch-manipulation items-center justify-between gap-3 rounded-xl border px-3 py-3 text-start font-display text-[12px] font-semibold uppercase tracking-[0.1em] transition-all active:scale-[0.98] ${arNav(lang)} ${
                        glassActive === "contact"
                          ? "border-[#1c39bb]/45 bg-[#1c39bb]/22 text-white shadow-[0_0_28px_rgba(28,57,187,0.22)]"
                          : "border-transparent text-[#d8dde3] hover:border-[#1c39bb]/30 hover:bg-[#1c39bb]/10 hover:text-white hover:shadow-[0_0_24px_rgba(28,57,187,0.14)]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Mail className="size-[18px] text-[#bde0fe]/85" strokeWidth={2} aria-hidden />
                        {labels.contact}
                      </span>
                      <ArrowUpRight className="size-4 opacity-40 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative shrink-0 border-t border-white/[0.07] bg-[linear-gradient(180deg,transparent,rgba(6,8,14,0.95)_35%)] pt-4">
                <button
                  type="button"
                  onClick={() => goToSection("connect")}
                  className={`flex min-h-[3.25rem] w-full touch-manipulation items-center justify-center gap-2 rounded-2xl border border-[#1c39bb]/45 bg-[linear-gradient(180deg,rgba(28,57,187,0.35)_0%,rgba(28,57,187,0.12)_100%)] px-5 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_36px_rgba(28,57,187,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,box-shadow] hover:border-[#3d5cdf]/55 hover:shadow-[0_12px_48px_rgba(28,57,187,0.45)] active:scale-[0.98] ${arCta(lang)}`}
                >
                  {workWithSigmaLabel}
                  <Sparkles className="size-4 text-[#bde0fe]" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
