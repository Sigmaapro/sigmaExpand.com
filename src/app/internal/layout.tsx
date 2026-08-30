import type { Metadata, Viewport } from "next";
import "./internal.css";

export const metadata: Metadata = {
  title: { absolute: "SIGMA Team" },
  description: "Private SIGMA team space.",
  applicationName: "SIGMA Team",
  manifest: "/internal/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "SIGMA Team",
    statusBarStyle: "black-translucent",
  },
  // Explicit Apple tag — Next also emits mobile-web-app-capable.
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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

export const viewport: Viewport = {
  themeColor: "#05070e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-app">
      <div className="internal-ambient" aria-hidden="true" />
      {children}
    </div>
  );
}
