"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export function LeadsOverlay({
  title,
  eyebrow,
  full = false,
  layerId,
  onClose,
  children,
}: {
  title: string;
  eyebrow: string;
  full?: boolean;
  layerId?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
  }, [mounted]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div id={layerId} className="leads-sheet">
      <button type="button" className="leads-sheet-backdrop" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn("leads-sheet-panel", full && "leads-sheet-panel-full")}
      >
        <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-[max(1.1rem,env(safe-area-inset-top))] sm:px-6">
          <div className="min-w-0">
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#bde0fe]/75">
              {eyebrow}
            </p>
            <h2 id={titleId} className="mt-2 truncate font-display text-xl tracking-[0.06em] text-white">
              {title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="glass-button glass-button-secondary !min-h-11 shrink-0 !px-3"
          >
            Close
          </button>
        </header>
        <div className="leads-sheet-body px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
