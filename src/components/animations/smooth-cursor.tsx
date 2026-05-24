"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function SmoothCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, { stiffness: 400, damping: 28, mass: 0.4 });
  const cy = useSpring(y, { stiffness: 400, damping: 28, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!supportsHover) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = !!t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );
      setHovering(interactive);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [supportsHover, x, y]);

  if (!supportsHover) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
        style={{ x: cx, y: cy }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 10 : 6,
            height: hovering ? 10 : 6,
            x: hovering ? -5 : -3,
            y: hovering ? -5 : -3,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] mix-blend-difference"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="rounded-full border border-white/70"
          animate={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            x: hovering ? -28 : -16,
            y: hovering ? -28 : -16,
            opacity: hovering ? 0.9 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        />
      </motion.div>
    </>
  );
}
