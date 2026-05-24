import {
  Palette,
  Search,
  Globe,
  Layers,
  Smartphone,
  Share2,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  number: string;
  features: { title: string; description: string }[];
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { q: string; a: string }[];
  tools: string[];
  pricing: { tier: string; price: string; for: string }[];
};

export const services: Service[] = [
  {
    slug: "design",
    name: "Design",
    short: "Brand & product design",
    tagline: "Identity systems and product UI built for distinction.",
    description:
      "We craft visual languages and interfaces that feel inevitable — typography, motion, color, and detail tuned until every pixel earns its place. From a fresh identity to a complete design system, we partner with founders and product teams to ship work that looks decades ahead of the competition.",
    icon: Palette,
    number: "01",
    features: [
      {
        title: "Brand identity systems",
        description:
          "Logos, marks, typography, color, voice, and motion principles — a complete visual operating system.",
      },
      {
        title: "Product & UI design",
        description:
          "Pixel-precise interfaces for web and mobile, validated against your users and your engineering reality.",
      },
      {
        title: "Design systems",
        description:
          "Tokens, components, and documentation in Figma so your team can ship 10× faster without losing craft.",
      },
      {
        title: "Motion & micro-interactions",
        description:
          "Movement that guides attention and adds personality — never decoration for its own sake.",
      },
    ],
    deliverables: [
      "Brand guidelines (PDF + Figma)",
      "Logo system & marks",
      "Typography & color tokens",
      "Component library",
      "High-fidelity prototypes",
      "Motion specifications",
    ],
    process: [
      {
        step: "01",
        title: "Discover",
        description:
          "Stakeholder interviews, competitor audits, and a positioning workshop to ground the work in strategy.",
      },
      {
        step: "02",
        title: "Direction",
        description:
          "Two or three distinct creative territories explored in parallel, with rationale you can defend.",
      },
      {
        step: "03",
        title: "Design",
        description:
          "Selected direction matures into a full identity or product UI, refined through weekly working sessions.",
      },
      {
        step: "04",
        title: "Deliver",
        description:
          "Tokens, components, and guidelines handed off — plus office hours while your team rolls it out.",
      },
    ],
    faqs: [
      {
        q: "How long does a brand identity take?",
        a: "A focused identity engagement typically runs 4–6 weeks. A full system with product UI is closer to 8–12.",
      },
      {
        q: "Do you work with in-house design teams?",
        a: "Yes. Many of our engagements are with companies that already have designers — we drop in as a senior force multiplier.",
      },
      {
        q: "Can we just hire you for a single screen?",
        a: "We can, but we usually push back and ask why. Single screens almost always reveal system-level questions worth answering.",
      },
    ],
    tools: ["Figma", "Framer", "After Effects", "Rive", "Spline"],
    pricing: [
      { tier: "Identity Sprint", price: "from $9k", for: "Founders & seed-stage startups" },
      { tier: "Brand + Product", price: "from $24k", for: "Funded teams shipping a flagship product" },
      { tier: "Embedded design", price: "from $14k / mo", for: "Companies needing ongoing senior craft" },
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "Growth-led SEO",
    tagline: "Compounding organic traffic, engineered.",
    description:
      "Most SEO is content theater. Ours is a measured engineering discipline — technical audits, intent-mapped content systems, and on-page craft that move ranked keywords from page three to position one. We focus on revenue-adjacent terms, not vanity volume.",
    icon: Search,
    number: "02",
    features: [
      {
        title: "Technical SEO audits",
        description:
          "Core Web Vitals, crawl budget, indexation, schema, internal linking — the full forensic report.",
      },
      {
        title: "Keyword & intent mapping",
        description:
          "Cluster topics by buying intent, then map them to a content architecture that actually converts.",
      },
      {
        title: "Programmatic & content SEO",
        description:
          "From editorial pieces to programmatic templates — scalable systems for sites that need to grow fast.",
      },
      {
        title: "Authority building",
        description:
          "Digital PR, partnerships, and earned links from outlets that move the needle in your category.",
      },
    ],
    deliverables: [
      "Technical audit report",
      "Keyword strategy & content briefs",
      "Schema & metadata implementation",
      "Monthly performance dashboards",
      "Link acquisition reporting",
      "Conversion-optimized landing pages",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Two-week deep dive across tech, content, links, and competitors. Findings prioritized by impact and effort.",
      },
      {
        step: "02",
        title: "Strategy",
        description:
          "A 90-day roadmap with named owners, measurable KPIs, and a clear definition of done.",
      },
      {
        step: "03",
        title: "Execute",
        description:
          "Implementation across engineering, content, and outreach — driven by us, reviewed weekly with you.",
      },
      {
        step: "04",
        title: "Scale",
        description:
          "What works gets doubled down on. What doesn't gets cut. Compounding wins, not vanity reports.",
      },
    ],
    faqs: [
      {
        q: "When will I see results?",
        a: "Technical wins ship in week one. Content typically starts ranking in 3–6 months. We're transparent about timelines from day one.",
      },
      {
        q: "Do you do link building?",
        a: "Yes — through digital PR, partnerships, and earned media. We don't do link farms or anything that puts your domain at risk.",
      },
      {
        q: "Can you guarantee #1 rankings?",
        a: "No one can, and anyone who claims to is lying. We can guarantee a measurable, defensible process and honest reporting.",
      },
    ],
    tools: ["Ahrefs", "Semrush", "Search Console", "Looker Studio", "Screaming Frog"],
    pricing: [
      { tier: "Audit & roadmap", price: "from $6k", for: "One-off forensic and 90-day plan" },
      { tier: "Growth retainer", price: "from $7k / mo", for: "Ongoing strategy + execution" },
      { tier: "Enterprise SEO", price: "custom", for: "Programmatic and large content systems" },
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    short: "Marketing sites that convert",
    tagline: "Fast, accessible, beautiful marketing sites.",
    description:
      "Marketing websites that load in under a second, look unmistakably premium, and convert. We build on Next.js, Astro, or your CMS of choice — engineered for editor friendliness, search engines, and a perfect Lighthouse score.",
    icon: Globe,
    number: "03",
    features: [
      {
        title: "Headless CMS architecture",
        description:
          "Your content team gets a beautiful editing experience; your dev team gets full control over the front-end.",
      },
      {
        title: "Performance-first builds",
        description:
          "Sub-second LCP, perfect CWV scores, edge rendering — speed is a feature we ship by default.",
      },
      {
        title: "Accessibility & i18n",
        description:
          "WCAG 2.2 AA compliance and multi-locale architecture baked in, not bolted on.",
      },
      {
        title: "Analytics & experimentation",
        description:
          "Privacy-first analytics, server-side tracking, and a/b testing wired in from launch.",
      },
    ],
    deliverables: [
      "Next.js / Astro codebase",
      "Sanity / Contentful / Payload CMS",
      "Animation library",
      "CI/CD on Vercel or Cloudflare",
      "Analytics & event taxonomy",
      "Editor documentation & training",
    ],
    process: [
      {
        step: "01",
        title: "Architect",
        description:
          "Sitemap, content model, and tech stack decisions made together with named tradeoffs.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "High-fidelity pages designed in parallel with component-level systems for long-term scale.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Two-week sprints with previews on every PR. You see the site evolve every Friday.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Migration, redirects, performance budgets, and a post-launch sprint to fix what only real traffic reveals.",
      },
    ],
    faqs: [
      {
        q: "What's a typical timeline?",
        a: "A focused marketing site lands in 6–10 weeks. Larger sites with complex CMS work go 12–16.",
      },
      {
        q: "Do you handle hosting?",
        a: "We deploy to Vercel, Cloudflare, or your existing infrastructure. We don't lock you into anything.",
      },
      {
        q: "Can you work with our brand?",
        a: "Absolutely. We can lean on your existing brand or evolve it — both are normal starting points.",
      },
    ],
    tools: ["Next.js", "Astro", "Sanity", "Payload", "Vercel", "Cloudflare"],
    pricing: [
      { tier: "Launchpad", price: "from $14k", for: "5–8 page marketing site" },
      { tier: "Scale site", price: "from $38k", for: "20+ pages, CMS, animation system" },
      { tier: "Enterprise web", price: "custom", for: "Multi-locale, multi-region, large CMS" },
    ],
  },
  {
    slug: "web-app-development",
    name: "Web App Development",
    short: "Production-grade SaaS",
    tagline: "Web products engineered for scale.",
    description:
      "From zero-to-one MVPs to mature SaaS rebuilds, we ship web applications that hold up under real users. Type-safe end-to-end, observable in production, and architected so the next engineer joining your team thanks you.",
    icon: Layers,
    number: "04",
    features: [
      {
        title: "Full-stack TypeScript",
        description:
          "Next.js, tRPC or GraphQL, Prisma/Drizzle — one language, end-to-end type safety, zero context switching.",
      },
      {
        title: "Auth, billing, multi-tenancy",
        description:
          "The hard parts done right the first time. Stripe, organizations, RBAC, audit logs — all sane defaults.",
      },
      {
        title: "Observability built-in",
        description:
          "Logs, traces, metrics, and error budgets from day one. You'll know about problems before your users do.",
      },
      {
        title: "AI features that ship",
        description:
          "Streaming, tool use, RAG, evals — modern AI patterns implemented with the same rigor as the rest of your stack.",
      },
    ],
    deliverables: [
      "Production codebase (TypeScript)",
      "Postgres / SQLite schema & migrations",
      "Auth & billing system",
      "Admin dashboard",
      "CI/CD + preview environments",
      "Runbooks & onboarding docs",
    ],
    process: [
      {
        step: "01",
        title: "Define",
        description:
          "Product discovery, user flows, data model — alignment before code is the cheapest insurance you can buy.",
      },
      {
        step: "02",
        title: "Prototype",
        description:
          "Clickable prototype + thin vertical slice in production within three weeks. Risk killed early.",
      },
      {
        step: "03",
        title: "Ship",
        description:
          "Two-week sprints, demoed end-to-end. Production-ready code, not 'works on my machine'.",
      },
      {
        step: "04",
        title: "Handover",
        description:
          "Documentation, training, and a paid 30-day support window so your team can take the wheel.",
      },
    ],
    faqs: [
      {
        q: "Do you build greenfield or join existing teams?",
        a: "Both. We've built MVPs from scratch and joined teams of 30+ engineers to lead a redesign or rebuild.",
      },
      {
        q: "What about AI features?",
        a: "We've shipped production AI features (RAG, agents, evals) for both startups and enterprise. We treat AI like any other system — observable, tested, and grounded in real user value.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Always. We write code in your repo, in your style, with your conventions.",
      },
    ],
    tools: ["Next.js", "tRPC", "Prisma", "Postgres", "Stripe", "Clerk", "Vercel"],
    pricing: [
      { tier: "MVP sprint", price: "from $40k", for: "8–10 week MVP to first paying customer" },
      { tier: "Product build", price: "from $90k", for: "Full v1 across 3–4 months" },
      { tier: "Embedded squad", price: "from $28k / mo", for: "Senior team augmentation" },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    short: "iOS & Android apps",
    tagline: "Native-quality apps, one codebase.",
    description:
      "Cross-platform mobile applications built with React Native and Expo — fast enough to feel native, productive enough to ship in months instead of years. Or fully native when the use case demands it.",
    icon: Smartphone,
    number: "05",
    features: [
      {
        title: "Expo & React Native",
        description:
          "One codebase, two platforms, near-native performance. OTA updates and EAS Build wired in from day one.",
      },
      {
        title: "Native modules when needed",
        description:
          "Camera, BLE, payments, AR — we'll drop into Swift or Kotlin when the platform demands it.",
      },
      {
        title: "Offline-first sync",
        description:
          "Apps that work on the subway. Optimistic UI, conflict resolution, and bullet-proof sync engines.",
      },
      {
        title: "App Store launch",
        description:
          "Store listings, screenshots, review responses, and the launch-day runbook. We don't disappear at submission.",
      },
    ],
    deliverables: [
      "iOS & Android binaries",
      "Expo / EAS configuration",
      "Backend API",
      "App Store + Play Store listings",
      "Push notification system",
      "Crash reporting & analytics",
    ],
    process: [
      {
        step: "01",
        title: "Scope",
        description:
          "Hard prioritization to find the v1 that's both shippable and worth shipping.",
      },
      {
        step: "02",
        title: "Design",
        description:
          "Native UI patterns per platform — iOS and Android users get apps that feel right at home.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "TestFlight & internal builds from week two. Weekly hands-on testing with you and your team.",
      },
      {
        step: "04",
        title: "Launch",
        description:
          "Store submission, marketing assets, and post-launch iteration plan from real user feedback.",
      },
    ],
    faqs: [
      {
        q: "React Native or fully native?",
        a: "React Native + Expo for 95% of products — it's faster, cheaper, and indistinguishable for users. Fully native when the use case justifies it.",
      },
      {
        q: "Do you handle App Store submission?",
        a: "Yes — including reviewer responses and rejection appeals. We've shipped 40+ apps; the playbook is well-worn.",
      },
      {
        q: "Can you build a backend too?",
        a: "Absolutely. Most mobile engagements include a Postgres-backed API. We can also integrate with Firebase or your existing backend.",
      },
    ],
    tools: ["Expo", "React Native", "Swift", "Kotlin", "Supabase", "Firebase"],
    pricing: [
      { tier: "MVP app", price: "from $35k", for: "Single-platform MVP, 6–8 weeks" },
      { tier: "Cross-platform v1", price: "from $80k", for: "iOS + Android, 12–16 weeks" },
      { tier: "Long-term partnership", price: "from $24k / mo", for: "Ongoing product & engineering" },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media",
    short: "SMM & content systems",
    tagline: "Brand-led social that compounds, not posts that vanish.",
    description:
      "We run social media the way we run product: with a strategy, a system, and a feedback loop. Brand-consistent content, daily community management, and creative that actually earns the algorithm — built around your audience and your category, not generic playbooks.",
    icon: Share2,
    number: "06",
    features: [
      {
        title: "Content strategy & pillars",
        description:
          "Audience research, message house, content pillars, and a 90-day editorial calendar grounded in business goals.",
      },
      {
        title: "Creative production",
        description:
          "Static, motion, and short-form video produced in-house — designed for retention, not just impressions.",
      },
      {
        title: "Community management",
        description:
          "Daily monitoring, replies in your voice, DMs handled. We treat every comment as a brand surface.",
      },
      {
        title: "Paid social & creator partnerships",
        description:
          "Performance creative tested at low spend, scaled when it earns it. Plus thoughtful creator collaborations.",
      },
    ],
    deliverables: [
      "Channel strategy & content pillars",
      "Monthly content calendar",
      "Static + motion creative library",
      "Community management SLAs",
      "Paid campaign creative & reports",
      "Quarterly performance review",
    ],
    process: [
      {
        step: "01",
        title: "Listen",
        description:
          "Audience interviews, competitor teardown, and a brand voice workshop so the content reads unmistakably like you.",
      },
      {
        step: "02",
        title: "Plan",
        description:
          "A content calendar, channel mix, and quarterly bets — with KPIs that ladder up to actual business outcomes.",
      },
      {
        step: "03",
        title: "Produce",
        description:
          "Monthly creative sprints. Static, video, motion — all in the brand system, all reviewed before it ships.",
      },
      {
        step: "04",
        title: "Optimize",
        description:
          "Weekly reporting. What works gets doubled down on. What doesn't gets cut. No vanity dashboards.",
      },
    ],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "Instagram, TikTok, LinkedIn, X, YouTube Shorts, and Threads — typically a focused mix of 2–3 per client based on where your audience actually lives.",
      },
      {
        q: "Do you produce video?",
        a: "Yes — short-form vertical video is the bulk of what we make. Editing, motion, captions, hooks, sound design — all in-house.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Absolutely. We can extend your existing system or evolve it. Many clients hire us in part to bring rigor and craft to a brand that drifted on social.",
      },
    ],
    tools: ["Figma", "Premiere", "After Effects", "Notion", "Meta Ads", "Linear"],
    pricing: [
      { tier: "Channel sprint", price: "from $5k", for: "Single channel, 90-day pilot" },
      { tier: "Always-on retainer", price: "from $9k / mo", for: "Multi-channel strategy + production" },
      { tier: "Embedded social squad", price: "from $18k / mo", for: "Full team for fast-moving brands" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
