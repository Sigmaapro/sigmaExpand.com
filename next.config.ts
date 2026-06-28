import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Workaround for flaky Next devtools runtime chunks in local dev.
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/markets/iran",
        destination: "/markets/wana",
        permanent: true,
      },
      {
        source: "/markets/uae",
        destination: "/markets/wana",
        permanent: true,
      },
      {
        source: "/markets/turkey",
        destination: "/markets/europe",
        permanent: true,
      },
      {
        source: "/markets/china",
        destination: "/markets/apac",
        permanent: true,
      },
      {
        source: "/markets/gcc",
        destination: "/markets/wana",
        permanent: true,
      },
      {
        source: "/markets/east-asia",
        destination: "/markets/apac",
        permanent: true,
      },
      {
        source: "/markets/balkans",
        destination: "/markets/europe",
        permanent: true,
      },
      {
        source: "/markets/global",
        destination: "/markets",
        permanent: true,
      },
      {
        source: "/markets/eurasia",
        destination: "/markets/cis",
        permanent: true,
      },
      {
        source: "/markets/persian-speaking",
        destination: "/markets/wana",
        permanent: true,
      },
      {
        source: "/markets/north-america",
        destination: "/markets",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
