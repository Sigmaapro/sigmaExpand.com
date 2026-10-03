"use client";

import { useEffect, useId, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ROUTES } from "@/content/global/routes";
import { ExhibitLink } from "@/components/token2049/ExhibitLink";
import { scrollExhibition } from "@/components/token2049/PageTone";

const LINKS = [
  { href: "#arrival", id: "arrival", label: "01 Arrival" },
  { href: "#singapore", id: "singapore", label: "02 Singapore" },
  { href: "#products", id: "products", label: "03 Exhibition" },
  { href: "#universe", id: "universe", label: "04 Universe" },
  { href: "#meeting", id: "meeting", label: "05 Meeting" },
] as const;

export function ExhibitNav() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 28;
    setCompact((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const nodes = ["arrival", "singapore", "products", "universe", "meeting"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.1, 0.3] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sg-nav" data-compact={compact ? "true" : "false"}>
      <a className="sg-skip" href="#content">
        Skip to exhibition
      </a>
      <a className="sg-nav__brand" href={ROUTES.home}>
        Sigma
      </a>
      <nav className="sg-nav__links" aria-label="Exhibition">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-current={current === link.id ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollExhibition(link.href);
              window.history.pushState(null, "", link.href);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="sg-nav__end">
        <button
          type="button"
          className="sg-nav__index"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Index"}
        </button>
        <ExhibitLink href={ROUTES.contact} className="sg-cta sg-cta--nav">
          Contact
        </ExhibitLink>
      </div>
      {open ? (
        <div className="sg-nav__panel" id={panelId} role="dialog" aria-label="Exhibition index">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                setOpen(false);
                scrollExhibition(link.href);
                window.history.pushState(null, "", link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a href={ROUTES.contact} onClick={() => setOpen(false)}>
            Contact
          </a>
        </div>
      ) : null}
    </header>
  );
}
