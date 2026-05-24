"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeIn delay={0}>
          <p className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-muted-foreground/60" />
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className="font-display text-balance text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em]">
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-xl text-pretty text-base md:text-lg text-muted-foreground">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
