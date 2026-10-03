"use client";

import type { ReactNode } from "react";
import { useShowcase } from "@/components/token2049/showcase-context";

export function ExploreButton({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const { openProduct } = useShowcase();

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => openProduct(id)}
    >
      {children}
    </button>
  );
}
