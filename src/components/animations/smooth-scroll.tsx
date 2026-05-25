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

    // Skip on touch / reduced-motion devices
    const mq = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    );
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.085,
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
