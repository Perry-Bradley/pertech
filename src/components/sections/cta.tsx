"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { GridPattern } from "@/components/animations/grid-pattern";
import { Noise } from "@/components/animations/noise";

type CTAProps = {
  badge?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  description?: string;
  primary?: { label: string; href: string };
  contactEmail?: string;
};

export function CTA({
  badge = "Now booking · Q3 2026",
  titleLineOne = "Let's build",
  titleLineTwo = "something rare.",
  description = "We take on a handful of new partnerships each quarter. If you're building something ambitious, we'd love to hear about it.",
  primary = { label: "Start a conversation", href: "/contact" },
  contactEmail = "hello@pertech.studio",
}: CTAProps) {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-border bg-card grain">
          <GridPattern size={48} />
          <Noise />

          <motion.div
            aria-hidden
            className="absolute -inset-1/4 -z-0 rounded-full opacity-40 blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--foreground)_18%,transparent),transparent_60%)]" />
          </motion.div>

          <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-24 md:py-36 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              {badge}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-balance text-5xl md:text-8xl leading-[0.95] tracking-[-0.02em]"
            >
              {titleLineOne}
              <br />
              <span className="italic text-muted-foreground">{titleLineTwo}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="max-w-xl text-pretty text-base md:text-lg text-muted-foreground"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Magnetic strength={0.5}>
                <Link
                  href={primary.href}
                  className="group inline-flex h-14 items-center gap-2 rounded-full bg-foreground pl-7 pr-2 text-base font-medium text-background"
                >
                  {primary.label}
                  <span className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Magnetic>

              <a
                href={`mailto:${contactEmail}`}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
