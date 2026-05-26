import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * DESTRUCTIVE force-reseed of all page globals.
 *
 * Unlike /api/seed (which skips globals that already have content), this
 * route overwrites them. Use after a content rewrite when you want every
 * editor's tweak gone and the latest seed defaults to win.
 *
 *   GET /api/reseed                       → dev only
 *   GET /api/reseed?secret=<SEED_SECRET>  → works in prod
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const required = process.env.SEED_SECRET;
    const provided =
      req.nextUrl.searchParams.get("secret") || req.headers.get("x-seed-secret");
    if (!required || provided !== required) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const payload = await getPayload({ config });
  const log: string[] = [];

  // ------------ Home page ------------
  await payload.updateGlobal({
    slug: "home-page",
    data: {
      heroBadge: "Available · Q3 2026",
      heroMeta: "Solo studio · Remote",
      heroWords: [
        { text: "Design.", italic: false },
        { text: "Engineer.", italic: true },
        { text: "Ship.", italic: false },
      ],
      heroDescription:
        "Pertech is a solo design and engineering studio for brands that refuse to look generic. One person, end-to-end — websites, products, mobile apps, and growth systems built the way they should have been the first time.",
      heroPrimaryCTA: { label: "Start a project", href: "/contact" },
      heroSecondaryCTA: { label: "See the work", href: "/portfolio" },
      marqueeEyebrow: "Trusted by founders, operators, and creative directors",
      marqueeClients: [
        "Luma Finance","Atlas","Monolith","Northwind","Vela",
        "Halo AI","Stratos","Foundry","Meridian","Cinder",
      ].map((name) => ({ name })),
      servicesEyebrow: "Services",
      servicesTitleLineOne: "Six disciplines.",
      servicesTitleLineTwo: "One studio.",
      servicesDescription:
        "Nothing gets subcontracted. Every service is owned, scoped, and shipped by one practitioner with a decade of work behind him.",
      portfolioEyebrow: "Selected work",
      portfolioTitleLineOne: "Recent case studies",
      portfolioTitleLineTwo: "from the studio.",
      aboutEyebrow: "About the studio",
      aboutBody:
        "Pertech is a solo studio run by Perry Bradley. Five years of quietly shipping products you've probably used, now distilled into a single point of contact and a single high taste bar.",
      processEyebrow: "How I work",
      processTitleLineOne: "A studio process,",
      processTitleLineTwo: "not an agency one.",
      processDescription:
        "I collaborate the way the best in-house engineers do — with high context, weekly working sessions, and shared definitions of done. One person, one direct line.",
      processSteps: [
        { step: "01", title: "Listen", body: "I spend the first week asking better questions than the brief. Stakeholder interviews, jobs-to-be-done, hard tradeoffs surfaced early." },
        { step: "02", title: "Frame",  body: "A creative or technical direction backed by reasoning you can defend to your board. Two or three options, not twenty." },
        { step: "03", title: "Make",   body: "Two-week sprints, weekly working sessions, real artifacts every Friday. No 6-week silent stretches." },
        { step: "04", title: "Ship",   body: "Launch, measure, iterate. I don't disappear at handoff — I stay long enough for real users to inform the next move." },
      ],
      stats: [
        { value: 150, suffix: "+",   label: "Clients served" },
        { value: 10,  suffix: "M+",  label: "Users reached" },
        { value: 5,   suffix: "yrs", label: "Engineering experience" },
        { value: 100, suffix: "%",   label: "Hands-on involvement" },
      ],
      testimonialsEyebrow: "What clients say",
      testimonialsTitleLineOne: "Words from",
      testimonialsTitleLineTwo: "the people I shipped with.",
      testimonials: [
        { quote: "Perry took a product everyone on the team had given up on and made it the thing customers send their friends. That's a rare gift.", name: "Maya Iqbal",  role: "VP Product, Luma Finance" },
        { quote: "I've worked with three agencies before. None of them shipped at this caliber, this fast, with this much honesty about tradeoffs.", name: "David Choi",  role: "Co-founder, Atlas" },
        { quote: "Gave him a brand brief on a Monday. By the following Monday I had a creative direction that made the board lean forward.", name: "Sofia Mendes", role: "Founder, Monolith Studio" },
        { quote: "He was the first person to ever tell me what NOT to build. That conversation alone saved six months and $400k.", name: "Arthur Reed",  role: "CEO, Northwind Outdoor" },
      ],
      ctaBadge: "Now booking · Q3 2026",
      ctaTitleLineOne: "Let's build",
      ctaTitleLineTwo: "something rare.",
      ctaDescription:
        "I take on a handful of new partnerships each quarter. If you're building something ambitious, I'd love to hear about it.",
      ctaPrimary: { label: "Start a conversation", href: "/contact" },
    } as never,
  });
  log.push("✓ home-page overwritten");

  // ------------ About page ------------
  await payload.updateGlobal({
    slug: "about-page",
    data: {
      eyebrow: "Studio",
      title: "A solo studio with a high taste bar.",
      description:
        "One person, end-to-end. Five years of shipped work behind it, and a belief that craft is not optional.",
      intro:
        "Pertech is a one-person studio run by Perry Bradley — a certified fullstack engineer, designer, and SEO specialist based in Cameroon. Five years across the disciplines that actually ship a product: design, fullstack web, WordPress, mobile, SEO, and DevOps. One taste bar, one direct line, no hand-offs.",
      principlesEyebrow: "Principles",
      principlesTitle: "What I believe.",
      principles: [
        { number: "01", title: "No middlemen", body: "You talk to the person doing the work. Every call, every PR, every Friday demo. No account managers, no junior hand-offs." },
        { number: "02", title: "Show the work, weekly", body: "Real artifacts every Friday. No surprises. No black-box stretches. You see how the sausage is made — that's a feature." },
        { number: "03", title: "Taste and rigor", body: "Beautiful work that survives load testing, accessibility audits, and your CFO's questions. Craft and discipline aren't opposites." },
        { number: "04", title: "Honest tradeoffs", body: "I say no when I should. I push back when it matters. Trust compounds; flattery is short-term." },
      ],
      teamEyebrow: "The studio",
      teamTitle: "One person, end to end.",
      team: [
        { name: "Perry Bradley", role: "Founder · Engineer · Designer" },
      ],
    } as never,
  });
  log.push("✓ about-page overwritten");

  // ------------ Contact page ------------
  await payload.updateGlobal({
    slug: "contact-page",
    data: {
      eyebrow: "Contact",
      title: "Let's talk.",
      description:
        "A real human reads every inquiry — me. Tell me about your project and I'll come back within one business day.",
      newBusinessEmail: "new@pertech.studio",
      studioBlurb: "Remote-first.\nBased in Cameroon, working with clients globally.",
      pressEmail: "press@pertech.studio",
      services: ["Design", "SEO", "Website", "Web app", "Mobile app", "Social media", "Not sure yet"].map(
        (label) => ({ label })
      ),
      // Budgets removed — clients now type their budget freely in the message
      budgets: [],
      submitLabel: "Send inquiry",
      footerNote: "I reply within one business day.",
    } as never,
  });
  log.push("✓ contact-page overwritten");

  // ------------ Services / Portfolio index ------------
  await payload.updateGlobal({
    slug: "services-index-page",
    data: {
      eyebrow: "Services",
      title: "Six disciplines. One studio.",
      description:
        "Senior practitioner work across design, engineering, and growth. Every engagement is owned and shipped end-to-end by one person.",
    } as never,
  });
  log.push("✓ services-index-page overwritten");

  await payload.updateGlobal({
    slug: "portfolio-index-page",
    data: {
      eyebrow: "Work",
      title: "Selected case studies.",
      description:
        "A handful of recent engagements I'm proud to put my name on. More available on request — some work lives behind NDAs.",
    } as never,
  });
  log.push("✓ portfolio-index-page overwritten");

  return NextResponse.json({
    ok: true,
    note: "All page globals force-overwritten with current seed defaults.",
    log,
  });
}
