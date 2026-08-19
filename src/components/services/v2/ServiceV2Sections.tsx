import type { ServiceV2Content } from "@/content/services/v2/types";
import { ServiceV2Accordion } from "./ServiceV2Accordion";
import {
  ServiceV2Eyebrow,
  ServiceV2Heading,
  ServiceV2LinkCta,
  ServiceV2Section,
  v2Type,
} from "./ServiceV2Primitives";

export function ServiceV2Audience({ content }: { content: ServiceV2Content["audience"] }) {
  return (
    <ServiceV2Section id="who">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="who" title={content.title} className="mt-3" />
      <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
        {content.fit.map((item) => (
          <li key={item} className={`border-l border-[#6d82ff]/55 pl-4 ${v2Type.body}`}>
            {item}
          </li>
        ))}
      </ul>
      <p className={`mt-10 max-w-[40rem] ${v2Type.muted}`}>{content.notFit}</p>
    </ServiceV2Section>
  );
}

export function ServiceV2Method({ content }: { content: ServiceV2Content["method"] }) {
  return (
    <ServiceV2Section id="method" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="method" title={content.name} intro={content.body} className="mt-3" />
      <ol className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {content.jobs.map((job) => (
          <li key={job.id} className="min-w-0">
            <p className={v2Type.meta}>{job.id}</p>
            <p className={`mt-3 ${v2Type.body}`}>{job.body}</p>
          </li>
        ))}
      </ol>
    </ServiceV2Section>
  );
}

export function ServiceV2Definition({ content }: { content: ServiceV2Content["definition"] }) {
  return (
    <ServiceV2Section id="definition">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="definition" title={content.title} intro={content.body} className="mt-3" />
      <div className="mt-2 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-2">
        {content.notes.map((note) => (
          <p key={note} className={v2Type.muted}>
            {note}
          </p>
        ))}
      </div>
    </ServiceV2Section>
  );
}

