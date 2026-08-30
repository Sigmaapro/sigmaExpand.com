import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Public website Web App Manifest.
 * Served at /manifest.webmanifest (replaces the former app/manifest.ts file convention
 * so /internal can point at a separate install identity without Next injecting the public link).
 */
export function GET() {
  const base = getSiteUrl();
  const manifest = {
    name: "Sigma — Web3 Growth Infrastructure",
    short_name: "Sigma",
    description:
      "Strategic growth infrastructure for exchanges, protocols, and Web3 platforms.",
    start_url: base,
    display: "standalone" as const,
    background_color: "#0a0c12",
    theme_color: "#0a0c12",
    icons: [
      {
        src: "/icon.png",
        type: "image/png",
        sizes: "150x150",
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
