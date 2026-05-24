import type { CollectionConfig } from "payload";
import { seoField } from "./fields/seo";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["order", "title", "client", "year", "category"],
    description: "Portfolio case studies.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "order",
                  type: "number",
                  required: true,
                  defaultValue: 0,
                  admin: { width: "20%", description: "Lower = shown first" },
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  admin: { width: "40%" },
                },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  admin: { width: "40%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "client", type: "text", required: true, admin: { width: "33%" } },
                { name: "year", type: "text", required: true, admin: { width: "33%" } },
                { name: "category", type: "text", required: true, admin: { width: "34%" } },
              ],
            },
            {
              name: "services",
              type: "array",
              labels: { singular: "Service", plural: "Services" },
              admin: { description: "Service names to display as tags." },
              fields: [{ name: "name", type: "text", required: true }],
            },
            { name: "summary", type: "textarea", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
        {
          label: "Case study",
          fields: [
            { name: "challenge", type: "textarea", required: true },
            { name: "approach", type: "textarea", required: true },
            { name: "outcome", type: "textarea", required: true },
            {
              name: "metrics",
              type: "array",
              labels: { singular: "Metric", plural: "Metrics" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "60%" } },
                    { name: "value", type: "text", required: true, admin: { width: "40%" } },
                  ],
                },
              ],
            },
            {
              name: "link",
              type: "group",
              admin: { description: "Optional live link." },
              fields: [
                { name: "label", type: "text" },
                { name: "url", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Media",
          fields: [
            {
              name: "cover",
              type: "upload",
              relationTo: "media",
              required: false,
              admin: { description: "Hero image, 16:10 looks best." },
            },
            {
              name: "gallery",
              type: "array",
              labels: { singular: "Image", plural: "Gallery" },
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [seoField],
        },
      ],
    },
  ],
};
