import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();
  return {
    name: "Sigma — Web3 Growth Infrastructure",
    short_name: "Sigma",
    description:
      "Strategic growth infrastructure for exchanges, protocols, and Web3 platforms.",
    start_url: base,
    display: "standalone",
    background_color: "#0a0c12",
    theme_color: "#0a0c12",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
