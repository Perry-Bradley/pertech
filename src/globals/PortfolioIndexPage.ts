import type { GlobalConfig } from "payload";

export const PortfolioIndexPage: GlobalConfig = {
  slug: "portfolio-index-page",
  label: "Work Index Page",
  admin: { description: "Editable hero content on /portfolio." },
  access: { read: () => true },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Work" },
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Selected case studies.",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "A handful of recent engagements we're proud to put our name on. More available on request — some work lives behind NDAs.",
    },
  ],
};
