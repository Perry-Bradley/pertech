"use client";

import { Marquee } from "@/components/animations/marquee";
import { FadeIn } from "@/components/animations/fade-in";

const defaultClients = [
  "Luma Finance","Atlas","Monolith","Northwind","Vela",
  "Halo AI","Stratos","Foundry","Meridian","Cinder",
];

export function ClientMarquee({
  eyebrow = "Trusted by founders, operators, and creative directors",
  clients = defaultClients,
}: {
  eyebrow?: string;
  clients?: string[];
}) {
  const list = clients.length > 0 ? clients : defaultClients;
  return (
    <section className="border-y border-border bg-background/50 py-10">
      <FadeIn className="mb-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
      </FadeIn>
      <Marquee duration={48} pauseOnHover>
        {list.map((c) => (
          <span
            key={c}
            className="text-2xl md:text-3xl font-display tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
