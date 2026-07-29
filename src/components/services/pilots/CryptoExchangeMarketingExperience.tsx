"use client";

import { CemMotionProvider } from "@/components/services/pilots/CemMotionProvider";
import { CemSceneActivation } from "@/components/services/pilots/CemSceneActivation";
import { CemSceneBoot } from "@/components/services/pilots/CemSceneBoot";
import { CemSceneLoop } from "@/components/services/pilots/CemSceneLoop";
import { CemSceneModules } from "@/components/services/pilots/CemSceneModules";
import { CemSceneProblems } from "@/components/services/pilots/CemSceneProblems";
import { CemSceneStages } from "@/components/services/pilots/CemSceneStages";
import { CemSceneTransparency } from "@/components/services/pilots/CemSceneTransparency";
import {
  CemInterludeAudience,
  CemInterludeBrokersEngage,
  CemInterludeChannels,
  CemInterludeCompare,
  CemInterludeDefinitionRest,
  CemInterludeFaq,
  CemInterludeFunnel,
  CemInterludeSignals,
} from "@/components/services/pilots/CemInterludes";

/**
 * Cinematic scroll experience — Crypto Exchange Marketing.
 * Content exclusively from Sigma_Crypto_Exchange_Marketing.docx.
 * Visual storytelling only; no invented copy.
 */
export function CryptoExchangeMarketingExperience() {
  return (
    <CemMotionProvider>
      <div className="cem-root cem-aurora-theme cem-cinema">
        <CemSceneBoot />
        <CemInterludeDefinitionRest />
        <CemInterludeAudience />

        <CemSceneProblems />

        <CemSceneLoop />

        <CemSceneModules />
        <CemInterludeSignals />
        <CemInterludeChannels />
        <CemInterludeFunnel />

        <CemSceneStages />
        <CemInterludeCompare />
        <CemInterludeBrokersEngage />

        <CemSceneTransparency />
        <CemInterludeFaq />

        <CemSceneActivation />
      </div>
    </CemMotionProvider>
  );
}
