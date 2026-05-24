"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
  ...props
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
