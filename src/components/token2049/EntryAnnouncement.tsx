"use client";

import { useEffect, useRef, useState } from "react";
import { EXHIBITION_ANNOUNCEMENT } from "@/content/token2049/event";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { scrollExhibition } from "@/components/token2049/PageTone";

const APPEAR_DELAY_MS = 560;
const HOLD_MS = 4200;
const EXIT_MS = 720;

function hasAnnouncementCopy() {
  const plate = EXHIBITION_ANNOUNCEMENT;
  return Boolean(plate.eyebrow || plate.title || plate.description || plate.action?.label);
}

export function EntryAnnouncement() {
  const reduced = usePrefersReducedMotion();
  const plate = EXHIBITION_ANNOUNCEMENT;
  const rootRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"wait" | "in" | "out" | "closed">("wait");

  useEffect(() => {
    if (!hasAnnouncementCopy()) return;
    const timer = window.setTimeout(() => setPhase("in"), APPEAR_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== "in") return;
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus({ preventScroll: true });
    const hold = window.setTimeout(() => setPhase("out"), HOLD_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("out");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(hold);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "out") return;
    const timer = window.setTimeout(() => {
      if (rootRef.current?.contains(document.activeElement) && restoreRef.current?.isConnected) {
        restoreRef.current.focus({ preventScroll: true });
      }
      setPhase("closed");
    }, reduced ? 160 : EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  if (!hasAnnouncementCopy() || phase === "wait" || phase === "closed") return null;

  const action = plate.action?.label ? plate.action : undefined;
  const titleId = plate.title ? "sg-entry-title" : undefined;
  const descriptionId = plate.description ? "sg-entry-desc" : undefined;

  return (
    <aside
      ref={rootRef}
      className="sg-entry"
      data-state={phase}
      data-motion={reduced ? "reduce" : "full"}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-label={titleId ? undefined : "Announcement"}
      aria-describedby={descriptionId}
    >
      <div className="sg-entry__head">
        {plate.eyebrow ? <p className="sg-kicker">{plate.eyebrow}</p> : <span />}
        <button
          ref={closeRef}
          type="button"
          className="sg-entry__close"
          aria-label="Close"
          onClick={() => setPhase("out")}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      {plate.title ? (
        <p id={titleId} className="sg-entry__title">
          {plate.title}
        </p>
      ) : null}
      {plate.description ? (
        <p id={descriptionId} className="sg-entry__body">
          {plate.description}
        </p>
      ) : null}
      {action?.href ? (
        <a
          className="sg-textlink"
          href={action.href}
          onClick={(event) => {
            if (!action.href?.startsWith("#")) return;
            event.preventDefault();
            scrollExhibition(action.href);
            setPhase("out");
          }}
        >
          {action.label}
        </a>
      ) : action ? (
        <button type="button" className="sg-textlink" onClick={() => setPhase("out")}>
          {action.label}
        </button>
      ) : null}
      <i className="sg-entry__water" aria-hidden="true" />
    </aside>
  );
}
