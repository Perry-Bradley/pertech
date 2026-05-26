"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";

type Stat = { value: number; suffix: string; label: string };

const defaultStats: Stat[] = [
  { value: 150, suffix: "+", label: "Clients served" },
  { value: 10, suffix: "M+", label: "Users reached" },
  { value: 5, suffix: "yrs", label: "Engineering experience" },
  { value: 100, suffix: "%", label: "Hands-on involvement" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export function Stats({
  stats = defaultStats,
  eyebrow = "By the numbers",
  title = "A decade of work, distilled into one studio.",
}: {
  stats?: Stat[];
  eyebrow?: string;
  title?: string;
}) {
  const list = stats.length > 0 ? stats : defaultStats;
  return (
    <section className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <FadeIn>
            <p className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.02] tracking-[-0.02em] text-balance max-w-xl">
              {title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="max-w-sm text-sm text-muted-foreground">
              Each number is real. Aggregated across every engagement
              since 2021.
            </p>
          </FadeIn>
        </div>

        <div className="dark grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4 rounded-2xl border border-border bg-border text-foreground">
          {list.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-background p-6 md:p-10"
            >
              <div className="font-display text-5xl md:text-7xl tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
