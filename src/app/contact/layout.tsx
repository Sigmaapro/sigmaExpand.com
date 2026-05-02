import type { Metadata } from "next";
import type { ReactNode } from "react";
import { contactSubpageMeta } from "@/content/pages/contact-subpage";

export const metadata: Metadata = {
  title: contactSubpageMeta.title,
  description: contactSubpageMeta.description,
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
