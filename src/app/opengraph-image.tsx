import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Sigma — Web3 growth infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0c12 0%, #151a22 45%, #0a0c12 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#f8f9fa",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          SIGMA
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#adb5bd",
            marginTop: 28,
            maxWidth: 920,
            lineHeight: 1.35,
          }}
        >
          Strategic growth infrastructure for exchanges, protocols, and Web3 platforms.
        </div>
      </div>
    ),
    { ...size },
  );
}
