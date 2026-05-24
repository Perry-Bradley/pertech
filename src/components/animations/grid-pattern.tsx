"use client";

import { cn } from "@/lib/utils";

export function GridPattern({
  className,
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, color-mix(in oklch, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 8%, transparent) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

export function DotPattern({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in oklch, var(--foreground) 22%, transparent) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
