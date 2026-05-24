import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description: "Site-wide defaults — used when a page doesn't override.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand",
          fields: [
            { name: "siteName", type: "text", required: true, defaultValue: "Pertech" },
            {
              name: "tagline",
              type: "text",
              required: true,
              defaultValue: "Digital Studio for Ambitious Brands",
            },
            {
              name: "contactEmail",
              type: "email",
              required: true,
              defaultValue: "hello@pertech.studio",
            },
            {
              name: "availability",
              type: "text",
              defaultValue: "Available · Q3 2026",
              admin: { description: "Shown in navbar badge & footer." },
            },
          ],
        },
        {
          label: "Default SEO",
          fields: [
            {
              name: "defaultTitle",
              type: "text",
              required: true,
              defaultValue: "Pertech — Digital Studio for Ambitious Brands",
            },
            {
              name: "titleTemplate",
              type: "text",
              defaultValue: "%s | Pertech",
              admin: { description: "Use %s to inject page title." },
            },
            {
              name: "defaultDescription",
              type: "textarea",
              required: true,
              defaultValue:
                "Pertech is a design & engineering studio crafting premium websites, web apps, mobile apps, brand identities, and growth-led SEO.",
            },
            {
              name: "defaultKeywords",
              type: "text",
              defaultValue:
                "web design agency, web development, mobile app, SEO, UI UX design",
            },
            {
              name: "defaultOgImage",
              type: "upload",
              relationTo: "media",
              label: "Default social share image (1200×630)",
            },
            {
              name: "siteUrl",
              type: "text",
              required: true,
              defaultValue: "https://pertech.studio",
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "social",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "30%" } },
                    { name: "url", type: "text", required: true, admin: { width: "70%" } },
                  ],
                },
              ],
              defaultValue: [
                { label: "X / Twitter", url: "#" },
                { label: "LinkedIn", url: "#" },
                { label: "Dribbble", url: "#" },
                { label: "Read.cv", url: "#" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
