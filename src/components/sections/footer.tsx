"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/navigation/logo";

type FooterService = { slug: string; name: string };
type FooterSocial = { label: string; url: string };

type FooterProps = {
  services?: FooterService[];
  social?: FooterSocial[];
  availability?: string;
  contactEmail?: string;
};

const defaultServices: FooterService[] = [
  { slug: "design", name: "Design" },
  { slug: "seo", name: "SEO" },
  { slug: "website-development", name: "Website Development" },
  { slug: "web-app-development", name: "Web App Development" },
  { slug: "mobile-app-development", name: "Mobile App Development" },
  { slug: "social-media-management", name: "Social Media" },
];

const defaultSocial: FooterSocial[] = [
  { label: "X / Twitter", url: "#" },
  { label: "LinkedIn", url: "#" },
  { label: "Dribbble", url: "#" },
  { label: "Read.cv", url: "#" },
];

export function Footer({
  services = defaultServices,
  social = defaultSocial,
  availability = "Available · Q3 2026",
  contactEmail = "hello@pertech.studio",
}: FooterProps) {
  return (
    <footer className="dark relative border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        {/* Massive wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="select-none"
        >
          <h2 className="font-display text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-[-0.04em]">
            Pertech<span className="text-muted-foreground/40">.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-border pt-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Design & engineering studio crafting premium digital products for
              ambitious teams.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {availability}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition-colors hover:text-muted-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="transition-colors hover:text-muted-foreground">About</Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-muted-foreground">Work</Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-muted-foreground">Contact</Link>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors hover:text-muted-foreground"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Social
            </h4>
            <ul className="space-y-2.5 text-sm">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-muted-foreground"
                  >
                    {s.label}
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Pertech · All rights reserved</p>
          <p className="font-mono">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle mr-2 animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
