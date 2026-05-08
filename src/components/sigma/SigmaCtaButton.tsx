"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { localeCta } from "@/lib/localeTypography";
import { useIsMobile } from "@/hooks/useMedia";

export const magneticButtonClass = (primary?: boolean, fullWidthMobile?: boolean) =>
  `group relative inline-flex max-w-full min-w-0 overflow-hidden rounded-[2px] px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-[0.2em] transition-[box-shadow,transform,border-color] duration-300 ease-out will-change-transform touch-manipulation hover:scale-[1.02] sm:px-8 sm:py-4 sm:text-sm active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bde0fe]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c12] ${
    fullWidthMobile
      ? "min-h-12 w-full justify-center sm:min-h-14 sm:w-auto sm:justify-start "
      : "min-h-12 min-w-[10rem] justify-center sm:min-h-[3.25rem] sm:min-w-[11rem] "
  }${
    primary
      ? "border border-[#2a4ecf]/80 bg-[#1c39bb] text-white shadow-[0_0_0_1px_rgba(189,224,254,0.08),0_12px_40px_rgba(28,57,187,0.35)] hover:border-[#bde0fe]/40 hover:bg-[#152a8a]"
      : "border border-white/15 bg-white/[0.03] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#bde0fe]/35 hover:bg-white/[0.06]"
  }`;

export const MagneticButton = ({
  children,
  primary,
  isRtl,
  onClick,
  href,
  target,
  rel,
  fullWidthMobile,
}: {
  children: React.ReactNode;
  primary?: boolean;
  isRtl?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  fullWidthMobile?: boolean;
}) => {
  const { lang } = useLanguage();
  const isNarrow = useIsMobile(1024);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const smoothX = useSpring(motionX, { stiffness: 180, damping: 18, mass: 0.12 });
  const smoothY = useSpring(motionY, { stiffness: 180, damping: 18, mass: 0.12 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const el = href ? anchorRef.current : buttonRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.22;
    const y = (clientY - (top + height / 2)) * 0.22;
    motionX.set(x);
    motionY.set(y);
  };

  const handleMouseLeave = () => {
    motionX.set(0);
    motionY.set(0);
  };

  const motionShared = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: isNarrow ? 0 : smoothX, y: isNarrow ? 0 : smoothY },
    className: `${magneticButtonClass(primary, fullWidthMobile)} ${localeCta(lang)}`,
  };

  const inner = (
    <>
      <span
        className={`relative z-10 inline-flex max-w-full min-w-0 items-center justify-center gap-2 break-words text-center leading-snug ${isRtl ? "flex-row-reverse" : ""}`}
      >
        {children}
        <ArrowUpRight
          size={16}
          className={`shrink-0 transition-transform group-hover:-translate-y-0.5 ${isRtl ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
        />
      </span>
      {primary ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40" />
          <div className="absolute inset-0 z-0 bg-[#bde0fe] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-[0.12]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c39bb]/15 to-transparent" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        target={target}
        rel={rel}
        {...motionShared}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      {...motionShared}
    >
      {inner}
    </motion.button>
  );
};
