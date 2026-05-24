"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { ProjectDTO } from "@/lib/data";

export function PortfolioPreview({
  projects,
  eyebrow = "Selected work",
  titleLineOne = "Recent case studies",
  titleLineTwo = "from the studio.",
}: {
  projects: ProjectDTO[];
  eyebrow?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
}) {
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="relative bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow={eyebrow}
            title={
              <>
                {titleLineOne}
                <br />
                <span className="italic text-muted-foreground">
                  {titleLineTwo}
                </span>
              </>
            }
          />
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            View all work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.9,
                delay: (i % 2) * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={i % 2 === 1 ? "md:translate-y-24" : ""}
            >
              <Link href={`/portfolio/${p.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card aspect-[4/3]">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      {p.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
