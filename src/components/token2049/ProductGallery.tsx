"use client";

import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { PriorityServicesFlowingMenu } from "@/components/token2049/PriorityServicesFlowingMenu";

const EXHIBITION_FILM = "/videos/T2049_SG25_Aftermovie_Part02.mp4";
const EXHIBITION_STILL = "/token2049/exhibition-still.jpg";

const METRICS = [
  { value: "$7B+", label: "Supported notional monthly volume" },
  { value: "2.4M+", label: "Users activated" },
  { value: "1,500+", label: "Network partners" },
  { value: "190+", label: "Network surfaces" },
  { value: "85", label: "Strategic partners" },
  { value: "40+", label: "Markets covered" },
] as const;

const SERVICES = [
  { index: "01", text: "Web3 Business Development & Strategic Partnerships", image: "/token2049/services/partnerships.jpg" },
  { index: "02", text: "KOL & Influencer Marketing", image: "/token2049/services/speaker.jpg" },
  { index: "03", text: "Crypto Exchange Growth & Market Development", image: "/token2049/services/session.jpg" },
  { index: "04", text: "Affiliate, IB & Partner Program Management", image: "/token2049/services/collaboration.jpg" },
  { index: "05", text: "Web3 Growth Strategy & Market Expansion", image: "/token2049/services/skyline.jpg" },
  { index: "06", text: "PR & Media Relations", image: "/token2049/services/floor.jpg" },
] as const;

export function ProductGallery() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="sg-gallery" id="products" aria-labelledby="products-title">
      <h2 id="products-title" className="sg-hall__word">
        Exhibition
      </h2>
      <figure className="sg-hall__film">
        <div className="sg-hall__stage">
          {reduced ? (
            <img src={EXHIBITION_STILL} alt="TOKEN2049 Singapore, the hall during the official aftermovie." />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={EXHIBITION_STILL}
              aria-label="TOKEN2049 Singapore official aftermovie"
            >
              <source src={EXHIBITION_FILM} type="video/mp4" />
            </video>
          )}
        </div>
        <figcaption>FIG. 03 — TOKEN2049 Singapore</figcaption>
      </figure>
      <dl className="sg-hall__metrics">
        {METRICS.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.value}</dt>
            <dd>{metric.label}</dd>
          </div>
        ))}
      </dl>
      <PriorityServicesFlowingMenu items={SERVICES} reduced={reduced} />
    </section>
  );
}
