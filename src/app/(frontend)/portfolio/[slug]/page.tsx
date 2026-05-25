import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { TextReveal } from "@/components/animations/text-reveal";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
import { CTA } from "@/components/sections/cta";
import { Noise } from "@/components/animations/noise";
import { buildMetadata, getProject, getProjects } from "@/lib/data";

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) return { title: "Project" };
  return buildMetadata({
    pageSeo: p.seo,
    fallbackTitle: p.title,
    fallbackDescription: p.summary,
  });
}

export default async function ProjectPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background pt-36 pb-20 md:pt-44 md:pb-28">
        <Noise />
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <TextReveal
                text={project.title}
                as="h1"
                className="font-display text-balance text-6xl md:text-9xl leading-[0.9] tracking-[-0.035em]"
              />
              <FadeIn delay={0.4} className="mt-6">
                <p className="max-w-xl text-pretty text-lg md:text-2xl text-muted-foreground font-display">
                  {project.summary}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.5} className="md:col-span-4 md:col-start-9 self-end">
              <dl className="space-y-5 divide-y divide-border">
                <Meta label="Client" value={project.client} />
                <Meta label="Year" value={project.year} />
                <Meta label="Category" value={project.category} />
                <Meta label="Services" value={project.services.join(", ")} />
                {project.link && (
                  <div className="pt-5">
                    <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
                      Link
                    </dt>
                    <a
                      href={project.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-base"
                    >
                      {project.link.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </a>
                  </div>
                )}
              </dl>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-background">
        <FadeIn className="mx-auto max-w-[1600px] px-4 md:px-6 -mt-4">
          <div className="relative overflow-hidden rounded-3xl border border-border aspect-[16/10]">
            <Image
              src={project.cover}
              alt={project.title}
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              unoptimized
              priority
            />
          </div>
        </FadeIn>
      </section>

      {/* Metrics */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px overflow-hidden md:grid-cols-3">
            {project.metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.08} className="p-6 md:p-10">
                <p className="font-display text-5xl md:text-7xl tracking-tight">
                  {m.value}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{m.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-20 md:py-32 border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                The brief
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="md:col-span-8">
            <ScrollRevealText
              text={project.description}
              as="p"
              className="font-display text-2xl md:text-4xl leading-[1.15] tracking-[-0.01em] text-pretty mb-12 block"
            />
            <div className="space-y-10">
              <Block label="Challenge" body={project.challenge} />
              <Block label="Approach" body={project.approach} />
              <Block label="Outcome" body={project.outcome} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background py-20 md:py-28 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {project.gallery.map((g, i) => (
              <FadeIn key={g} delay={i * 0.08}>
                <div className="relative overflow-hidden rounded-3xl border border-border aspect-[16/10]">
                  <Image
                    src={g}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group flex items-center justify-between gap-4 px-6 py-10 md:py-14 hover:bg-accent/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Previous
                </p>
                <p className="mt-1 font-display text-2xl md:text-3xl tracking-tight">
                  {prev.title}
                </p>
              </div>
            </div>
          </Link>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex items-center justify-between gap-4 px-6 py-10 md:py-14 hover:bg-accent/40 transition-colors md:text-right"
          >
            <div className="md:ml-auto flex items-center gap-4 md:flex-row-reverse">
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Next
                </p>
                <p className="mt-1 font-display text-2xl md:text-3xl tracking-tight">
                  {next.title}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="pt-5 first:pt-0">
      <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label}
      </dt>
      <dd className="text-base">{value}</dd>
    </div>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
        {label}
      </h3>
      <p className="text-pretty text-base md:text-lg text-muted-foreground">
        {body}
      </p>
    </div>
  );
}
