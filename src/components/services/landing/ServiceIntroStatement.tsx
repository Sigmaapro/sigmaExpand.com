"use client";

import { AnimatedContent } from "@/components/react-bits/AnimatedContent";
import GlassSurface from "@/components/react-bits/GlassSurface";
import { TextReveal } from "@/components/magicui/TextReveal";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { SigmaIntroOrbitDiagram } from "@/components/services/landing/SigmaIntroOrbitDiagram";
import { LocalizedServiceText } from "@/components/services/LocalizedServiceText";
import { serviceUiByLang } from "@/content/services/localizedServiceUi";
import { useLanguage } from "@/context/LanguageContext";

type ServiceIntroStatementProps = {
  text: string;
  inHero?: boolean;
};

/** Editorial intro — copy outside; Σ orbit visual inside a simple liquid-glass card. */
export function ServiceIntroStatement({ text, inHero = false }: ServiceIntroStatementProps) {
  const { language } = useLanguage();
  const introductionLabel = serviceUiByLang[language].introduction;
  const content = (
    <div className="mx-auto max-w-[68.75rem]">
      <TextReveal
        className={`${
          inHero ? "text-left" : "text-center"
        } font-display text-[clamp(0.95rem,0.86rem+0.34vw,1.22rem)] font-medium leading-[1.62] tracking-[-0.008em] text-white text-pretty`}
      >
        {text}
      </TextReveal>
    </div>
  );

  if (inHero) {
    return (
      <section
        id="introduction"
        className="relative w-full border-0 py-2 md:py-4"
        aria-labelledby="service-introduction-label"
      >
        <LocalizedServiceText id="service-introduction-label" kind="introduction" className="sr-only" as="h2" />
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
          <div className="relative grid w-full items-center gap-8 overflow-hidden px-1 py-6 sm:px-2 md:grid-cols-2 md:gap-10 md:py-8 lg:gap-14">
            <AnimatedContent direction="horizontal" distance={42} duration={0.85} delay={0.08} className="relative z-10">
              {content}
            </AnimatedContent>

            <AnimatedContent
              direction="horizontal"
              reverse
              distance={54}
              duration={0.95}
              delay={0.16}
              className="relative z-10"
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={28}
                borderWidth={0.07}
                brightness={18}
                opacity={0.9}
                blur={12}
                displace={0.4}
                backgroundOpacity={0.38}
                saturation={1.15}
                distortionScale={-90}
                redOffset={0}
                greenOffset={6}
                blueOffset={14}
                xChannel="R"
                yChannel="G"
                mixBlendMode="difference"
                className="sigma-fluid-glass w-full"
                contentClassName="p-0"
              >
                <div className="flex w-full items-center justify-center px-4 py-5 sm:px-8 sm:py-9 md:px-10 md:py-10">
                  <SigmaIntroOrbitDiagram className="max-w-[min(100%,20rem)] sm:max-w-[28rem] md:max-w-[34rem]" />
                </div>
              </GlassSurface>
            </AnimatedContent>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ServiceSectionShell
      id="introduction"
      atmosphere="none"
      className="!border-t-0 -mt-12 md:-mt-20"
      ariaLabel={introductionLabel}
    >
      {content}
    </ServiceSectionShell>
  );
}
