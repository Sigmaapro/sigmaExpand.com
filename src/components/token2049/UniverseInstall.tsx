"use client";

import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canOpenProduct, SHOWCASE_PRODUCTS } from "@/content/token2049/products";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { useShowcase } from "@/components/token2049/showcase-context";

gsap.registerPlugin(ScrollTrigger);

const GARDENS = "/token2049/universe/gardens-bay.jpg";

const POINTS = [
  "Operator-led team",
  "Regional execution",
  "Multi-market partner network",
  "KOL and IB infrastructure",
  "Senior-led delivery",
  "Cross-domain BD / KOL / Community / Analytics capability",
] as const;

const PROOF = ["1,500+ network partners", "85 strategic partners", "40+ markets covered"] as const;

export function UniverseInstall() {
  const reduced = usePrefersReducedMotion();
  const { openProduct } = useShowcase();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SHOWCASE_PRODUCTS.find((product) => product.id === activeId) ?? null;

  useLayoutEffect(() => {
    const section = document.getElementById("universe");
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".sg-universe__node"));
    const phoneLines = Array.from(section.querySelectorAll<SVGLineElement>(".sg-universe__leads--phone line"));
    const deskLines = Array.from(section.querySelectorAll<SVGLineElement>(".sg-universe__leads--desk line"));
    const pins = Array.from(section.querySelectorAll<HTMLElement>(".sg-universe__pin"));
    const marks = cards.map((_, index) =>
      [phoneLines[index], deskLines[index], pins[index]].filter((node): node is SVGLineElement | HTMLElement => Boolean(node)),
    );
    const all = [...cards, ...marks.flat()];
    const show = () => gsap.set(all, { clearProps: "opacity,visibility,transform" });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || reduced) {
      show();
      return;
    }
    gsap.set(all, { opacity: 0 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });
    cards.forEach((card, index) => {
      const at = index * 0.1;
      timeline.to(card, { opacity: 1, duration: 0.7, ease: "power2.out" }, at);
      const pair = marks[index];
      if (pair.length) {
        timeline.to(pair, { opacity: 1, duration: 0.7, ease: "power2.out" }, at + 0.08);
      }
    });
    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      show();
    };
  }, [reduced]);

  return (
    <section className="sg-universe" id="universe" aria-labelledby="universe-title">
      <h2 id="universe-title" className="sg-universe__title">
        <span className="sg-kicker">04 —</span>
        <span className="sg-display">Universe</span>
      </h2>
      <div className="sg-universe__field">
        <p className="sg-universe__why">Why Meet Sigma</p>
        <img className="sg-universe__bay" src={GARDENS} alt="" />
        <div className="sg-universe__stage">
        <svg className="sg-universe__leads sg-universe__leads--phone" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="24" y1="28" x2="24" y2="38" />
          <line x1="22" y1="90" x2="34" y2="54" />
          <line x1="36" y1="104" x2="54" y2="58" />
          <line x1="24" y1="122" x2="72" y2="32" />
          <line x1="61" y1="66" x2="61" y2="68" />
          <line x1="62" y1="150" x2="92" y2="52" />
        </svg>
        <svg className="sg-universe__leads sg-universe__leads--desk" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="27" y1="43.6" x2="27" y2="49" />
          <line x1="29.5" y1="33" x2="38.8" y2="47" />
          <line x1="52.8" y1="40.2" x2="52.8" y2="52" />
          <line x1="77.2" y1="15.5" x2="69.5" y2="24" />
          <line x1="58" y1="65.6" x2="58" y2="68" />
          <line x1="82" y1="30.2" x2="82" y2="42" />
        </svg>
        <span className="sg-universe__pin sg-universe__pin--1" />
        <span className="sg-universe__pin sg-universe__pin--2" />
        <span className="sg-universe__pin sg-universe__pin--3" />
        <span className="sg-universe__pin sg-universe__pin--4" />
        <span className="sg-universe__pin sg-universe__pin--5" />
        <span className="sg-universe__pin sg-universe__pin--6" />
        <ol className="sg-universe__nodes">
          {POINTS.map((point, index) => (
            <li className="sg-universe__node" key={point}>
              <span className="sg-universe__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="sg-universe__point">{point}</span>
            </li>
          ))}
        </ol>
        </div>
        <p className="sg-universe__proof">
          {PROOF.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span className="sg-universe__dot">·</span> : null}
              {item}
            </span>
          ))}
        </p>
        <p className="sg-universe__note">Verified references and case studies available to qualified partners.</p>
      </div>
      {SHOWCASE_PRODUCTS.length > 0 ? (
        <ol className="sg-universe__list">
          {SHOWCASE_PRODUCTS.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                className="sg-universe__pick"
                aria-pressed={product.id === activeId}
                onMouseEnter={() => setActiveId(product.id)}
                onFocus={() => setActiveId(product.id)}
                onClick={() => {
                  if (canOpenProduct(product)) openProduct(product.id);
                }}
              >
                <span>{product.index}</span>
                {product.name ? <span>{product.name}</span> : null}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
      {active?.relation ? (
        <p className="sg-universe__relation" aria-live="polite">
          {active.relation}
        </p>
      ) : null}
    </section>
  );
}
