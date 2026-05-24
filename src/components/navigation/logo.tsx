"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Pertech mark — geometric P built from a rotated square + offset half-bowl.
 * The "step" notch and the negative-space dot give it a distinctive silhouette
 * that reads at favicon size as well as on a billboard.
 */
export function LogoMark({
  className,
  size = 28,
  animated = true,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label="Pertech mark"
      className={cn("shrink-0 overflow-visible", className)}
      fill="none"
    >
      {/* Outer square */}
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
        className={cn(
          "origin-center",
          animated && "transition-transform duration-700 group-hover/logo:rotate-90"
        )}
      />
      {/* P letterform — single stroke: stem up, top crossbar, arc bowl, return to stem */}
      <path
        d="M11 23 L11 9 L18 9 A5 5 0 0 1 18 19 L11 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          animated &&
            "transition-transform duration-500 ease-out group-hover/logo:translate-y-[0.5px]"
        )}
      />
      {/* Accent dot — the 'tech' bit */}
      <circle
        cx="22.5"
        cy="22.5"
        r="1.6"
        fill="currentColor"
        className={cn(
          animated &&
            "origin-center transition-transform duration-500 group-hover/logo:scale-150"
        )}
      />
    </svg>
  );
}

export function Logo({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Link
      href="/"
      aria-label="Pertech — home"
      className={cn(
        "group/logo inline-flex items-center gap-2.5 font-medium tracking-tight",
        className
      )}
    >
      <LogoMark size={size} />
      <span className="font-display text-[20px] leading-none tracking-[-0.02em]">
        Pertech
      </span>
    </Link>
  );
}
