import type { Metadata } from "next";
import type { ReactNode } from "react";
import { termsPageMetaByLang } from "@/content/global/termsPage";
import { SIGMA_SITE_AUTHORS } from "@/content/seo";

const m = termsPageMetaByLang.EN;

export const metadata: Metadata = {
  ...SIGMA_SITE_AUTHORS,
  title: m.title,
  description: m.description,
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
