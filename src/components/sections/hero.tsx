"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { GridPattern } from "@/components/animations/grid-pattern";
import { Magnetic } from "@/components/animations/magnetic";
import { Noise } from "@/components/animations/noise";
import { Badge } from "@/components/ui/badge";

type HeroProps = {
  badge?: string;
  meta?: string;
  words?: { text: string; italic?: boolean }[];
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
};

const defaultWords = [
  { text: "Design.", italic: false },
  { text: "Engineer.", italic: true },
  { text: "Ship.", italic: false },
];

export function Hero({
  badge = "Available · Q3 2026",
  meta = "Solo studio · Remote",
  words = defaultWords,
  description = "Pertech is a design and engineering studio for brands that refuse to look generic. We build websites, products, mobile apps, and growth systems the way they should have been built the first time.",
  primaryCTA = { label: "Start a project", href: "/contact" },
  secondaryCTA = { label: "See our work", href: "/portfolio" },
}: HeroProps) {
  const wordList = words.length > 0 ? words : defaultWords;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-background flex items-center justify-center"
    >
      {/* Background layers */}
      <GridPattern />
      <Noise />

      {/* Orbital glow */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="absolute -top-40 left-1/2 -z-0 h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--foreground)_22%,transparent),transparent_60%)] animate-glow" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:pt-32 md:pb-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6 md:mb-8"
        >
          {badge && <Badge variant="dot">{badge}</Badge>}
          {meta && (
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              {meta}
            </span>
          )}
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={{ y: titleY }}
          className="text-center font-display font-normal leading-[0.9] tracking-[-0.03em] text-[clamp(2.75rem,8.5vw,7.5rem)]"
        >
          {wordList.map((w, i) => (
            <span key={`${w.text}-${i}`} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w.italic ? (
                  <span className="italic text-muted-foreground">{w.text}</span>
                ) : (
                  <span className="gradient-text">{w.text}</span>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Sub */}
        <motion.p
          style={{ y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-7 md:mt-8 max-w-2xl text-center text-balance text-base md:text-lg text-muted-foreground"
        >
          {description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.45}>
            <Link
              href={primaryCTA.href}
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-foreground pl-7 pr-2 text-base font-medium text-background"
            >
              {primaryCTA.label}
              <span className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.35}>
            <Link
              href={secondaryCTA.href}
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-border bg-background/40 backdrop-blur px-7 text-base font-medium hover:bg-accent transition-colors"
            >
              {secondaryCTA.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
        </motion.div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
        >
          <Link
            href="#services"
            className="group inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span>Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
