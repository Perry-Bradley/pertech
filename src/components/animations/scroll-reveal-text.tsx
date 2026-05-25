"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word brightness reveal tied to scroll progress.
 *
 * Each word starts dim (muted-foreground) and brightens to foreground as the
 * user scrolls past it. The brightening is mapped to the section's progress
 * through the viewport, so the user feels like they're "lighting up" the
 * text as they read it.
 *
 * Usage:
 *   <ScrollRevealText
 *     text="Long paragraph or headline that brightens as you scroll."
 *     as="h2"
 *     className="font-display text-5xl ..."
 *   />
 */

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface ScrollRevealTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /** How dim the unread words are, 0–1. Default 0.2 */
  dim?: number;
}

export function ScrollRevealText({
  text,
  as = "p",
  className,
  dim = 0.22,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Word starts brightening once the section's top reaches viewport bottom,
    // finishes when section's bottom reaches viewport top.
    offset: ["start 0.9", "start 0.2"],
  });

  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={cn("relative inline-block", className)}>
      <span ref={ref} className="inline">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} dim={dim}>
              {word}
            </Word>
          );
        })}
      </span>
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      {/* Dim base — always visible */}
      <span className="absolute inset-0 opacity-20">{children}</span>
      {/* Brightened layer fades in as you scroll */}
      <motion.span style={{ opacity }} className="relative">
        {children}
      </motion.span>
    </span>
  );
}
