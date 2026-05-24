import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { Hero } from "@/components/sections/hero";
import { ClientMarquee } from "@/components/sections/client-marquee";
import { ServicesPreview } from "@/components/sections/services-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { AboutStrip } from "@/components/sections/about-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import {
  buildMetadata,
  getHomePageContent,
  getPageSeo,
  getProjects,
  getServices,
  getSiteSettings,
} from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const pageSeo = await getPageSeo("home").catch(() => ({}));
  return buildMetadata({ pageSeo });
}

export default async function Home() {
  const [services, projects, content, settings] = await Promise.all([
    getServices().catch(() => []),
    getProjects().catch(() => []),
    getHomePageContent().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  if (!content) {
    // Fallback to component defaults if CMS not seeded yet
    return (
      <>
        <Hero />
        <ClientMarquee />
        <ServicesPreview services={services} />
        <PortfolioPreview projects={projects} />
        <AboutStrip />
        <Process />
        <Stats />
        <Testimonials />
        <CTA />
      </>
    );
  }

  return (
    <>
      <Hero
        badge={content.heroBadge}
        meta={content.heroMeta}
        words={content.heroWords}
        description={content.heroDescription}
        primaryCTA={content.heroPrimaryCTA}
        secondaryCTA={content.heroSecondaryCTA}
      />
      <ClientMarquee
        eyebrow={content.marqueeEyebrow}
        clients={content.marqueeClients}
      />
      <ServicesPreview
        services={services}
        eyebrow={content.servicesEyebrow}
        titleLineOne={content.servicesTitleLineOne}
        titleLineTwo={content.servicesTitleLineTwo}
        description={content.servicesDescription}
      />
      <PortfolioPreview
        projects={projects}
        eyebrow={content.portfolioEyebrow}
        titleLineOne={content.portfolioTitleLineOne}
        titleLineTwo={content.portfolioTitleLineTwo}
      />
      <AboutStrip eyebrow={content.aboutEyebrow} body={content.aboutBody} />
      <Process
        eyebrow={content.processEyebrow}
        titleLineOne={content.processTitleLineOne}
        titleLineTwo={content.processTitleLineTwo}
        description={content.processDescription}
        steps={content.processSteps}
      />
      <Stats stats={content.stats} />
      <Testimonials
        eyebrow={content.testimonialsEyebrow}
        titleLineOne={content.testimonialsTitleLineOne}
        titleLineTwo={content.testimonialsTitleLineTwo}
        quotes={content.testimonials}
      />
      <CTA
        badge={content.ctaBadge}
        titleLineOne={content.ctaTitleLineOne}
        titleLineTwo={content.ctaTitleLineTwo}
        description={content.ctaDescription}
        primary={content.ctaPrimary}
        contactEmail={settings?.contactEmail}
      />
    </>
  );
}
