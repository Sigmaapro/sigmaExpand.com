"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { plateForIndex, SHOWCASE_PRODUCTS, type ShowcaseProduct } from "@/content/token2049/products";

export function ProductReveal({
  product,
  onClose,
}: {
  product: ShowcaseProduct | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const plate = product ? plateForIndex(SHOWCASE_PRODUCTS.findIndex((item) => item.id === product.id)) : "ocean";

  useEffect(() => {
    if (!product) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [product, onClose]);

  const features = product?.features?.filter((feature) => feature.trim()) ?? [];

  return (
    <AnimatePresence>
      {product?.name ? (
        <motion.div
          className="sg-reveal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sg-reveal-title"
          ref={panelRef}
          data-plate={plate}
          initial={false}
        >
          <div className="sg-reveal__bar">
            <p className="sg-kicker">
              {product.index}
              {product.category ? ` — ${product.category}` : ""}
            </p>
            <button ref={closeRef} type="button" className="sg-cta" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="sg-reveal__body">
            <figure className="sg-frame sg-reveal__frame">
              <div className="sg-plinth">
                <div className="sg-plinth__stage">
                  {product.media?.kind === "image" ? (
                    <Image src={product.media.src} alt={product.media.alt} fill sizes="(min-width: 1100px) 40vw, 100vw" />
                  ) : null}
                </div>
                <div className="sg-plinth__shaft" aria-hidden="true" />
                <div className="sg-plinth__foot" aria-hidden="true" />
              </div>
              <figcaption>{product.index}</figcaption>
            </figure>
            <div>
              <h2 id="sg-reveal-title" className="sg-reveal__title">
                {product.name}
              </h2>
              {product.details ? <p className="sg-lede">{product.details}</p> : null}
              {features.length > 0 ? (
                <ol className="sg-features">
                  {features.map((feature, index) => (
                    <li key={feature}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {feature}
                    </li>
                  ))}
                </ol>
              ) : null}
              {product.href ? (
                <div className="sg-reveal__actions">
                  <a className="sg-textlink" href={product.href}>
                    Open
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
