"use client";

import { usePrefersReducedMotion } from "@/hooks/useMedia";

const ARRIVAL_FILM = "/videos/T2049_SG25_Aftermovie_Part01.mp4";

export function Arrival() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="sg-arrival" id="arrival" aria-labelledby="arrival-title">
      {reduced ? null : (
        <video
          className="sg-arrival__film"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={ARRIVAL_FILM} type="video/mp4" />
        </video>
      )}
      <p className="sg-arrival__year" aria-hidden="true">
        2049
      </p>
      <h1 id="arrival-title" className="sg-arrival__title">
        <span className="sg-arrival__name">TOKEN2049</span>
        <span className="sg-arrival__spine">SINGAPORE</span>
      </h1>
      <p className="sg-arrival__date">07—08 OCT 2026</p>
      <p className="sg-arrival__venue">MARINA BAY SANDS</p>
      <p className="sg-arrival__meta">
        <span className="sg-arrival__fig">FIG. 01</span>
        {" — "}
        <span>01°17′N 103°51′E</span>
      </p>
    </section>
  );
}
