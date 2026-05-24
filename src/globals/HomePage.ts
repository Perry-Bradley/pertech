import type { GlobalConfig } from "payload";
import { linkField } from "./fields/link";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    description: "All editable content on the home page.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroBadge", type: "text", defaultValue: "Available · Q3 2026" },
            {
              name: "heroMeta",
              type: "text",
              label: "Hero meta (right of badge)",
              defaultValue: "Studio of 8 · Remote-first",
            },
            {
              name: "heroWords",
              type: "array",
              labels: { singular: "Word", plural: "Headline words" },
              admin: {
                description:
                  "Each row becomes a stacked line in the hero headline. Tick 'italic' for accent words.",
              },
              minRows: 1,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "text", type: "text", required: true, admin: { width: "70%" } },
                    {
                      name: "italic",
                      type: "checkbox",
                      defaultValue: false,
                      admin: { width: "30%", description: "Render this line in italic muted style" },
                    },
                  ],
                },
              ],
            },
            {
              name: "heroDescription",
              type: "textarea",
              required: true,
              defaultValue:
                "Pertech is a design and engineering studio for brands that refuse to look generic. We build websites, products, mobile apps, and growth systems the way they should have been built the first time.",
            },
            linkField("heroPrimaryCTA", "Primary CTA"),
            linkField("heroSecondaryCTA", "Secondary CTA"),
          ],
        },
        {
          label: "Marquee",
          fields: [
            {
              name: "marqueeEyebrow",
              type: "text",
              defaultValue: "Trusted by founders, operators, and creative directors",
            },
            {
              name: "marqueeClients",
              type: "array",
              labels: { singular: "Client", plural: "Clients" },
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Services section",
          fields: [
            { name: "servicesEyebrow", type: "text", defaultValue: "Services" },
            {
              name: "servicesTitleLineOne",
              type: "text",
              defaultValue: "Six disciplines.",
            },
            {
              name: "servicesTitleLineTwo",
              type: "text",
              defaultValue: "One studio.",
              admin: { description: "Rendered in italic muted style" },
            },
            {
              name: "servicesDescription",
              type: "textarea",
              defaultValue:
                "We don't subcontract the work that matters. Every service is owned by senior practitioners who've shipped at scale.",
            },
          ],
        },
        {
          label: "Portfolio section",
          fields: [
            { name: "portfolioEyebrow", type: "text", defaultValue: "Selected work" },
            {
              name: "portfolioTitleLineOne",
              type: "text",
              defaultValue: "Recent case studies",
            },
            {
              name: "portfolioTitleLineTwo",
              type: "text",
              defaultValue: "from the studio.",
              admin: { description: "Rendered in italic muted style" },
            },
          ],
        },
        {
          label: "About strip",
          fields: [
            { name: "aboutEyebrow", type: "text", defaultValue: "About the studio" },
            {
              name: "aboutBody",
              type: "textarea",
              defaultValue:
                "We're eight humans who've spent the last decade quietly shipping products you've probably used. We started Pertech because the work we wanted to make didn't exist at the agencies we'd worked at.",
            },
          ],
        },
        {
          label: "Process",
          fields: [
            { name: "processEyebrow", type: "text", defaultValue: "How we work" },
            {
              name: "processTitleLineOne",
              type: "text",
              defaultValue: "A studio process,",
            },
            {
              name: "processTitleLineTwo",
              type: "text",
              defaultValue: "not an agency one.",
            },
            {
              name: "processDescription",
              type: "textarea",
              defaultValue:
                "We collaborate the way the best in-house teams do — with high context, weekly working sessions, and shared definitions of done.",
            },
            {
              name: "processSteps",
              type: "array",
              labels: { singular: "Step", plural: "Process steps" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "step", type: "text", required: true, admin: { width: "20%" } },
                    { name: "title", type: "text", required: true, admin: { width: "80%" } },
                  ],
                },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "stats",
              type: "array",
              labels: { singular: "Stat", plural: "Stats" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", required: true, admin: { width: "40%", description: "Counter ends at this number" } },
                    { name: "suffix", type: "text", required: true, admin: { width: "20%", description: "e.g. + or %" } },
                    { name: "label", type: "text", required: true, admin: { width: "40%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Testimonials",
          fields: [
            { name: "testimonialsEyebrow", type: "text", defaultValue: "What clients say" },
            {
              name: "testimonialsTitleLineOne",
              type: "text",
              defaultValue: "Words from",
            },
            {
              name: "testimonialsTitleLineTwo",
              type: "text",
              defaultValue: "the people we shipped with.",
            },
            {
              name: "testimonials",
              type: "array",
              labels: { singular: "Testimonial", plural: "Testimonials" },
              fields: [
                { name: "quote", type: "textarea", required: true },
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "50%" } },
                    { name: "role", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "CTA",
          fields: [
            { name: "ctaBadge", type: "text", defaultValue: "Now booking · Q3 2026" },
            {
              name: "ctaTitleLineOne",
              type: "text",
              defaultValue: "Let's build",
            },
            {
              name: "ctaTitleLineTwo",
              type: "text",
              defaultValue: "something rare.",
            },
            {
              name: "ctaDescription",
              type: "textarea",
              defaultValue:
                "We take on a handful of new partnerships each quarter. If you're building something ambitious, we'd love to hear about it.",
            },
            linkField("ctaPrimary", "Primary button"),
          ],
        },
      ],
    },
  ],
};
