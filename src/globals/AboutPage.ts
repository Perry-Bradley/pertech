import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Studio (About) Page",
  admin: { description: "Editable content on /about." },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "Studio" },
            { name: "title", type: "text", required: true, defaultValue: "A small studio with senior taste." },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "Eight humans, twelve time zones over the last decade, and a shared belief that craft is not optional.",
            },
          ],
        },
        {
          label: "Intro",
          fields: [
            {
              name: "intro",
              type: "textarea",
              defaultValue:
                "We started Pertech in 2021 because the work we wanted to make didn't exist at the agencies we'd worked at. Today we're a small remote-first studio partnering with founders and product leaders to ship rare, durable, opinionated work.",
            },
          ],
        },
        {
          label: "Principles",
          fields: [
            { name: "principlesEyebrow", type: "text", defaultValue: "Principles" },
            { name: "principlesTitle", type: "text", defaultValue: "What we believe." },
            {
              name: "principles",
              type: "array",
              labels: { singular: "Principle", plural: "Principles" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "number", type: "text", required: true, admin: { width: "20%" } },
                    { name: "title", type: "text", required: true, admin: { width: "80%" } },
                  ],
                },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Team",
          fields: [
            { name: "teamEyebrow", type: "text", defaultValue: "The team" },
            { name: "teamTitle", type: "text", defaultValue: "Eight people doing the work." },
            {
              name: "team",
              type: "array",
              labels: { singular: "Member", plural: "Team" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "50%" } },
                    { name: "role", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "Optional. Falls back to a stylized initial if empty." },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
