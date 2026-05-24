"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Spotlight({
  className,
  size = 500,
  children,
  ...props
}: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative group", className)}
      style={{ "--spot-size": `${size}px` } as React.CSSProperties}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), color-mix(in oklch, var(--foreground) 18%, transparent), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
