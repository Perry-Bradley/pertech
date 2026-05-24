import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  admin: { description: "Editable content on /contact." },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "eyebrow", type: "text", defaultValue: "Contact" },
            { name: "title", type: "text", required: true, defaultValue: "Let's talk." },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "A real human reads every inquiry. Tell us about your project — we'll come back within one business day.",
            },
          ],
        },
        {
          label: "Side panel",
          fields: [
            {
              name: "newBusinessEmail",
              type: "email",
              defaultValue: "new@pertech.studio",
            },
            {
              name: "studioBlurb",
              type: "textarea",
              defaultValue: "Remote-first.\nHubs in Lisbon, New York, Singapore.",
              admin: { description: "Newlines preserved." },
            },
            {
              name: "pressEmail",
              type: "email",
              defaultValue: "press@pertech.studio",
            },
          ],
        },
        {
          label: "Form",
          fields: [
            {
              name: "services",
              type: "array",
              labels: { singular: "Service option", plural: "Service options" },
              admin: { description: "Service buttons in the contact form." },
              fields: [{ name: "label", type: "text", required: true }],
            },
            {
              name: "budgets",
              type: "array",
              labels: { singular: "Budget option", plural: "Budget options" },
              fields: [{ name: "label", type: "text", required: true }],
            },
            {
              name: "submitLabel",
              type: "text",
              defaultValue: "Send inquiry",
            },
            {
              name: "footerNote",
              type: "text",
              defaultValue: "We reply within one business day.",
            },
          ],
        },
      ],
    },
  ],
};
