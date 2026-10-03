"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { canOpenProduct, getShowcaseProduct, type ShowcaseProduct } from "@/content/token2049/products";
import { ProductReveal } from "@/components/token2049/ProductReveal";

type ShowcaseContextValue = {
  openProduct: (id: string) => void;
};

type WebGLKey = "arrival" | "universe";

type WebGLValue = {
  owner: WebGLKey | null;
  setRatio: (key: WebGLKey, value: number) => void;
};

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);
const WebGLContext = createContext<WebGLValue | null>(null);

export function useShowcase(): ShowcaseContextValue {
  const value = useContext(ShowcaseContext);
  if (!value) {
    throw new Error("useShowcase must be used inside ShowcaseState");
  }
  return value;
}

export function useWebGLSlot(): WebGLValue {
  const value = useContext(WebGLContext);
  if (!value) {
    throw new Error("useWebGLSlot must be used inside ShowcaseState");
  }
  return value;
}

export function ShowcaseState({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ratios, setRatios] = useState({ arrival: 0, universe: 0 });
  const found = activeId ? getShowcaseProduct(activeId) : undefined;
  const product: ShowcaseProduct | null = found && canOpenProduct(found) ? found : null;
  const value = useMemo(() => ({ openProduct: setActiveId }), []);
  const setRatio = useCallback((key: WebGLKey, next: number) => {
    setRatios((prev) => (Math.abs(prev[key] - next) < 0.05 ? prev : { ...prev, [key]: next }));
  }, []);
  const owner: WebGLKey | null =
    ratios.universe > 0.28 && ratios.universe >= ratios.arrival
      ? "universe"
      : ratios.arrival > 0.22
        ? "arrival"
        : ratios.universe > 0.22
          ? "universe"
          : null;
  const webgl = useMemo(() => ({ owner, setRatio }), [owner, setRatio]);

  return (
    <ShowcaseContext.Provider value={value}>
      <WebGLContext.Provider value={webgl}>
        {children}
        <ProductReveal product={product} onClose={() => setActiveId(null)} />
      </WebGLContext.Provider>
    </ShowcaseContext.Provider>
  );
}
