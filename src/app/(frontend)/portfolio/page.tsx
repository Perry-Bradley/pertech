import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { CTA } from "@/components/sections/cta";
import {
  buildMetadata,
  getPageSeo,
  getProjects,
  getSimplePageContent,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("portfolio").catch(() => ({}));
  return buildMetadata({
    pageSeo,
    fallbackTitle: "Work",
    fallbackDescription:
      "Selected case studies from Pertech — websites, web apps, mobile apps, identities, and growth.",
  });
}

export default async function PortfolioPage() {
  const [projects, hero] = await Promise.all([
    getProjects(),
    getSimplePageContent("portfolio-index-page").catch(() => ({
      eyebrow: "Work",
      title: "Selected case studies.",
      description:
        "A handful of recent engagements we're proud to put our name on. More available on request — some work lives behind NDAs.",
    })),
  ]);
  return (
    <>
      <PageHeader
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-28">
            {projects.map((p, i) => (
              <FadeIn
                key={p.slug}
                delay={(i % 2) * 0.1}
                className={i % 2 === 1 ? "md:translate-y-20" : ""}
              >
                <Link href={`/portfolio/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card aspect-[4/3]">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      width={1600}
                      height={1000}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
