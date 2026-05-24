import type { GlobalConfig } from "payload";

export const ServicesIndexPage: GlobalConfig = {
  slug: "services-index-page",
  label: "Services Index Page",
  admin: { description: "Editable hero content on /services." },
  access: { read: () => true },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Services" },
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Six disciplines. One studio.",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "We're senior practitioners in design, engineering, and growth. Every engagement is led end-to-end by people who've shipped at scale.",
    },
  ],
};
