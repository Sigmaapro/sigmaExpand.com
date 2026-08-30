import type { NextConfig } from "next";

/**
 * Observation-only CSP (does not block). Origins from the CSP pre-implementation audit.
 * Do not switch to Content-Security-Policy until Report-Only is clean in production.
 * `*.supabase.co` is required so the internal app can reach Supabase Auth; public
 * marketing pages do not use those connections.
 */
const CONTENT_SECURITY_POLICY_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://blog.sigmaa.pro https://images.unsplash.com",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com https://*.supabase.co wss://*.supabase.co",
  "frame-src https://challenges.cloudflare.com https://calendly.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

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
          {
            key: "Content-Security-Policy-Report-Only",
            value: CONTENT_SECURITY_POLICY_REPORT_ONLY,
          },
        ],
      },
      {
        source: "/internal",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/internal/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
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
