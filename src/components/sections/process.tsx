"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./section-heading";

type Step = { step: string; title: string; body: string };

const defaultSteps: Step[] = [
  { step: "01", title: "Listen", body: "We spend the first week asking better questions than the brief. Stakeholder interviews, jobs-to-be-done, hard tradeoffs surfaced early." },
  { step: "02", title: "Frame",  body: "A creative or technical direction backed by reasoning you can defend to your board. Two or three options, not twenty." },
  { step: "03", title: "Make",   body: "Two-week sprints, weekly working sessions, real artifacts every Friday. No 6-week silent stretches." },
  { step: "04", title: "Ship",   body: "Launch, measure, iterate. We don't disappear at handoff — we stay long enough for real users to inform the next move." },
];

export function Process({
  eyebrow = "How I work",
  titleLineOne = "A studio process,",
  titleLineTwo = "not an agency one.",
  description = "I collaborate the way the best in-house engineers do — with high context, weekly working sessions, and shared definitions of done. One person, one direct line.",
  steps = defaultSteps,
}: {
  eyebrow?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  description?: string;
  steps?: Step[];
}) {
  const stepList = steps.length > 0 ? steps : defaultSteps;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section className="relative bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
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

        <div ref={ref} className="relative mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {/* Vertical timeline (md+) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="absolute inset-y-0 w-px bg-border" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 w-px bg-foreground"
            />
          </div>

          {stepList.map((s, i) => (
            <motion.div
              key={`${s.step}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${i % 2 === 1 ? "md:mt-32" : ""}`}
            >
              <div className="md:absolute md:-left-[42px] md:top-2 mb-6 md:mb-0">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                </span>
              </div>

              <div className="md:pl-10">
                <span className="font-mono text-xs text-muted-foreground">
                  Step {s.step}
                </span>
                <h3 className="mt-3 font-display text-3xl md:text-5xl tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
