export type Project = {
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
  thumbnail: string;
  gallery: string[];
  metrics: { label: string; value: string }[];
  link?: { label: string; url: string };
};

const placeholder = (label: string, bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
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
  )}`;

export const projects: Project[] = [
  {
    slug: "luma-finance",
    title: "Luma Finance",
    client: "Luma",
    year: "2025",
    category: "Web App",
    services: ["Design", "Web App Development"],
    summary:
      "Redesigning a wealth platform for the next generation of investors.",
    description:
      "Luma asked us to take their legacy wealth-management platform and rebuild it for an audience that grew up on apps, not bank statements. We rebuilt the product end-to-end — from brand to onboarding to the trading interface.",
    challenge:
      "A 12-year-old codebase with a confusing IA, brutal load times, and a brand that read more 'bank' than 'product'. New users were churning in onboarding.",
    approach:
      "Stripped the IA to its essentials, redesigned the brand with a quieter, more confident tone, and rebuilt the front-end on Next.js with server actions and edge rendering.",
    outcome:
      "Onboarding completion up 64%. Time-to-first-trade reduced from 11 minutes to under 90 seconds. Day-30 retention up 38%.",
    cover: placeholder("Luma Finance", "#0a0a0a", "#e5e5e5"),
    thumbnail: placeholder("Luma", "#0a0a0a", "#d4d4d4"),
    gallery: [
      placeholder("Dashboard", "#111111", "#fafafa"),
      placeholder("Portfolio view", "#1a1a1a", "#e5e5e5"),
      placeholder("Trade modal", "#0a0a0a", "#fafafa"),
      placeholder("Mobile flow", "#171717", "#d4d4d4"),
    ],
    metrics: [
      { label: "Onboarding completion", value: "+64%" },
      { label: "Time to first trade", value: "-87%" },
      { label: "Day-30 retention", value: "+38%" },
    ],
    link: { label: "luma.finance", url: "#" },
  },
  {
    slug: "atlas-cms",
    title: "Atlas CMS",
    client: "Atlas",
    year: "2025",
    category: "SaaS",
    services: ["Design", "Web App Development", "SEO"],
    summary:
      "Headless CMS for editorial teams who refuse to suffer JSON.",
    description:
      "Atlas is a headless CMS reimagined around the editor, not the developer. We designed and built the product, the marketing site, and the entire growth motion.",
    challenge:
      "A category dominated by developer-first products with editor experiences that range from clunky to actively hostile.",
    approach:
      "Designed a real WYSIWYG that respects component structure, paired with a developer SDK that's still a delight. Marketing site built for SEO compounding from launch.",
    outcome:
      "From 0 to 4,200 self-serve sign-ups in 90 days. Organic traffic now drives 62% of new signups.",
    cover: placeholder("Atlas CMS", "#171717", "#fafafa"),
    thumbnail: placeholder("Atlas", "#1a1a1a", "#e5e5e5"),
    gallery: [
      placeholder("Editor", "#0a0a0a", "#fafafa"),
      placeholder("Schema builder", "#202020", "#d4d4d4"),
      placeholder("API explorer", "#0a0a0a", "#fafafa"),
    ],
    metrics: [
      { label: "Sign-ups in 90 days", value: "4,200" },
      { label: "Organic share of new users", value: "62%" },
      { label: "Time-to-publish", value: "-71%" },
    ],
    link: { label: "atlas.cms", url: "#" },
  },
  {
    slug: "monolith-studio",
    title: "Monolith",
    client: "Monolith Studio",
    year: "2024",
    category: "Brand",
    services: ["Design"],
    summary:
      "A full identity system for a brutalist architecture practice.",
    description:
      "Monolith is a four-person architecture studio in Lisbon working on quietly radical residential and cultural projects. We rebuilt their identity from the ground up.",
    challenge:
      "Strong opinions, scarce assets, and a generic website that read like every other architecture firm online.",
    approach:
      "A custom display typeface, a deliberately minimal color palette, and a website where photography of the work does the talking.",
    outcome:
      "Three new commercial commissions in the first six months post-launch. Featured in Sight Unseen and Wallpaper*.",
    cover: placeholder("Monolith", "#fafafa", "#0a0a0a"),
    thumbnail: placeholder("Monolith", "#fafafa", "#171717"),
    gallery: [
      placeholder("Identity", "#fafafa", "#0a0a0a"),
      placeholder("Stationery", "#e5e5e5", "#171717"),
      placeholder("Web", "#fafafa", "#0a0a0a"),
    ],
    metrics: [
      { label: "Inbound briefs", value: "+220%" },
      { label: "Press features", value: "8" },
      { label: "Brand audit score", value: "94/100" },
    ],
  },
  {
    slug: "northwind-mobile",
    title: "Northwind",
    client: "Northwind Outdoor",
    year: "2024",
    category: "Mobile App",
    services: ["Design", "Mobile App Development"],
    summary:
      "Trail navigation app with offline-first sync for backcountry runners.",
    description:
      "Built for runners and hikers who go where cell service doesn't. Topographic maps, offline routes, and a community layer that doesn't feel like a feed.",
    challenge:
      "Reliable offline behavior, low battery overhead, and a UI that works with gloves on while moving.",
    approach:
      "Custom map tile pipeline, an offline-first sync engine on top of SQLite, and a UI tuned for one-handed use at pace.",
    outcome:
      "4.9★ on the App Store. 180k MAU within six months of launch. Featured by Apple in 'Apps We Love'.",
    cover: placeholder("Northwind", "#0a0a0a", "#fafafa"),
    thumbnail: placeholder("Northwind", "#0a0a0a", "#e5e5e5"),
    gallery: [
      placeholder("Map view", "#171717", "#fafafa"),
      placeholder("Route detail", "#0a0a0a", "#fafafa"),
      placeholder("Activity feed", "#1a1a1a", "#d4d4d4"),
    ],
    metrics: [
      { label: "App Store rating", value: "4.9★" },
      { label: "MAU at 6 months", value: "180k" },
      { label: "Crash-free sessions", value: "99.92%" },
    ],
    link: { label: "northwind.app", url: "#" },
  },
  {
    slug: "vela-ecommerce",
    title: "Vela",
    client: "Vela Apparel",
    year: "2025",
    category: "E-commerce",
    services: ["Design", "Website Development", "SEO"],
    summary:
      "A quietly luxurious storefront for a Tokyo-based menswear label.",
    description:
      "Vela's previous storefront looked like every Shopify template. We rebuilt it as a slow, deliberate, photography-driven experience — and the conversion rate doubled.",
    challenge:
      "Premium price point, premium product, and a digital store that didn't reflect either.",
    approach:
      "Custom storefront on Next.js + Shopify, a paced editorial layout, and a checkout we obsessively performance-tuned.",
    outcome:
      "Conversion rate up 2.1×. AOV up 34%. Time-on-site doubled.",
    cover: placeholder("Vela", "#0a0a0a", "#d4d4d4"),
    thumbnail: placeholder("Vela", "#171717", "#e5e5e5"),
    gallery: [
      placeholder("Homepage", "#0a0a0a", "#fafafa"),
      placeholder("Product detail", "#111", "#e5e5e5"),
      placeholder("Lookbook", "#1a1a1a", "#d4d4d4"),
    ],
    metrics: [
      { label: "Conversion rate", value: "2.1×" },
      { label: "Average order value", value: "+34%" },
      { label: "Largest Contentful Paint", value: "0.8s" },
    ],
    link: { label: "vela.studio", url: "#" },
  },
  {
    slug: "halo-search",
    title: "Halo",
    client: "Halo AI",
    year: "2025",
    category: "AI Product",
    services: ["Design", "Web App Development"],
    summary:
      "A research-grade AI assistant for biotech teams.",
    description:
      "Halo helps researchers query and reason over millions of biomedical papers. We designed the product and built the v1 in 14 weeks.",
    challenge:
      "AI products that look like ChatGPT clones don't earn enterprise budget. The interface had to feel like a serious research tool.",
    approach:
      "A spatial interface anchored on citations and provenance, with streaming agents under the hood. Every claim is traceable to a source.",
    outcome:
      "Closed $4.1M seed two months after launch. Three of the top-10 pharma companies in pilot.",
    cover: placeholder("Halo AI", "#0a0a0a", "#fafafa"),
    thumbnail: placeholder("Halo", "#0a0a0a", "#e5e5e5"),
    gallery: [
      placeholder("Research canvas", "#0a0a0a", "#fafafa"),
      placeholder("Citation view", "#111", "#e5e5e5"),
      placeholder("Workspace", "#171717", "#fafafa"),
    ],
    metrics: [
      { label: "Seed raised post-launch", value: "$4.1M" },
      { label: "Enterprise pilots", value: "3 of top 10" },
      { label: "Median response latency", value: "1.4s" },
    ],
    link: { label: "halo.ai", url: "#" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
