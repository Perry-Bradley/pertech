"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "./section-heading";
import type { ProjectDTO } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useNoHover } from "@/lib/use-no-hover";

function PortfolioCard({
  project,
  index,
}: {
  project: ProjectDTO;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.5 });
  const noHover = useNoHover();
  const fakeHover = noHover && inView;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.9,
        delay: (index % 2) * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={index % 2 === 1 ? "md:translate-y-24" : ""}
    >
      <Link
        ref={cardRef}
        href={`/portfolio/${project.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card aspect-[4/3]">
          <Image
            src={project.cover}
            alt={project.title}
            width={1600}
            height={1000}
            className={cn(
              "h-full w-full object-cover transition-transform duration-[1200ms] ease-out",
              "group-hover:scale-105",
              fakeHover && "scale-105"
            )}
            unoptimized
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent transition-opacity duration-500 opacity-0",
              "group-hover:opacity-100",
              fakeHover && "opacity-100"
            )}
          />
          <div
            className={cn(
              "absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-all duration-500 translate-y-3 opacity-0",
              "group-hover:translate-y-0 group-hover:opacity-100",
              fakeHover && "translate-y-0 opacity-100"
            )}
            style={{ transitionDelay: fakeHover ? "200ms" : "0ms" }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {project.summary}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

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
            <PortfolioCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
