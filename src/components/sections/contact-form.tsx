"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const defaultServices = [
  "Design",
  "SEO",
  "Website",
  "Web app",
  "Mobile app",
  "Social media",
  "Not sure yet",
];

// Staggered entrance — parent triggers children to animate one after another
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ContactForm({
  serviceOptions = defaultServices,
  // budgetOptions kept in the prop API for backward compatibility, but
  // we no longer render budget pills — clients type their budget freely.
  budgetOptions: _budgetOptions,
  submitLabel = "Send inquiry",
  footerNote = "I reply within one business day.",
}: {
  serviceOptions?: string[];
  budgetOptions?: string[];
  submitLabel?: string;
  footerNote?: string;
}) {
  void _budgetOptions;
  const services = serviceOptions.length > 0 ? serviceOptions : defaultServices;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggleService = (s: string) =>
    setSelectedServices((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
    );

  return (
    <motion.form
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-10"
    >
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
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
      </motion.div>

      <motion.div variants={item}>
        <Label className="mb-3 block">What do you need help with?</Label>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {services.map((s) => (
            <motion.button
              variants={pill}
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full border border-border px-4 py-2 text-sm transition-colors",
                selectedServices.includes(s)
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/40 hover:bg-accent"
              )}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="space-y-2">
        <Label htmlFor="budget">Project budget</Label>
        <Input
          id="budget"
          name="budget"
          placeholder="e.g. $15,000 — or a range, or 'flexible'"
        />
      </motion.div>

      <motion.div variants={item} className="space-y-2">
        <Label htmlFor="message">Tell us about the project</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Goals, timelines, anything we should know…"
          rows={6}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-6"
      >
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

        <p className="text-sm text-muted-foreground">{footerNote}</p>
      </motion.div>
    </motion.form>
  );
}
