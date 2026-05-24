import "server-only";
import type { Metadata } from "next";
import { getPayload } from "./payload";

// ---- Shapes ----------------------------------------------------------------

export type ServiceDTO = {
  id: string;
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  iconName: string;
  number: string;
  features: { title: string; description: string }[];
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { q: string; a: string }[];
  tools: string[];
  pricing: { tier: string; price: string; for: string }[];
  seo?: SeoFields;
};

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  services: string[];
  summary: string;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  cover: string;
  gallery: string[];
  metrics: { label: string; value: string }[];
  link?: { label: string; url: string };
  seo?: SeoFields;
};

export type SeoFields = {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  ogImage?: string | null;
  noindex?: boolean | null;
};

export type SiteSettingsDTO = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  availability: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
  defaultOgImage: string | null;
  siteUrl: string;
  social: { label: string; url: string }[];
};

// ---- Placeholder fallback (matches old generator) --------------------------

function placeholder(label: string, bg: string, fg: string) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='${bg}'/>
            <stop offset='100%' stop-color='${fg}'/>
          </linearGradient>
          <pattern id='p' width='40' height='40' patternUnits='userSpaceOnUse'>
            <path d='M 40 0 L 0 0 0 40' fill='none' stroke='${fg}' stroke-opacity='0.18' stroke-width='1'/>
          </pattern>
        </defs>
        <rect width='1600' height='1000' fill='url(#g)'/>
        <rect width='1600' height='1000' fill='url(#p)'/>
        <g font-family='Inter, system-ui, sans-serif' fill='${fg}' fill-opacity='0.92'>
          <text x='80' y='160' font-size='22' font-weight='500' letter-spacing='4'>PERTECH / CASE STUDY</text>
          <text x='80' y='560' font-size='120' font-weight='600' letter-spacing='-3'>${label}</text>
          <text x='80' y='920' font-size='20' fill-opacity='0.6'>screenshot · ${label.toLowerCase()}</text>
        </g>
      </svg>`
    )
  );
}

// ---- Helpers ---------------------------------------------------------------

type MediaLike = { url?: string | null; filename?: string | null } | string | null | undefined;

function mediaUrl(m: MediaLike): string | null {
  if (!m) return null;
  if (typeof m === "string") return m;
  if (m.url) return m.url;
  return null;
}

function arrField<T extends Record<string, unknown>, K extends keyof T>(
  arr: T[] | null | undefined,
  key: K
): NonNullable<T[K]>[] {
  if (!arr) return [];
  return arr.map((a) => a[key]).filter((v): v is NonNullable<T[K]> => v != null);
}

// ---- Mappers ---------------------------------------------------------------

function mapService(doc: Record<string, unknown>): ServiceDTO {
  const d = doc as {
    id: string | number;
    slug: string;
    name: string;
    short: string;
    tagline: string;
    description: string;
    icon?: string;
    number: string;
    features?: { title: string; description: string }[];
    deliverables?: { item: string }[];
    process?: { step: string; title: string; description: string }[];
    faqs?: { q: string; a: string }[];
    tools?: { name: string }[];
    pricing?: { tier: string; price: string; for: string }[];
    seo?: SeoFields & { ogImage?: MediaLike };
  };
  return {
    id: String(d.id),
    slug: d.slug,
    name: d.name,
    short: d.short,
    tagline: d.tagline,
    description: d.description,
    iconName: d.icon ?? "Layers",
    number: d.number,
    features: d.features ?? [],
    deliverables: arrField(d.deliverables, "item"),
    process: d.process ?? [],
    faqs: d.faqs ?? [],
    tools: arrField(d.tools, "name"),
    pricing: d.pricing ?? [],
    seo: d.seo
      ? {
          title: d.seo.title,
          description: d.seo.description,
          keywords: d.seo.keywords,
          ogImage: mediaUrl(d.seo.ogImage),
          noindex: d.seo.noindex,
        }
      : undefined,
  };
}

function mapProject(doc: Record<string, unknown>): ProjectDTO {
  const d = doc as {
    id: string | number;
    slug: string;
    title: string;
    client: string;
    year: string;
    category: string;
    services?: { name: string }[];
    summary: string;
    description: string;
    challenge: string;
    approach: string;
    outcome: string;
    cover?: MediaLike;
    gallery?: { image: MediaLike }[];
    metrics?: { label: string; value: string }[];
    link?: { label?: string | null; url?: string | null };
    seo?: SeoFields & { ogImage?: MediaLike };
  };
  const coverUrl = mediaUrl(d.cover);
  const galleryUrls = (d.gallery ?? [])
    .map((g) => mediaUrl(g.image))
    .filter((u): u is string => !!u);
  return {
    id: String(d.id),
    slug: d.slug,
    title: d.title,
    client: d.client,
    year: d.year,
    category: d.category,
    services: arrField(d.services, "name"),
    summary: d.summary,
    description: d.description,
    challenge: d.challenge,
    approach: d.approach,
    outcome: d.outcome,
    cover: coverUrl ?? placeholder(d.title, "#0a0a0a", "#fafafa"),
    gallery:
      galleryUrls.length > 0
        ? galleryUrls
        : [
            placeholder(`${d.title} · 01`, "#111111", "#fafafa"),
            placeholder(`${d.title} · 02`, "#1a1a1a", "#e5e5e5"),
            placeholder(`${d.title} · 03`, "#0a0a0a", "#fafafa"),
          ],
    metrics: d.metrics ?? [],
    link:
      d.link && d.link.label && d.link.url
        ? { label: d.link.label, url: d.link.url }
        : undefined,
    seo: d.seo
      ? {
          title: d.seo.title,
          description: d.seo.description,
          keywords: d.seo.keywords,
          ogImage: mediaUrl(d.seo.ogImage),
          noindex: d.seo.noindex,
        }
      : undefined,
  };
}

// ---- Public API ------------------------------------------------------------

export async function getServices(): Promise<ServiceDTO[]> {
  const payload = await getPayload();
  const res = await payload.find({
    collection: "services",
    limit: 100,
    sort: "number",
    depth: 1,
  });
  return res.docs.map((d) => mapService(d as unknown as Record<string, unknown>));
}

export async function getService(slug: string): Promise<ServiceDTO | null> {
  const payload = await getPayload();
  const res = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = res.docs[0];
  return doc ? mapService(doc as unknown as Record<string, unknown>) : null;
}

export async function getProjects(): Promise<ProjectDTO[]> {
  const payload = await getPayload();
  const res = await payload.find({
    collection: "projects",
    limit: 100,
    sort: "order",
    depth: 2,
  });
  return res.docs.map((d) => mapProject(d as unknown as Record<string, unknown>));
}

export async function getProject(slug: string): Promise<ProjectDTO | null> {
  const payload = await getPayload();
  const res = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const doc = res.docs[0];
  return doc ? mapProject(doc as unknown as Record<string, unknown>) : null;
}

export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  const payload = await getPayload();
  const s = (await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  })) as unknown as {
    siteName?: string;
    tagline?: string;
    contactEmail?: string;
    availability?: string;
    defaultTitle?: string;
    titleTemplate?: string;
    defaultDescription?: string;
    defaultKeywords?: string;
    defaultOgImage?: MediaLike;
    siteUrl?: string;
    social?: { label: string; url: string }[];
  };
  return {
    siteName: s.siteName ?? "Pertech",
    tagline: s.tagline ?? "Digital Studio for Ambitious Brands",
    contactEmail: s.contactEmail ?? "hello@pertech.studio",
    availability: s.availability ?? "Available · Q3 2026",
    defaultTitle: s.defaultTitle ?? "Pertech — Digital Studio for Ambitious Brands",
    titleTemplate: s.titleTemplate ?? "%s | Pertech",
    defaultDescription:
      s.defaultDescription ??
      "Pertech is a design & engineering studio crafting premium digital products.",
    defaultKeywords: s.defaultKeywords ?? "",
    defaultOgImage: mediaUrl(s.defaultOgImage),
    siteUrl: s.siteUrl ?? "https://pertech.studio",
    social: s.social ?? [],
  };
}

// ---- Page-content globals --------------------------------------------------

export type HeroWord = { text: string; italic: boolean };
export type Cta = { label: string; href: string };

export type HomePageContent = {
  heroBadge: string;
  heroMeta: string;
  heroWords: HeroWord[];
  heroDescription: string;
  heroPrimaryCTA: Cta;
  heroSecondaryCTA: Cta;
  marqueeEyebrow: string;
  marqueeClients: string[];
  servicesEyebrow: string;
  servicesTitleLineOne: string;
  servicesTitleLineTwo: string;
  servicesDescription: string;
  portfolioEyebrow: string;
  portfolioTitleLineOne: string;
  portfolioTitleLineTwo: string;
  aboutEyebrow: string;
  aboutBody: string;
  processEyebrow: string;
  processTitleLineOne: string;
  processTitleLineTwo: string;
  processDescription: string;
  processSteps: { step: string; title: string; body: string }[];
  stats: { value: number; suffix: string; label: string }[];
  testimonialsEyebrow: string;
  testimonialsTitleLineOne: string;
  testimonialsTitleLineTwo: string;
  testimonials: { quote: string; name: string; role: string }[];
  ctaBadge: string;
  ctaTitleLineOne: string;
  ctaTitleLineTwo: string;
  ctaDescription: string;
  ctaPrimary: Cta;
};

export type AboutPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  principlesEyebrow: string;
  principlesTitle: string;
  principles: { number: string; title: string; body: string }[];
  teamEyebrow: string;
  teamTitle: string;
  team: { name: string; role: string; photo?: string | null }[];
};

export type ContactPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  newBusinessEmail: string;
  studioBlurb: string;
  pressEmail: string;
  services: string[];
  budgets: string[];
  submitLabel: string;
  footerNote: string;
};

export type SimplePageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

function readCta(v: unknown): Cta {
  const c = (v as { label?: string; href?: string }) ?? {};
  return { label: c.label ?? "Start a project", href: c.href ?? "/contact" };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const payload = await getPayload();
  const g = (await payload.findGlobal({ slug: "home-page", depth: 1 })) as unknown as Record<string, unknown>;
  return {
    heroBadge: (g.heroBadge as string) ?? "Available · Q3 2026",
    heroMeta: (g.heroMeta as string) ?? "Studio of 8 · Remote-first",
    heroWords:
      ((g.heroWords as { text: string; italic?: boolean }[]) ?? []).map((w) => ({
        text: w.text,
        italic: !!w.italic,
      })),
    heroDescription: (g.heroDescription as string) ?? "",
    heroPrimaryCTA: readCta(g.heroPrimaryCTA),
    heroSecondaryCTA: readCta(g.heroSecondaryCTA),
    marqueeEyebrow: (g.marqueeEyebrow as string) ?? "",
    marqueeClients: arrField(g.marqueeClients as { name: string }[], "name"),
    servicesEyebrow: (g.servicesEyebrow as string) ?? "Services",
    servicesTitleLineOne: (g.servicesTitleLineOne as string) ?? "",
    servicesTitleLineTwo: (g.servicesTitleLineTwo as string) ?? "",
    servicesDescription: (g.servicesDescription as string) ?? "",
    portfolioEyebrow: (g.portfolioEyebrow as string) ?? "",
    portfolioTitleLineOne: (g.portfolioTitleLineOne as string) ?? "",
    portfolioTitleLineTwo: (g.portfolioTitleLineTwo as string) ?? "",
    aboutEyebrow: (g.aboutEyebrow as string) ?? "",
    aboutBody: (g.aboutBody as string) ?? "",
    processEyebrow: (g.processEyebrow as string) ?? "",
    processTitleLineOne: (g.processTitleLineOne as string) ?? "",
    processTitleLineTwo: (g.processTitleLineTwo as string) ?? "",
    processDescription: (g.processDescription as string) ?? "",
    processSteps: (g.processSteps as { step: string; title: string; body: string }[]) ?? [],
    stats: (g.stats as { value: number; suffix: string; label: string }[]) ?? [],
    testimonialsEyebrow: (g.testimonialsEyebrow as string) ?? "",
    testimonialsTitleLineOne: (g.testimonialsTitleLineOne as string) ?? "",
    testimonialsTitleLineTwo: (g.testimonialsTitleLineTwo as string) ?? "",
    testimonials:
      (g.testimonials as { quote: string; name: string; role: string }[]) ?? [],
    ctaBadge: (g.ctaBadge as string) ?? "",
    ctaTitleLineOne: (g.ctaTitleLineOne as string) ?? "",
    ctaTitleLineTwo: (g.ctaTitleLineTwo as string) ?? "",
    ctaDescription: (g.ctaDescription as string) ?? "",
    ctaPrimary: readCta(g.ctaPrimary),
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const payload = await getPayload();
  const g = (await payload.findGlobal({ slug: "about-page", depth: 1 })) as unknown as Record<string, unknown>;
  return {
    eyebrow: (g.eyebrow as string) ?? "Studio",
    title: (g.title as string) ?? "",
    description: (g.description as string) ?? "",
    intro: (g.intro as string) ?? "",
    principlesEyebrow: (g.principlesEyebrow as string) ?? "Principles",
    principlesTitle: (g.principlesTitle as string) ?? "",
    principles: (g.principles as { number: string; title: string; body: string }[]) ?? [],
    teamEyebrow: (g.teamEyebrow as string) ?? "The team",
    teamTitle: (g.teamTitle as string) ?? "",
    team: ((g.team as { name: string; role: string; photo?: MediaLike }[]) ?? []).map((m) => ({
      name: m.name,
      role: m.role,
      photo: mediaUrl(m.photo),
    })),
  };
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const payload = await getPayload();
  const g = (await payload.findGlobal({ slug: "contact-page", depth: 1 })) as unknown as Record<string, unknown>;
  return {
    eyebrow: (g.eyebrow as string) ?? "Contact",
    title: (g.title as string) ?? "",
    description: (g.description as string) ?? "",
    newBusinessEmail: (g.newBusinessEmail as string) ?? "",
    studioBlurb: (g.studioBlurb as string) ?? "",
    pressEmail: (g.pressEmail as string) ?? "",
    services: arrField((g.services as { label: string }[]) ?? [], "label"),
    budgets: arrField((g.budgets as { label: string }[]) ?? [], "label"),
    submitLabel: (g.submitLabel as string) ?? "Send inquiry",
    footerNote: (g.footerNote as string) ?? "",
  };
}

export async function getSimplePageContent(
  slug: "services-index-page" | "portfolio-index-page"
): Promise<SimplePageContent> {
  const payload = await getPayload();
  const g = (await payload.findGlobal({ slug })) as unknown as Record<string, unknown>;
  return {
    eyebrow: (g.eyebrow as string) ?? "",
    title: (g.title as string) ?? "",
    description: (g.description as string) ?? "",
  };
}

export type PageKey = "home" | "services" | "portfolio" | "about" | "contact";

export async function getPageSeo(key: PageKey): Promise<SeoFields> {
  const payload = await getPayload();
  const p = (await payload.findGlobal({ slug: "pages", depth: 1 })) as unknown as Record<
    string,
    SeoFields & { ogImage?: MediaLike }
  >;
  const v = p[key];
  if (!v) return {};
  return {
    title: v.title,
    description: v.description,
    keywords: v.keywords,
    ogImage: mediaUrl(v.ogImage),
    noindex: v.noindex,
  };
}

/** Compose metadata from page-level + collection-item-level + site defaults. */
export async function buildMetadata({
  pageSeo,
  fallbackTitle,
  fallbackDescription,
}: {
  pageSeo?: SeoFields;
  fallbackTitle?: string;
  fallbackDescription?: string;
}): Promise<Metadata> {
  const site = await getSiteSettings();
  const title =
    pageSeo?.title?.trim() || fallbackTitle || site.defaultTitle;
  const description =
    pageSeo?.description?.trim() ||
    fallbackDescription ||
    site.defaultDescription;
  const ogImage = pageSeo?.ogImage || site.defaultOgImage || undefined;
  const keywords = pageSeo?.keywords || site.defaultKeywords;
  return {
    title,
    description,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
    robots: pageSeo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
