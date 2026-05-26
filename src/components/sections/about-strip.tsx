"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";

export function AboutStrip({
  eyebrow = "About the studio",
  body = "Pertech is a solo studio run by Perry Bradley. Five years of quietly shipping products you've probably used, now distilled into a single point of contact and a single high taste bar.",
}: {
  eyebrow?: string;
  body?: string;
}) {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              {eyebrow}
            </motion.span>
          </div>

          <div className="md:col-span-8">
            <ScrollRevealText
              text={body}
              as="h2"
              className="font-display text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-balance"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                More about us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                See the work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
