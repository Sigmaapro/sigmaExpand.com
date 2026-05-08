"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { siteSettings } from "@/content/siteSettings";

export function InsightsOuterLink({
  className,
  onNavigate,
  children,
}: {
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const href = siteSettings.insightsUrl;
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={className}
    >
      {children}
    </a>
  );
}
