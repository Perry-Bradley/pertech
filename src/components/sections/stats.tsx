"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string };

const defaultStats: Stat[] = [
  { value: 120, suffix: "+", label: "Products shipped" },
  { value: 42, suffix: "M+", label: "Users reached" },
  { value: 9, suffix: "yrs", label: "Median engineer experience" },
  { value: 98, suffix: "%", label: "Client retention" },
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

export function Stats({ stats = defaultStats }: { stats?: Stat[] }) {
  const list = stats.length > 0 ? stats : defaultStats;
  return (
    <section className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {list.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-10"
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
