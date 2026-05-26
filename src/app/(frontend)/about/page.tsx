import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { PageHeader } from "@/components/sections/page-header";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollRevealText } from "@/components/animations/scroll-reveal-text";
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
    title: "A solo studio with a high taste bar.",
    description: "One person, end-to-end. Five years of shipped work behind it, and a belief that craft is not optional.",
    intro: "Pertech is a one-person studio run by Perry Bradley — a certified fullstack engineer, designer, and SEO specialist based in Cameroon. Five years across the disciplines that actually ship a product: design, fullstack web, WordPress, mobile, SEO, and DevOps. One taste bar, one direct line, no hand-offs.",
    principlesEyebrow: "Principles",
    principlesTitle: "What I believe.",
    principles: [],
    teamEyebrow: "The studio",
    teamTitle: "One person, end to end.",
    team: [],
  };

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />

      <section className="bg-background py-20 md:py-32 border-b border-border">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollRevealText
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

      {/* Expertise / Skills */}
      <ExpertiseSection />

      {/* Experience */}
      <ExperienceSection />

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

// ----------------------------------------------------------------------------
// Expertise — grouped skills

const expertise = [
  {
    label: "Fullstack engineering",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "REST + GraphQL", "Postgres", "Prisma / Drizzle"],
  },
  {
    label: "WordPress",
    skills: ["Custom themes", "Custom plugins", "Headless WP", "WooCommerce", "ACF"],
  },
  {
    label: "Mobile",
    skills: ["Flutter", "Dart", "React Native", "App Store + Play Store"],
  },
  {
    label: "Design",
    skills: ["UI / UX", "Design systems", "Figma", "Brand identity", "Motion"],
  },
  {
    label: "SEO",
    skills: ["Technical audits", "On-page", "Schema", "Content strategy", "Core Web Vitals"],
  },
  {
    label: "DevOps",
    skills: ["Vercel", "AWS", "Docker", "CI / CD", "Linux", "Cloudflare"],
  },
];

function ExpertiseSection() {
  return (
    <section className="bg-background py-20 md:py-28 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-muted-foreground/60" />
            Expertise
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl">
            What I bring to every engagement.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-border bg-border">
          {expertise.map((group, i) => (
            <FadeIn key={group.label} delay={i * 0.06} className="bg-background">
              <Spotlight className="rounded-none h-full">
                <div className="p-8 md:p-10 h-full">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-tight">
                    {group.label}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Spotlight>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
// Experience — career timeline

const experience = [
  {
    year: "2024 — present",
    title: "Founder · Pertech Studio",
    body: "Solo design + engineering studio. Full ownership of every engagement — discovery, design, build, launch, growth.",
  },
  {
    year: "2022 — 2024",
    title: "Senior Engineer · independent",
    body: "Full-stack client work across web and mobile. Took products from zero-to-one and rebuilt legacy systems for funded teams.",
  },
  {
    year: "2020 — 2022",
    title: "Software Engineer",
    body: "Early career across agencies and product teams. Shipped marketing sites, internal tools, and the first generation of mobile apps.",
  },
  {
    year: "2020",
    title: "Certified Engineer",
    body: "Completed engineering certification and began full-time professional software work.",
  },
];

function ExperienceSection() {
  return (
    <section className="bg-background py-20 md:py-28 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-muted-foreground/60" />
            Experience
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] mb-14 max-w-3xl">
            Five years, four chapters.
          </h2>
        </FadeIn>

        <div className="space-y-px overflow-hidden rounded-3xl border border-border bg-border">
          {experience.map((entry, i) => (
            <FadeIn key={entry.year + i} delay={i * 0.07} className="bg-background">
              <div className="group grid grid-cols-1 md:grid-cols-12 items-start gap-4 px-6 md:px-10 py-8 md:py-10 transition-colors hover:bg-accent/30">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {entry.year}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-base text-muted-foreground">
                    {entry.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
