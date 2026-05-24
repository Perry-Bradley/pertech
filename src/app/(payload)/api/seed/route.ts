import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { services as seedServices } from "@/lib/services";
import { projects as seedProjects } from "@/lib/projects";

const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@pertech.local";
const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

type IconName =
  | "Palette" | "Search" | "Globe" | "Layers" | "Smartphone" | "Share2"
  | "PenTool" | "Code" | "Megaphone" | "Sparkles";

const iconNameFor: Record<string, IconName> = {
  Palette: "Palette",
  Search: "Search",
  Globe: "Globe",
  Layers: "Layers",
  Smartphone: "Smartphone",
  Share2: "Share2",
};

/**
 * Idempotent seed. Always allowed in development.
 * In production, requires `?secret=...` matching the SEED_SECRET env var.
 *
 *   GET /api/seed                       → dev only
 *   GET /api/seed?secret=<SEED_SECRET>  → works in prod
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const required = process.env.SEED_SECRET;
    const provided =
      req.nextUrl.searchParams.get("secret") || req.headers.get("x-seed-secret");
    if (!required) {
      return NextResponse.json(
        { error: "SEED_SECRET not set on the server. Seeding disabled." },
        { status: 403 }
      );
    }
    if (provided !== required) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
    }
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  // 1. Admin user
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
        name: "Pertech Admin",
      },
    });
    log.push(`✓ Created admin: ${adminEmail} / ${adminPassword}`);
  } else {
    log.push("• Admin user already exists");
  }

  // 2. Services
  for (const s of seedServices) {
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    const data = {
      slug: s.slug,
      name: s.name,
      short: s.short,
      tagline: s.tagline,
      description: s.description,
      icon: iconNameFor[s.icon.displayName ?? ""] ?? "Layers",
      number: s.number,
      features: s.features.map((f) => ({ title: f.title, description: f.description })),
      deliverables: s.deliverables.map((d) => ({ item: d })),
      process: s.process.map((p) => ({
        step: p.step,
        title: p.title,
        description: p.description,
      })),
      faqs: s.faqs.map((f) => ({ q: f.q, a: f.a })),
      tools: s.tools.map((t) => ({ name: t })),
      pricing: s.pricing.map((p) => ({ tier: p.tier, price: p.price, for: p.for })),
    };
    if (existing.docs[0]) {
      await payload.update({ collection: "services", id: existing.docs[0].id, data });
      log.push(`↻ service: ${s.slug}`);
    } else {
      await payload.create({ collection: "services", data });
      log.push(`+ service: ${s.slug}`);
    }
  }

  // 3. Projects
  let i = 0;
  for (const p of seedProjects) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    const data = {
      slug: p.slug,
      order: i++,
      title: p.title,
      client: p.client,
      year: p.year,
      category: p.category,
      services: p.services.map((name) => ({ name })),
      summary: p.summary,
      description: p.description,
      challenge: p.challenge,
      approach: p.approach,
      outcome: p.outcome,
      metrics: p.metrics.map((m) => ({ label: m.label, value: m.value })),
      link: p.link ? { label: p.link.label, url: p.link.url } : undefined,
    };
    if (existing.docs[0]) {
      await payload.update({ collection: "projects", id: existing.docs[0].id, data });
      log.push(`↻ project: ${p.slug}`);
    } else {
      await payload.create({ collection: "projects", data });
      log.push(`+ project: ${p.slug}`);
    }
  }

  // 4. Site settings — initialize only
  const settings = (await payload.findGlobal({ slug: "site-settings" })) as {
    siteName?: string;
  };
  if (!settings.siteName) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Pertech",
        tagline: "Digital Studio for Ambitious Brands",
        contactEmail: "hello@pertech.studio",
        availability: "Available · Q3 2026",
        defaultTitle: "Pertech — Digital Studio for Ambitious Brands",
        titleTemplate: "%s | Pertech",
        defaultDescription:
          "Pertech is a design & engineering studio crafting premium websites, web apps, mobile apps, brand identities, and growth-led SEO.",
        defaultKeywords:
          "web design agency, web development, mobile app, SEO, UI UX design, branding",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pertech.studio",
        social: [
          { label: "X / Twitter", url: "#" },
          { label: "LinkedIn", url: "#" },
          { label: "Dribbble", url: "#" },
          { label: "Read.cv", url: "#" },
        ],
      },
    });
    log.push("+ site settings initialized");
  } else {
    log.push("• site settings already set");
  }

  // 5. Page globals — initialize only on first run so editors don't lose changes
  await seedPageGlobal(payload, "home-page", () => ({
    heroBadge: "Available · Q3 2026",
    heroMeta: "Studio of 8 · Remote-first",
    heroWords: [
      { text: "Design.", italic: false },
      { text: "Engineer.", italic: true },
      { text: "Ship.", italic: false },
    ],
    heroDescription:
      "Pertech is a design and engineering studio for brands that refuse to look generic. We build websites, products, mobile apps, and growth systems the way they should have been built the first time.",
    heroPrimaryCTA: { label: "Start a project", href: "/contact" },
    heroSecondaryCTA: { label: "See our work", href: "/portfolio" },
    marqueeEyebrow: "Trusted by founders, operators, and creative directors",
    marqueeClients: [
      "Luma Finance","Atlas","Monolith","Northwind","Vela",
      "Halo AI","Stratos","Foundry","Meridian","Cinder",
    ].map((name) => ({ name })),
    servicesEyebrow: "Services",
    servicesTitleLineOne: "Six disciplines.",
    servicesTitleLineTwo: "One studio.",
    servicesDescription:
      "We don't subcontract the work that matters. Every service is owned by senior practitioners who've shipped at scale.",
    portfolioEyebrow: "Selected work",
    portfolioTitleLineOne: "Recent case studies",
    portfolioTitleLineTwo: "from the studio.",
    aboutEyebrow: "About the studio",
    aboutBody:
      "We're eight humans who've spent the last decade quietly shipping products you've probably used. We started Pertech because the work we wanted to make didn't exist at the agencies we'd worked at.",
    processEyebrow: "How we work",
    processTitleLineOne: "A studio process,",
    processTitleLineTwo: "not an agency one.",
    processDescription:
      "We collaborate the way the best in-house teams do — with high context, weekly working sessions, and shared definitions of done.",
    processSteps: [
      { step: "01", title: "Listen", body: "We spend the first week asking better questions than the brief. Stakeholder interviews, jobs-to-be-done, hard tradeoffs surfaced early." },
      { step: "02", title: "Frame",  body: "A creative or technical direction backed by reasoning you can defend to your board. Two or three options, not twenty." },
      { step: "03", title: "Make",   body: "Two-week sprints, weekly working sessions, real artifacts every Friday. No 6-week silent stretches." },
      { step: "04", title: "Ship",   body: "Launch, measure, iterate. We don't disappear at handoff — we stay long enough for real users to inform the next move." },
    ],
    stats: [
      { value: 120, suffix: "+",   label: "Products shipped" },
      { value: 42,  suffix: "M+",  label: "Users reached" },
      { value: 9,   suffix: "yrs", label: "Median engineer experience" },
      { value: 98,  suffix: "%",   label: "Client retention" },
    ],
    testimonialsEyebrow: "What clients say",
    testimonialsTitleLineOne: "Words from",
    testimonialsTitleLineTwo: "the people we shipped with.",
    testimonials: [
      { quote: "Pertech took a five-year-old product that everyone on the team had given up on and made it the thing customers send their friends. That's a rare gift.", name: "Maya Iqbal",  role: "VP Product, Luma Finance" },
      { quote: "We've worked with three other agencies before. None of them shipped at this caliber, this fast, with this much honesty about tradeoffs.", name: "David Choi",  role: "Co-founder, Atlas" },
      { quote: "I gave them a brand brief on a Monday. By the following Monday we had a creative direction that made our board lean forward.", name: "Sofia Mendes", role: "Founder, Monolith Studio" },
      { quote: "They were the first agency to ever tell us what NOT to build. That conversation alone saved us six months and $400k.", name: "Arthur Reed",  role: "CEO, Northwind Outdoor" },
    ],
    ctaBadge: "Now booking · Q3 2026",
    ctaTitleLineOne: "Let's build",
    ctaTitleLineTwo: "something rare.",
    ctaDescription:
      "We take on a handful of new partnerships each quarter. If you're building something ambitious, we'd love to hear about it.",
    ctaPrimary: { label: "Start a conversation", href: "/contact" },
  }), log);

  await seedPageGlobal(payload, "about-page", () => ({
    eyebrow: "Studio",
    title: "A small studio with senior taste.",
    description: "Eight humans, twelve time zones over the last decade, and a shared belief that craft is not optional.",
    intro: "We started Pertech in 2021 because the work we wanted to make didn't exist at the agencies we'd worked at. Today we're a small remote-first studio partnering with founders and product leaders to ship rare, durable, opinionated work.",
    principlesEyebrow: "Principles",
    principlesTitle: "What we believe.",
    principles: [
      { number: "01", title: "Senior or nothing", body: "Every engagement is led by a partner with a decade of shipping. No bait-and-switch from a great pitch team to a junior delivery team." },
      { number: "02", title: "Show the work, weekly", body: "Real artifacts every Friday. No surprises. No black-box stretches. You see how the sausage is made — that's a feature." },
      { number: "03", title: "Taste and rigor", body: "Beautiful work that survives load testing, accessibility audits, and your CFO's questions. Craft and discipline aren't opposites." },
      { number: "04", title: "Honest tradeoffs", body: "We say no when we should. We push back when it matters. Trust compounds; flattery is short-term." },
    ],
    teamEyebrow: "The team",
    teamTitle: "Eight people doing the work.",
    team: [
      { name: "E. Reyes",   role: "Founder / Design" },
      { name: "M. Ndlovu",  role: "Founder / Engineering" },
      { name: "J. Park",    role: "Principal Engineer" },
      { name: "A. Salem",   role: "Principal Designer" },
      { name: "K. Bauer",   role: "Brand Director" },
      { name: "T. Okafor",  role: "Mobile Engineering" },
      { name: "L. Romano",  role: "Growth & SEO" },
      { name: "S. Iqbal",   role: "Producer" },
    ],
  }), log);

  await seedPageGlobal(payload, "contact-page", () => ({
    eyebrow: "Contact",
    title: "Let's talk.",
    description: "A real human reads every inquiry. Tell us about your project — we'll come back within one business day.",
    newBusinessEmail: "new@pertech.studio",
    studioBlurb: "Remote-first.\nHubs in Lisbon, New York, Singapore.",
    pressEmail: "press@pertech.studio",
    services: ["Design", "SEO", "Website", "Web app", "Mobile app", "Social media", "Not sure yet"].map((label) => ({ label })),
    budgets: ["< $25k", "$25k – $75k", "$75k – $150k", "$150k +"].map((label) => ({ label })),
    submitLabel: "Send inquiry",
    footerNote: "We reply within one business day.",
  }), log);

  await seedPageGlobal(payload, "services-index-page", () => ({
    eyebrow: "Services",
    title: "Six disciplines. One studio.",
    description: "We're senior practitioners in design, engineering, and growth. Every engagement is led end-to-end by people who've shipped at scale.",
  }), log);

  await seedPageGlobal(payload, "portfolio-index-page", () => ({
    eyebrow: "Work",
    title: "Selected case studies.",
    description: "A handful of recent engagements we're proud to put our name on. More available on request — some work lives behind NDAs.",
  }), log);

  return NextResponse.json({
    ok: true,
    admin: {
      url: "/admin",
      email: adminEmail,
      password: adminPassword,
      note: "Change the password from the admin UI after first login.",
    },
    log,
  });
}

/**
 * Sentinel arrays we expect to be populated by seeding. Field-level
 * defaultValue populates strings on first read, so we can't rely on them.
 * Arrays stay empty until explicitly seeded.
 */
const sentinelArrayFor: Record<string, string> = {
  "home-page": "heroWords",
  "about-page": "principles",
  "contact-page": "services",
  "services-index-page": "", // simple page — always overwrite-on-seed is OK
  "portfolio-index-page": "",
};

async function seedPageGlobal(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  buildData: () => Record<string, unknown>,
  log: string[],
) {
  const existing = (await payload.findGlobal({ slug } as never)) as unknown as Record<string, unknown>;
  const sentinel = sentinelArrayFor[slug];
  let initialized = false;
  if (sentinel) {
    const arr = existing[sentinel];
    initialized = Array.isArray(arr) && arr.length > 0;
  } else {
    // For simple pages, check if title was set (we never default it via overwrite)
    initialized = typeof existing.title === "string" && existing.title.length > 0 && existing.title !== "";
  }
  if (initialized) {
    log.push(`• ${slug} already initialized`);
    return;
  }
  await payload.updateGlobal({ slug: slug as never, data: buildData() as never });
  log.push(`+ ${slug} initialized`);
}
