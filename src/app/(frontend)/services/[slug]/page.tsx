import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Spotlight } from "@/components/animations/spotlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTA } from "@/components/sections/cta";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
import { buildMetadata, getService, getServices } from "@/lib/data";
import { getIcon } from "@/lib/icon-map";

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const services = await getServices().catch(() => []);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service" };
  return buildMetadata({
    pageSeo: service.seo,
    fallbackTitle: service.name,
    fallbackDescription: service.tagline,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getService(slug),
    getServices(),
  ]);
  if (!service) notFound();

  const Icon = getIcon(service.iconName);
  const others = allServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Service · ${service.number}`}
        title={service.name}
        description={service.tagline}
      />

      {/* Intro + tools */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Overview
              </span>
            </div>
            <ScrollRevealText
              text={service.description}
              as="p"
              className="font-display text-2xl md:text-4xl leading-[1.15] tracking-[-0.01em] text-pretty"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="md:col-span-4 md:col-start-9 space-y-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Tools we love
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Get in touch
              </h4>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground pl-5 pr-1.5 text-sm font-medium text-background"
              >
                Start a {service.name.toLowerCase()} project
                <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              What you get
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl text-balance">
              Capabilities we bring to every {service.name.toLowerCase()} engagement.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <Spotlight className="rounded-3xl">
                  <div className="rounded-3xl border border-border bg-card p-8 md:p-10 h-full">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-display text-2xl md:text-3xl tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-pretty text-base text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </Spotlight>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables + Pricing */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeIn>
              <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-block h-px w-8 bg-muted-foreground/60" />
                Deliverables
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.02em] text-balance mb-8">
                Exactly what lands in your inbox.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ul className="space-y-3">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 border-b border-border pb-3"
                  >
                    <Check className="h-4 w-4 mt-1 shrink-0 text-foreground" />
                    <span className="text-base">{d}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="md:col-span-7">
            <FadeIn>
              <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="inline-block h-px w-8 bg-muted-foreground/60" />
                Engagement options
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.02em] text-balance mb-8">
                Ways to work together.
              </h2>
            </FadeIn>
            <div className="space-y-4">
              {service.pricing.map((p, i) => (
                <FadeIn key={p.tier} delay={i * 0.1}>
                  <Spotlight className="rounded-2xl">
                    <div className="group flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-border bg-card p-6 md:p-8 transition-colors hover:bg-accent/40">
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                          {p.tier}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {p.for}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="font-mono text-lg">{p.price}</p>
                        <Link
                          href="/contact"
                          aria-label="Inquire"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 transition-all group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </Spotlight>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              The process
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl text-balance">
              Four phases, every {service.name.toLowerCase()} engagement.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-border bg-border">
            {service.process.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08} className="bg-background">
                <div className="h-full p-8 md:p-10">
                  <span className="font-mono text-xs text-muted-foreground">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-3xl tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              FAQ
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.02em] text-balance">
              Things people ask before signing on.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-7 md:col-start-6">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 gap-8">
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Other services
              </h2>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                All services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o, i) => {
              const OIcon = getIcon(o.iconName);
              return (
                <FadeIn key={o.slug} delay={i * 0.06}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="group block rounded-2xl border border-border p-6 transition-colors hover:bg-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <OIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="font-mono text-xs text-muted-foreground">
                        {o.number}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl tracking-tight">
                      {o.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {o.tagline}
                    </p>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
