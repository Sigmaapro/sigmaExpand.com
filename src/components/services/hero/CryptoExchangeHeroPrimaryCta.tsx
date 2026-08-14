"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./CryptoExchangeHeroPrimaryCta.css";

type CryptoExchangeHeroPrimaryCtaProps = {
  label: string;
  href: string;
};

/**
 * Primary Hero CTA — one unified CSS liquid-glass link.
 *
 * `liquid-glass-react` was removed from this CTA: the package always applies
 * translate(-50%, -50%) and renders multiple absolute overlay siblings, so the
 * visible glass, filter backdrop, and clickable area cannot stay one shape in flow.
 */
export function CryptoExchangeHeroPrimaryCta({ label, href }: CryptoExchangeHeroPrimaryCtaProps) {
  return (
    <div className="crypto-exchange-hero-primary-cta">
      <Link href={href} className="crypto-exchange-hero-primary-cta__link sigma-framer-liquid-button">
        <span className="crypto-exchange-hero-primary-cta__label">{label}</span>
        <ArrowUpRight
          size={16}
          className="crypto-exchange-hero-primary-cta__arrow"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
