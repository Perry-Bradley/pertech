"use client";

import { motion } from "framer-motion";
import { GridPattern } from "@/components/animations/grid-pattern";
import { Noise } from "@/components/animations/noise";
import { TextReveal } from "@/components/animations/text-reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background pt-40 pb-24 md:pt-48 md:pb-32">
      <GridPattern />
      <Noise />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.4 }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--foreground)_18%,transparent),transparent_60%)]"
      />
      <div className={`relative mx-auto max-w-7xl px-6 ${align === "center" ? "text-center" : ""}`}>
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="inline-block h-px w-8 bg-muted-foreground/60" />
            {eyebrow}
          </motion.p>
        )}
        <TextReveal
          text={title}
          as="h1"
          className="font-display text-balance text-5xl md:text-8xl leading-[0.95] tracking-[-0.025em]"
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className={`mt-8 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
