import type { Metadata } from "next";
import "./internal.css";

export const metadata: Metadata = {
  title: { absolute: "SIGMA" },
  description: "Private SIGMA team space.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-app">
      <div className="internal-ambient" aria-hidden="true" />
      {children}
    </div>
  );
}
