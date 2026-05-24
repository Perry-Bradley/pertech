"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Spotlight } from "@/components/animations/spotlight";

type Quote = { quote: string; name: string; role: string };

const defaultQuotes: Quote[] = [
  { quote: "Pertech took a five-year-old product that everyone on the team had given up on and made it the thing customers send their friends. That's a rare gift.", name: "Maya Iqbal", role: "VP Product, Luma Finance" },
  { quote: "We've worked with three other agencies before. None of them shipped at this caliber, this fast, with this much honesty about tradeoffs.", name: "David Choi", role: "Co-founder, Atlas" },
  { quote: "I gave them a brand brief on a Monday. By the following Monday we had a creative direction that made our board lean forward.", name: "Sofia Mendes", role: "Founder, Monolith Studio" },
  { quote: "They were the first agency to ever tell us what NOT to build. That conversation alone saved us six months and $400k.", name: "Arthur Reed", role: "CEO, Northwind Outdoor" },
];

export function Testimonials({
  eyebrow = "What clients say",
  titleLineOne = "Words from",
  titleLineTwo = "the people we shipped with.",
  quotes = defaultQuotes,
}: {
  eyebrow?: string;
  titleLineOne?: string;
  titleLineTwo?: string;
  quotes?: Quote[];
}) {
  const list = quotes.length > 0 ? quotes : defaultQuotes;
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={eyebrow}
          align="center"
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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {list.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Spotlight className="h-full rounded-3xl">
                <div className="relative h-full rounded-3xl border border-border bg-card p-8 md:p-10 transition-colors hover:bg-accent/40">
                  <Quote className="h-7 w-7 text-muted-foreground/60" strokeWidth={1.5} />
                  <p className="mt-6 text-pretty text-lg md:text-xl leading-snug font-display tracking-tight">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/10" />
                    <div>
                      <div className="text-sm font-medium">{q.name}</div>
                      <div className="text-xs text-muted-foreground">{q.role}</div>
                    </div>
                  </div>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
