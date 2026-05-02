import type { Metadata } from "next";
import SigmaLanding from "@/components/sigma/SigmaLanding";
import { buildPageMetadata } from "@/content/seo";

/**
 * Static import avoids flaky Webpack dev runtime: `__webpack_modules__[moduleId] is not a function`
 * when the async chunk for `dynamic()` fails to initialize after HMR/edits.
 */

export const metadata: Metadata = buildPageMetadata("home");

export default function Home() {
  return <SigmaLanding />;
}
