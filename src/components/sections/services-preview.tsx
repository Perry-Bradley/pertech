"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Spotlight } from "@/components/animations/spotlight";
import { getIcon } from "@/lib/icon-map";
import type { ServiceDTO } from "@/lib/data";

export function ServicesPreview({
  services,
  eyebrow = "Services",
  titleLineOne = "Six disciplines.",
  titleLineTwo = "One studio.",
  description = "We don't subcontract the work that matters. Every service is owned by senior practitioners who've shipped at scale.",
}: {
  services: ServiceDTO[];
  eyebrow?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  description?: string;
}) {
  return (
    <section id="services" className="relative py-28 md:py-36">
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
            description={description}
          />
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium"
          >
            All services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = getIcon(service.iconName);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-background"
              >
                <Spotlight className="h-full rounded-none">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full flex-col justify-between gap-8 p-8 md:p-10 transition-colors hover:bg-accent/40"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        {service.number}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="space-y-4">
                      <Icon
                        className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-foreground"
                        strokeWidth={1.5}
                      />
                      <h3 className="font-display text-3xl md:text-4xl tracking-tight">
                        {service.name}
                      </h3>
                      <p className="max-w-md text-pretty text-sm md:text-base text-muted-foreground">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((f) => (
                        <span
                          key={f.title}
                          className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {f.title}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
