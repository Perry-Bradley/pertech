"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerChildren = 0.06,
  as = "h2",
  once = true,
}: TextRevealProps) {
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] pr-[0.25em]"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Character-level variant
export function CharReveal({
  text,
  className,
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const Tag = motion[as] as typeof motion.span;
  const chars = Array.from(text);

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.025, delayChildren: delay } },
      }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
            show: {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </Tag>
  );
}
