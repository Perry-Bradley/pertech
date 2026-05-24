import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-foreground text-background",
        outline:
          "border-border text-foreground bg-background/40 backdrop-blur",
        muted:
          "border-transparent bg-muted text-muted-foreground",
        dot:
          "border-border bg-background/50 backdrop-blur text-foreground gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500 before:animate-pulse",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
