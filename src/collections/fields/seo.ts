import type { Field } from "payload";

export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: {
    description:
      "Per-page SEO overrides. Leave empty to fall back to site defaults.",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Meta title",
      admin: {
        description: "Browser tab + Google result title. ~50-60 chars works best.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Meta description",
      maxLength: 320,
      admin: {
        description: "Google snippet. Aim for 140-160 chars, write for the click.",
      },
    },
    {
      name: "keywords",
      type: "text",
      label: "Keywords",
      admin: {
        description: "Comma-separated. Low ranking weight but useful for internal tagging.",
      },
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      label: "Social share image (1200×630)",
    },
    {
      name: "noindex",
      type: "checkbox",
      label: "Hide from search engines",
      defaultValue: false,
    },
  ],
};
