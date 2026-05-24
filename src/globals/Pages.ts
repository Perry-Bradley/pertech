import type { Field, GlobalConfig } from "payload";

const seoSubfields: Field[] = [
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
];

const pageGroup = (name: string, label: string): Field => ({
  name,
  type: "group",
  label,
  fields: seoSubfields,
});

/**
 * Per-page SEO overrides for "static" pages that aren't backed by a collection.
 * Service and Project SEO lives on those collections directly.
 */
export const Pages: GlobalConfig = {
  slug: "pages",
  label: "Page SEO",
  admin: {
    description:
      "SEO meta for the static pages (Home, Services, Work, Studio, Contact).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        { label: "Home", fields: [pageGroup("home", "Home page SEO")] },
        { label: "Services", fields: [pageGroup("services", "Services page SEO")] },
        { label: "Work", fields: [pageGroup("portfolio", "Work page SEO")] },
        { label: "Studio", fields: [pageGroup("about", "Studio page SEO")] },
        { label: "Contact", fields: [pageGroup("contact", "Contact page SEO")] },
      ],
    },
  ],
};
