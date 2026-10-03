"use client";

import Link from "next/link";
import { Archivo } from "next/font/google";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import "./homepage-promo.css";

const poster = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-poster",
  display: "swap",
});

const PROMO_FILM = "/videos/T2049_SG25_Aftermovie_Part01.mp4";

export function HomepagePromo() {
  const reduced = usePrefersReducedMotion();

  return (
    <Link
      href="/token2049"
      className={`t2049-promo ${poster.variable}`}
      aria-label="TOKEN2049 Singapore, 07—08 October 2026, Marina Bay Sands. Explore the exhibition."
      onKeyDown={(event) => {
        if (event.key !== " ") return;
        event.preventDefault();
        event.currentTarget.click();
      }}
    >
      <span className="t2049-promo__kicker">TOKEN2049</span>
      <span className="t2049-promo__place">SINGAPORE</span>
      <span className="t2049-promo__date">07—08 OCT 2026</span>
      <span className="t2049-promo__venue">MARINA BAY SANDS</span>
      <span className="t2049-promo__frame">
        {reduced ? null : (
          <video
            className="t2049-promo__film"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={PROMO_FILM} type="video/mp4" />
          </video>
        )}
        <span className="t2049-promo__year" aria-hidden="true">
          2049
        </span>
      </span>
      <span className="t2049-promo__fig">FIG. 01 — SINGAPORE</span>
      <span className="t2049-promo__cue">
        Explore
        <span className="t2049-promo__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}