export function ServiceV2Artefacts({ content }: { content: ServiceV2Content["artefacts"] }) {
  return (
    <ServiceV2Section id="artifacts" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="artifacts" title={content.title} intro={content.lead} className="mt-3" />
      <ol className="grid gap-px bg-white/[0.1] sm:grid-cols-2">
        {content.items.map((item) => (
          <li key={item.id} className="bg-[#05070e]/80 p-6 md:p-8">
            <p className={v2Type.meta}>{item.id}</p>
            <p className={`mt-3 max-w-[28rem] ${v2Type.body}`}>{item.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[36rem]">
          <ServiceV2Eyebrow>{content.convert.kicker}</ServiceV2Eyebrow>
          <h3 className={`mt-3 ${v2Type.h3} text-2xl`}>{content.convert.title}</h3>
          <p className={`mt-3 ${v2Type.body}`}>{content.convert.body}</p>
        </div>
        <div className="flex flex-col gap-4">
          <ServiceV2LinkCta href={content.convert.cta.href} label={content.convert.cta.label} />
          <ul className="space-y-1.5">
            {content.convert.proof.map((item) => (
              <li key={item} className={v2Type.muted}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ServiceV2Section>
  );
}

export function ServiceV2Problem({ content }: { content: ServiceV2Content["problem"] }) {
  return (
    <ServiceV2Section id="problem">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="problem" title={content.title} intro={content.body} className="mt-3" />
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className={v2Type.h3}>{content.familiarTitle}</h3>
          <ul className="mt-5 space-y-4">
            {content.familiar.map((item) => (
              <li key={item} className={v2Type.muted}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:border-l lg:border-white/15 lg:pl-16">
          <h3 className={v2Type.h3}>{content.insteadTitle}</h3>
          <ul className="mt-5 space-y-4">
            {content.instead.map((item) => (
              <li key={item} className={v2Type.body}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <ServiceV2LinkCta href={content.cta.href} label={content.cta.label} />
      </div>
    </ServiceV2Section>
  );
}

export function ServiceV2Habits({ content }: { content: ServiceV2Content["habits"] }) {
  return (
    <ServiceV2Section id="why-others" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="why-others" title={content.title} className="mt-3" />
      <ol className="space-y-12 md:space-y-16">
        {content.items.map((item, index) => (
          <li key={item.title} className="grid gap-4 md:grid-cols-[5rem_minmax(0,36rem)] md:gap-10">
            <p className={v2Type.meta}>{String(index + 1).padStart(2, "0")}</p>
            <div>
              <h3 className={`${v2Type.h3} md:text-2xl`}>{item.title}</h3>
              <p className={`mt-3 ${v2Type.body}`}>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </ServiceV2Section>
  );
}

export function ServiceV2Modules({ content }: { content: ServiceV2Content["modules"] }) {
  return (
    <ServiceV2Section id="what-you-get">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="what-you-get" title={content.title} className="mt-3 max-w-[40rem]" />
      <ol className="space-y-0 divide-y divide-white/15 border-y border-white/15">
        {content.items.map((item) => (
          <li key={item.id} className="grid gap-3 py-8 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-10 md:py-10">
            <p className={v2Type.meta}>{item.id}</p>
            <div className="min-w-0">
              <h3 className={v2Type.h3}>{item.title}</h3>
              <p className={`mt-3 ${v2Type.body}`}>{item.body}</p>
              <p className={`mt-4 ${v2Type.muted}`}>Solves: {item.solves}</p>
            </div>
          </li>
        ))}
      </ol>
    </ServiceV2Section>
  );
}

export function ServiceV2Process({ content }: { content: ServiceV2Content["process"] }) {
  return (
    <ServiceV2Section id="how" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="how" title={content.title} className="mt-3" />
      <ol className="relative space-y-10 before:absolute before:bottom-2 before:left-[0.55rem] before:top-2 before:w-px before:bg-white/20 md:space-y-12">
        {content.steps.map((step, index) => (
          <li key={step.title} className="relative grid grid-cols-[1.2rem_minmax(0,1fr)] gap-5 md:gap-8">
            <span className="relative z-10 mt-1.5 size-2.5 rounded-full border border-[#9ec0ff] bg-[#05070e]" />
            <div>
              <p className={v2Type.meta}>{String(index + 1).padStart(2, "0")}</p>
              <h3 className={`mt-2 ${v2Type.h3}`}>{step.title}</h3>
              <p className={`mt-3 ${v2Type.body}`}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </ServiceV2Section>
  );
}

export function ServiceV2Engagement({ content }: { content: ServiceV2Content["engagement"] }) {
  return (
    <ServiceV2Section id="engagement">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="engagement" title={content.title} intro={content.body} className="mt-3" />
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {content.chips.map((chip) => (
          <li key={chip} className={`${v2Type.meta} text-[#c5d4ee]`}>
            {chip}
          </li>
        ))}
      </ul>
      <p className={`mt-8 max-w-[40rem] ${v2Type.body}`}>{content.entry}</p>
    </ServiceV2Section>
  );
}

export function ServiceV2Decision({ content }: { content: ServiceV2Content["decision"] }) {
  return (
    <ServiceV2Section id="decision" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="decision" title={content.title} className="mt-3" />
      <ol className="grid gap-5 sm:grid-cols-2">
        {content.criteria.map((item, index) => (
          <li key={item} className={`flex gap-4 ${v2Type.body}`}>
            <span className={`${v2Type.meta} mt-0.5 shrink-0`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-8">
        {content.options.map((option, index) => (
          <article key={option.title}>
            <p className={v2Type.meta}>{String(index + 1).padStart(2, "0")}</p>
            <h3 className={`mt-3 ${v2Type.h3}`}>{option.title}</h3>
            <p className={`mt-3 ${v2Type.body}`}>{option.body}</p>
          </article>
        ))}
      </div>
    </ServiceV2Section>
  );
}

export function ServiceV2Objections({ content }: { content: ServiceV2Content["objections"] }) {
  return (
    <ServiceV2Section id="objections">
      <ServiceV2Eyebrow className="text-center">{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="objections" title={content.title} align="center" className="mx-auto mt-3" />
      <ServiceV2Accordion items={content.items} />
    </ServiceV2Section>
  );
}

export function ServiceV2Faq({ content }: { content: ServiceV2Content["faq"] }) {
  return (
    <ServiceV2Section id="faq" tone="veil">
      <ServiceV2Eyebrow className="text-center">{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="faq" title={content.title} align="center" className="mx-auto mt-3" />
      <ServiceV2Accordion items={content.items} />
    </ServiceV2Section>
  );
}

export function ServiceV2Risk({ content }: { content: ServiceV2Content["risk"] }) {
  return (
    <ServiceV2Section id="risk">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="risk" title={content.title} className="mt-3" />
      <div className="mx-auto max-w-[44rem] space-y-8 border-y border-white/18 py-8">
        <div>
          <h3 className={v2Type.h3}>{content.serviceNoticeTitle}</h3>
          <p className={`mt-3 ${v2Type.body}`}>{content.serviceNotice}</p>
        </div>
        <div>
          <h3 className={v2Type.h3}>{content.generalDisclaimerTitle}</h3>
          <p className={`mt-3 ${v2Type.body}`}>{content.generalDisclaimer}</p>
        </div>
      </div>
    </ServiceV2Section>
  );
}

export function ServiceV2Differentiation({ content }: { content: ServiceV2Content["differentiation"] }) {
  return (
    <ServiceV2Section id="closing-argument" tone="veil">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <h2
        id="closing-argument-heading"
        className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,1.4rem+2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white text-balance"
      >
        {content.title}
      </h2>
      <p className={`mt-8 ${v2Type.lead} text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)]`}>{content.body}</p>
    </ServiceV2Section>
  );
}

export function ServiceV2AfterMessage({ content }: { content: ServiceV2Content["afterMessage"] }) {
  return (
    <ServiceV2Section id="after-message">
      <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
      <ServiceV2Heading id="after-message" title={content.title} intro={content.lead} className="mt-3" />
      <ol className="grid gap-8 sm:grid-cols-3">
        {content.steps.map((step, index) => (
          <li key={step}>
            <p className={v2Type.meta}>Step {index + 1}</p>
            <p className={`mt-3 ${v2Type.body}`}>{step}</p>
          </li>
        ))}
      </ol>
    </ServiceV2Section>
  );
}

export function ServiceV2FinalCta({ content }: { content: ServiceV2Content["finalCta"] }) {
  return (
    <ServiceV2Section id="final-cta" tone="veil">
      <div className="mx-auto max-w-[40rem] text-center">
        <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
        <ServiceV2Heading
          id="final-cta"
          title={content.title}
          intro={content.body}
          align="center"
          className="mx-auto mt-3"
        />
        <p className={`mb-6 ${v2Type.meta} text-[#c5d4ee]`}>Pick the closest problem</p>
        <ul className="mb-10 flex flex-wrap justify-center gap-2">
          {content.intents.map((intent) => (
            <li
              key={intent}
              className="rounded-full border border-white/22 px-3 py-1.5 text-[13px] text-[rgba(225,232,242,0.88)]"
            >
              {intent}
            </li>
          ))}
        </ul>
        <ServiceV2LinkCta href={content.primaryCta.href} label={content.primaryCta.label} />
        <p className={`mt-6 ${v2Type.muted}`}>{content.reassure}</p>
      </div>
    </ServiceV2Section>
  );
}
