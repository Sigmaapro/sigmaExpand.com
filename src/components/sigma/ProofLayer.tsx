"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  clientLogos,
  proofByLang,
  type ProofClientLogo,
  type ProofMetric,
  type ProofTestimonial,
} from "@/content/proof";
import { SectionDeepLink } from "@/components/site/SectionDeepLink";
import { getHomeSectionLinks } from "@/content/global/homeSectionLinks";
import { useLanguage } from "@/context/LanguageContext";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]![0]! : parts[0]?.[1] ?? "";
  return `${a}${b}`.toUpperCase();
}

function LogoCell({ logo }: { logo: ProofClientLogo }) {
  const inner = (
    <div className="flex min-h-[3.25rem] min-w-[7.5rem] max-w-[11rem] items-center justify-center px-5 py-3 sm:min-h-[3.5rem] sm:min-w-[8.5rem]">
      {logo.imageSrc ? (
        <Image
          src={logo.imageSrc}
          alt={logo.alt}
          width={140}
          height={40}
          className="h-7 w-auto max-w-full object-contain opacity-[0.78] grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-8"
        />
      ) : (
        <span className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9aa3ad] transition-colors duration-300 group-hover:text-[#e9ecef] sm:text-xs">
          {logo.wordmark}
        </span>
      )}
    </div>
  );

  const shell = (
    <div className="group rounded-md border border-white/[0.07] bg-[#0c0f16]/90 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#1c39bb]/28 hover:bg-[#10141d]/95 hover:shadow-[0_0_36px_rgba(28,57,187,0.08)]">
      {inner}
    </div>
  );

  if (logo.href) {
    const external = /^https?:\/\//i.test(logo.href);
    if (external) {
      return (
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 shrink-0"
          aria-label={logo.alt}
        >
          {shell}
        </a>
      );
    }
    return (
      <Link href={logo.href} className="min-w-0 shrink-0" aria-label={logo.alt}>
        {shell}
      </Link>
    );
  }

  return (
    <div className="min-w-0 shrink-0" role="img" aria-label={logo.alt}>
      {shell}
    </div>
  );
}

function MetricCard({ metric, index }: { metric: ProofMetric; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex min-h-0 w-full min-w-0 max-w-full flex-col rounded-lg border border-white/[0.07] bg-gradient-to-b from-[#10141c]/95 to-[#0a0c12]/95 px-5 py-6 transition-[border-color,box-shadow] duration-300 hover:border-[#1c39bb]/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-6 sm:py-7"
    >
      <p className="font-display text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl md:text-[2rem]">
        {metric.value}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#a8b2bd] sm:text-xs md:text-[#8b939e]">
        {metric.label}
      </p>
      {metric.note ? (
        <p className="mt-2 text-xs leading-relaxed text-[#9aa2ac] sm:text-[13px] md:text-[#6c757d]">
          {metric.note}
        </p>
      ) : null}
    </motion.article>
  );
}

function TestimonialCard({ item, index }: { item: ProofTestimonial; index: number }) {
  const initials = initialsFromName(item.name);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-0 w-full min-w-0 max-w-full flex-col rounded-xl border border-white/[0.07] bg-[#0c0f14]/90 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.28)] sm:p-7"
    >
      <blockquote className="min-w-0 flex-1 border-s-2 border-[#1c39bb]/45 ps-4 text-sm leading-relaxed text-[#e8eaed] sm:ps-5 sm:text-[15px] sm:leading-[1.68]">
        <span className="text-[#8a939e] md:text-[#6c757d]">“</span>
        {item.quote}
        <span className="text-[#8a939e] md:text-[#6c757d]">”</span>
      </blockquote>
      <div className="mt-8 flex min-w-0 flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        {item.avatarSrc ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#111318]">
            <Image
              src={item.avatarSrc}
              alt={`Photo of ${item.name}`}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
        ) : (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1c39bb]/35 bg-[#1c39bb]/12 text-[11px] font-semibold uppercase tracking-wide text-[#bde0fe]"
            aria-hidden
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-white">{item.name}</p>
          <p className="mt-0.5 text-[11px] uppercase leading-snug tracking-[0.12em] text-[#a8b0b8] sm:text-xs md:text-[#868e96]">
            {item.role}
            {item.role && item.company ? " · " : null}
            {item.company}
          </p>
        </div>
        {item.logoSrc ? (
          <div className="relative mt-1 h-7 w-[100px] shrink-0 self-start opacity-80 sm:mt-0 sm:h-8 sm:w-[112px] sm:self-auto sm:ms-auto">
            <Image
              src={item.logoSrc}
              alt={item.company}
              fill
              className="object-contain object-right"
              sizes="112px"
            />
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ProofLayer() {
  const { lang } = useLanguage();
  const proof = proofByLang[lang] ?? proofByLang.EN;
  const H = getHomeSectionLinks(lang);

  return (
    <div className="relative z-10 border-t border-white/[0.04] bg-[#080a0f]/50">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" aria-hidden />

      {/* Trusted by */}
      <section
        id="trusted-by"
        className="relative scroll-mt-28 px-5 py-14 sm:px-6 sm:py-16 md:px-16 md:py-20 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem] text-center">
          <p className="sigma-hero-eyebrow mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px]">
            {proof.trustedBy.sectionLabel}
          </p>
          <h3 className="mx-auto max-w-full px-0 font-display text-[clamp(1.05rem,3.8vw,1.45rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:max-w-2xl sm:text-2xl sm:tracking-tight sm:leading-tight md:text-3xl">
            {proof.trustedBy.headline}
          </h3>
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4 md:gap-5">
            {clientLogos.map((logo) => (
              <LogoCell key={logo.id} logo={logo} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof in numbers — `id="network"` preserves navbar scroll target */}
      <section
        id="network"
        className="relative scroll-mt-28 border-t border-white/[0.05] px-5 py-14 sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem]">
          <p className="sigma-hero-eyebrow mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px]">
            {proof.proofInNumbers.sectionLabel}
          </p>
          <h2 className="max-w-full font-display text-[clamp(1.05rem,3.8vw,1.45rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:max-w-3xl sm:text-2xl sm:tracking-tight sm:leading-tight md:text-3xl">
            {proof.proofInNumbers.headline}
          </h2>
          <div
            id="metrics"
            className="mt-10 grid min-w-0 grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:grid-cols-5"
          >
            {proof.metrics.map((m, i) => (
              <MetricCard key={m.id} metric={m} index={i} />
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <SectionDeepLink href={H.proof.href} label={H.proof.label} openInNewTab />
          </div>
        </div>
      </section>

      {/* Partner feedback */}
      <section
        id="testimonials"
        className="relative scroll-mt-28 border-t border-white/[0.05] px-5 py-16 sm:px-6 sm:py-20 md:px-16 md:py-24 lg:px-24"
      >
        <div className="relative mx-auto min-w-0 max-w-[90rem]">
          <p className="sigma-hero-eyebrow mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1c39bb] sm:text-[11px]">
            {proof.partnerFeedback.sectionLabel}
          </p>
          <h3 className="max-w-full font-display text-[clamp(1.05rem,3.8vw,1.45rem)] font-semibold uppercase leading-snug tracking-normal text-white text-balance sm:max-w-3xl sm:text-2xl sm:tracking-tight sm:leading-tight md:text-3xl">
            {proof.partnerFeedback.headline}
          </h3>
          <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {proof.testimonials.map((item, idx) => (
              <TestimonialCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
