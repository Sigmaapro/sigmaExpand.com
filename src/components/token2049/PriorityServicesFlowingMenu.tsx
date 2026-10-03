"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type FlowingService = {
  index: string;
  text: string;
  image?: string;
};

type Edge = "top" | "bottom";

const REVEAL = { duration: 0.6, ease: "expo.out" };

function closestEdge(mouseX: number, mouseY: number, width: number, height: number): Edge {
  const top = (mouseX - width / 2) ** 2 + mouseY ** 2;
  const bottom = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
  return top < bottom ? "top" : "bottom";
}

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ServiceRow({
  item,
  speed,
  reduced,
  active,
  onActivate,
  onDeactivate,
}: {
  item: FlowingService;
  speed: number;
  reduced: boolean;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const edgeRef = useRef<Edge>("bottom");
  const mounted = useRef(false);
  const [repetitions, setRepetitions] = useState(4);

  const edgeFromPoint = (clientX: number, clientY: number): Edge => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return "bottom";
    return closestEdge(clientX - rect.left, clientY - rect.top, rect.width, rect.height);
  };

  useEffect(() => {
    if (reduced || !item.image) return;
    const measure = () => {
      const part = marqueeInnerRef.current?.querySelector(".sg-flow__part");
      if (!(part instanceof HTMLElement) || part.offsetWidth === 0) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2;
      setRepetitions((current) => {
        const next = Math.max(4, needed);
        return current === next ? current : next;
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced, item.image]);

  useEffect(() => {
    if (reduced || !item.image) return;
    const setup = () => {
      const inner = marqueeInnerRef.current;
      const part = inner?.querySelector(".sg-flow__part");
      if (!inner || !(part instanceof HTMLElement) || part.offsetWidth === 0) return;
      animationRef.current?.kill();
      animationRef.current = gsap.to(inner, {
        x: -part.offsetWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };
    const timer = window.setTimeout(setup, 50);
    return () => {
      window.clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [reduced, item.image, repetitions, speed]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const inner = marqueeInnerRef.current;
    if (reduced || !marquee || !inner) return;
    if (!mounted.current) {
      mounted.current = true;
      if (!active) return;
    }
    const edge = edgeRef.current;
    if (active) {
      gsap
        .timeline({ defaults: REVEAL })
        .set(marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
        .set(inner, { y: edge === "top" ? "101%" : "-101%" }, 0)
        .to([marquee, inner], { y: "0%" }, 0);
      return;
    }
    gsap
      .timeline({ defaults: REVEAL })
      .to(marquee, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(inner, { y: edge === "top" ? "101%" : "-101%" }, 0);
  }, [active, reduced]);

  return (
    <div className={`sg-flow__item${active ? " is-active" : ""}`} ref={itemRef} role="listitem">
      <button
        type="button"
        className="sg-flow__link"
        aria-expanded={active}
        onMouseEnter={(event) => {
          if (reduced || !finePointer()) return;
          edgeRef.current = edgeFromPoint(event.clientX, event.clientY);
          onActivate();
        }}
        onMouseLeave={(event) => {
          if (reduced || !finePointer()) return;
          edgeRef.current = edgeFromPoint(event.clientX, event.clientY);
          onDeactivate();
        }}
        onFocus={() => {
          if (reduced) return;
          edgeRef.current = "bottom";
          onActivate();
        }}
        onBlur={() => {
          if (reduced) return;
          onDeactivate();
        }}
        onClick={(event) => {
          if (reduced) return;
          if (finePointer() && event.detail !== 0) return;
          edgeRef.current = "bottom";
          if (active) onDeactivate();
          else onActivate();
        }}
      >
        <span className="sg-flow__index">{item.index}</span>
        <span className="sg-flow__title">{item.text}</span>
      </button>
      {!reduced && item.image ? (
        <div className="sg-flow__marquee" ref={marqueeRef}>
          <div className="sg-flow__marquee-wrap">
            <div className="sg-flow__marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
              {Array.from({ length: repetitions }, (_, copy) => (
                <div className="sg-flow__part" key={copy}>
                  <span>{item.text}</span>
                  <div className="sg-flow__img" style={{ backgroundImage: `url(${item.image})` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PriorityServicesFlowingMenu({
  items,
  speed = 12,
  reduced,
}: {
  items: readonly FlowingService[];
  speed?: number;
  reduced: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="sg-flow">
      <div className="sg-flow__menu" role="list">
        {items.map((item) => (
          <ServiceRow
            key={item.index}
            item={item}
            speed={speed}
            reduced={reduced}
            active={!reduced && active === item.index}
            onActivate={() => setActive(item.index)}
            onDeactivate={() => setActive((current) => (current === item.index ? null : current))}
          />
        ))}
      </div>
    </div>
  );
}
