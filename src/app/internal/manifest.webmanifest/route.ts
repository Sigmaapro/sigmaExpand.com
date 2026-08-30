import { NextResponse } from "next/server";

/**
 * Dedicated Web App Manifest for the SIGMA Internal Team App.
 * Public site continues to use /manifest.webmanifest.
 */
export function GET() {
  const manifest = {
    name: "SIGMA Team",
    short_name: "SIGMA Team",
    description: "Private SIGMA team operating space.",
    start_url: "/internal/login",
    scope: "/internal/",
    id: "/internal/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#05070e",
    theme_color: "#05070e",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "150x150",
        type: "image/png",
        purpose: "any",
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
