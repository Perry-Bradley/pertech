"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth-scroll wrapper. Hijacks the browser scroll and animates it
 * with a gentle ease. Disabled on touch devices because mobile scroll
 * is already smooth and JS smoothing creates lag.
 *
 * Compatible with Framer Motion's useScroll — Lenis still updates
 * window.scrollY natively, so motion values driven by scrollYProgress
 * continue to work without any bridging code.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only skip on reduced-motion preference. Touch devices now get smooth
    // scroll too — tuned to feel responsive (lower lerp, higher touch multiplier).
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: isTouch ? 1.4 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      // 1:1 finger-to-scroll ratio — matches native iOS/Android pace
      touchMultiplier: 1,
      // Higher lerp on touch = more easing, less twitchy
      lerp: isTouch ? 0.08 : 0.085,
      // syncTouch lets native touch events through so iOS address-bar
      // auto-hide + pull-to-refresh still work
      syncTouch: isTouch,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks so they animate via Lenis too
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
