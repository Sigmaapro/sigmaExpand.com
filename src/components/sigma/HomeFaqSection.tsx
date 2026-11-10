import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HOME_FAQ_ITEMS } from "@/content/homeFaq";

/** English homepage FAQ. Questions stay closed until the visitor opens them. */
export function HomeFaqSection() {
  return (
    <section
      id="faq"
      className="sigma-landing-section-shell relative z-10 scroll-mt-24 overflow-hidden px-5 py-14 sm:px-6 sm:py-16 md:scroll-mt-28 md:px-12 md:py-20 lg:px-20"
      aria-labelledby="home-faq-heading"
    >
      <div className="relative z-10 mx-auto min-w-0 max-w-3xl">
        <h2
          id="home-faq-heading"
          className="mx-auto text-center font-display text-[clamp(1.3rem,5.8vw,1.85rem)] font-semibold leading-snug tracking-normal text-white text-balance sm:text-4xl md:text-5xl md:tracking-tight"
        >
          Crypto Marketing Agency FAQ
        </h2>
        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-[#07090f]/40 p-4 backdrop-blur-sm sm:p-6">
          <FaqAccordion items={HOME_FAQ_ITEMS} questionAs="h3" keepAnswersInDom initialOpenIndex={null} />
        </div>
      </div>
    </section>
  );
}
