"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let exhibitionScroll: ((target: string | HTMLElement) => void) | null = null;

/** Scroll within the exhibition. Lenis owns the scroll position while it is mounted. */
export function scrollExhibition(target: string | HTMLElement) {
  if (exhibitionScroll) {
    exhibitionScroll(target);
    return;
  }
  const node = typeof target === "string" ? document.querySelector(target) : target;
  if (!(node instanceof HTMLElement)) return;
  const scroller = document.scrollingElement;
  if (!(scroller instanceof HTMLElement)) return;
  scroller.style.scrollBehavior = "auto";
  scroller.scrollTop = node.getBoundingClientRect().top + scroller.scrollTop - 72;
}

/** Daylight page tone, and smooth scroll only for this exhibition. */
export function PageTone() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.backgroundColor;
    const previousBody = body.style.backgroundColor;
    html.style.backgroundColor = "#F5F4EF";
    body.style.backgroundColor = "#F5F4EF";
    return () => {
      html.style.backgroundColor = previousHtml;
      body.style.backgroundColor = previousBody;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: { offset: -72, force: true },
    });
    exhibitionScroll = (target) => {
      lenis.scrollTo(target, { offset: -72, force: true });
    };
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      exhibitionScroll = null;
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return null;
}
