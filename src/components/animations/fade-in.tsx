"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  y?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  y = 24,
  once = true,
  amount = 0.2,
  ...props
}: FadeInProps) {
  const offset = direction === "none" ? { x: 0, y: 0 }
    : direction === "up" ? { x: 0, y }
    : direction === "down" ? { x: 0, y: -y }
    : direction === "left" ? { x: y, y: 0 }
    : { x: -y, y: 0 };

  const variants: Variants = {
    hidden: { opacity: 0, ...offset, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
