"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const defaultBudgets = ["< $25k", "$25k – $75k", "$75k – $150k", "$150k +"];
const defaultServices = [
  "Design",
  "SEO",
  "Website",
  "Web app",
  "Mobile app",
  "Social media",
  "Not sure yet",
];

export function ContactForm({
  serviceOptions = defaultServices,
  budgetOptions = defaultBudgets,
  submitLabel = "Send inquiry",
  footerNote = "We reply within one business day.",
}: {
  serviceOptions?: string[];
  budgetOptions?: string[];
  submitLabel?: string;
  footerNote?: string;
}) {
  const services = serviceOptions.length > 0 ? serviceOptions : defaultServices;
  const budgets = budgetOptions.length > 0 ? budgetOptions : defaultBudgets;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggleService = (s: string) =>
    setSelectedServices((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" required placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="jane@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Company Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Your role</Label>
          <Input id="role" name="role" placeholder="Founder, CTO, PM…" />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">What do you need help with?</Label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={cn(
                "rounded-full border border-border px-4 py-2 text-sm transition-all",
                selectedServices.includes(s)
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/40 hover:bg-accent"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Project budget</Label>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={cn(
                "rounded-full border border-border px-4 py-2 text-sm transition-all",
                budget === b
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/40 hover:bg-accent"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Goals, timelines, anything we should know…"
          rows={6}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={sent}
          className="group inline-flex h-14 items-center gap-2 rounded-full bg-foreground pl-7 pr-2 text-base font-medium text-background disabled:opacity-80"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="inline-flex items-center gap-2"
              >
                Sent
                <span className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
                  <Check className="h-4 w-4" />
                </span>
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="inline-flex items-center gap-2"
              >
                {submitLabel}
                <span className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="text-sm text-muted-foreground">
          {footerNote}
        </p>
      </div>
    </form>
  );
}
