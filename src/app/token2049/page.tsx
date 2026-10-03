import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { ShowcaseState } from "@/components/token2049/showcase-context";
import { PageTone } from "@/components/token2049/PageTone";
import { ExhibitNav } from "@/components/token2049/ExhibitNav";
import { Arrival } from "@/components/token2049/Arrival";
import { SingaporeSequence } from "@/components/token2049/SingaporeSequence";
import { ProductGallery } from "@/components/token2049/ProductGallery";
import { UniverseInstall } from "@/components/token2049/UniverseInstall";
import { MeetingPoint } from "@/components/token2049/MeetingPoint";

export const metadata: Metadata = buildPageMetadata("token2049");

export default function Token2049Page() {
  return (
    <ShowcaseState>
      <PageTone />
      <ExhibitNav />
      <main id="content">
        <Arrival />
        <SingaporeSequence />
        <ProductGallery />
        <UniverseInstall />
        <MeetingPoint />
      </main>
    </ShowcaseState>
  );
}
