import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { Stats } from "@/components/sections/stats";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { CTA } from "@/components/sections/cta";
import { Spotlight } from "@/components/animations/spotlight";
import {
  buildMetadata,
  getAboutPageContent,
  getHomePageContent,
  getPageSeo,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("about").catch(() => ({}));
  return buildMetadata({
    pageSeo,
    fallbackTitle: "Studio",
    fallbackDescription: "Pertech is a remote-first design and engineering studio.",
  });
}

export default async function AboutPage() {
  const [content, home, settings] = await Promise.all([
    getAboutPageContent().catch(() => null),
    getHomePageContent().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  const c = content ?? {
    eyebrow: "Studio",
    title: "A small studio with senior taste.",
    description: "Eight humans, twelve time zones over the last decade, and a shared belief that craft is not optional.",
    intro: "We started Pertech in 2021 because the work we wanted to make didn't exist at the agencies we'd worked at. Today we're a small remote-first studio partnering with founders and product leaders to ship rare, durable, opinionated work.",
    principlesEyebrow: "Principles",
    principlesTitle: "What we believe.",
    principles: [],
    teamEyebrow: "The team",
    teamTitle: "Eight people doing the work.",
    team: [],
  };

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />

      <section className="bg-background py-20 md:py-32 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <TextReveal
            text={c.intro}
            as="h2"
            className="font-display text-3xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-balance"
          />
        </div>
      </section>

      {/* Principles */}
      {c.principles.length > 0 && (
        <section className="bg-background py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-block h-px w-8 bg-muted-foreground/60" />
                {c.principlesEyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl">
                {c.principlesTitle}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              {c.principles.map((p, i) => (
                <FadeIn key={p.number + i} delay={i * 0.08} className="bg-background">
                  <Spotlight className="rounded-none h-full">
                    <div className="p-8 md:p-12 h-full">
                      <span className="font-mono text-xs text-muted-foreground">{p.number}</span>
                      <h3 className="mt-4 font-display text-2xl md:text-4xl tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </Spotlight>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {c.team.length > 0 && (
        <section className="bg-background py-20 md:py-28 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-block h-px w-8 bg-muted-foreground/60" />
                {c.teamEyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl">
                {c.teamTitle}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              {c.team.map((m, i) => (
                <FadeIn key={m.name + i} delay={i * 0.05} className="bg-background">
                  <div className="group flex flex-col items-center p-8 md:p-10">
                    <div className="aspect-square w-full max-w-[220px] rounded-2xl bg-gradient-to-br from-muted via-muted/40 to-background overflow-hidden relative">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={m.name}
                          width={440}
                          height={440}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklch,var(--foreground)_25%,transparent),transparent_60%)] transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
                          <div className="absolute inset-0 flex items-center justify-center font-display text-7xl text-foreground/10">
                            {m.name.split(" ")[0][0]}
                          </div>
                        </>
                      )}
                    </div>
                    <p className="mt-5 font-display text-xl tracking-tight">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <Stats stats={home?.stats} />
      <ClientMarquee
        eyebrow={home?.marqueeEyebrow}
        clients={home?.marqueeClients}
      />
      <CTA
        badge={home?.ctaBadge}
        titleLineOne={home?.ctaTitleLineOne}
        titleLineTwo={home?.ctaTitleLineTwo}
        description={home?.ctaDescription}
        primary={home?.ctaPrimary}
        contactEmail={settings?.contactEmail}
      />
    </>
  );
}
