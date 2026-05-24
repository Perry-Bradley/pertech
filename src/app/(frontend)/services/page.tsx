import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { Spotlight } from "@/components/animations/spotlight";
import { CTA } from "@/components/sections/cta";
import {
  buildMetadata,
  getPageSeo,
  getServices,
  getSimplePageContent,
} from "@/lib/data";
import { getIcon } from "@/lib/icon-map";

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("services").catch(() => ({}));
  return buildMetadata({
    pageSeo,
    fallbackTitle: "Services",
    fallbackDescription:
      "Design, SEO, website development, web app, mobile app, and social media services from Pertech.",
  });
}

export default async function ServicesPage() {
  const [services, hero] = await Promise.all([
    getServices(),
    getSimplePageContent("services-index-page").catch(() => ({
      eyebrow: "Services",
      title: "Six disciplines. One studio.",
      description:
        "We're senior practitioners in design, engineering, and growth. Every engagement is led end-to-end by people who've shipped at scale.",
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
          <div className="space-y-px overflow-hidden rounded-3xl border border-border bg-border">
            {services.map((service, i) => {
              const Icon = getIcon(service.iconName);
              return (
                <FadeIn
                  key={service.slug}
                  delay={i * 0.08}
                  className="bg-background"
                >
                  <Spotlight className="rounded-none">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group grid grid-cols-1 md:grid-cols-12 items-stretch gap-6 px-6 md:px-10 py-10 md:py-14 hover:bg-accent/30 transition-colors"
                    >
                      <div className="md:col-span-1 flex md:flex-col items-start gap-4">
                        <span className="font-mono text-xs text-muted-foreground">
                          {service.number}
                        </span>
                      </div>
                      <div className="md:col-span-4 flex items-start gap-4">
                        <Icon
                          className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground"
                          strokeWidth={1.5}
                        />
                        <div>
                          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-none">
                            {service.name}
                          </h2>
                        </div>
                      </div>
                      <div className="md:col-span-5 max-w-xl">
                        <p className="text-base md:text-lg text-muted-foreground text-pretty">
                          {service.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((f) => (
                            <span
                              key={f.title}
                              className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                            >
                              {f.title}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2 flex md:justify-end items-start">
                        <span className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-5 text-sm transition-all group-hover:bg-foreground group-hover:text-background">
                          Read more
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                        </span>
                      </div>
                    </Link>
                  </Spotlight>
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
