import type { CollectionConfig } from "payload";
import { seoField } from "./fields/seo";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["number", "name", "slug", "updatedAt"],
    description: "Service offerings shown across the site.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "number",
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
                  name: "number",
                  type: "text",
                  required: true,
                  admin: { width: "20%", description: "Display order, e.g. 01" },
                },
                {
                  name: "name",
                  type: "text",
                  required: true,
                  admin: { width: "40%" },
                },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  admin: { width: "40%", description: "URL segment, e.g. seo" },
                },
              ],
            },
            {
              name: "icon",
              type: "select",
              required: true,
              defaultValue: "Layers",
              options: [
                { label: "Palette (Design)", value: "Palette" },
                { label: "Search (SEO)", value: "Search" },
                { label: "Globe (Website)", value: "Globe" },
                { label: "Layers (Web App)", value: "Layers" },
                { label: "Smartphone (Mobile)", value: "Smartphone" },
                { label: "Share2 (Social)", value: "Share2" },
                { label: "Pen Tool", value: "PenTool" },
                { label: "Code", value: "Code" },
                { label: "Megaphone", value: "Megaphone" },
                { label: "Sparkles", value: "Sparkles" },
              ],
            },
            {
              name: "short",
              type: "text",
              required: true,
              label: "Short label",
              admin: { description: "1-line teaser, e.g. Brand & product design" },
            },
            {
              name: "tagline",
              type: "text",
              required: true,
              admin: { description: "Punchy hero sentence." },
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: { description: "Full paragraph shown on the service page." },
            },
          ],
        },
        {
          label: "Features",
          fields: [
            {
              name: "features",
              type: "array",
              labels: { singular: "Feature", plural: "Features" },
              minRows: 1,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Process",
          fields: [
            {
              name: "process",
              type: "array",
              labels: { singular: "Step", plural: "Steps" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "step", type: "text", required: true, admin: { width: "20%" } },
                    { name: "title", type: "text", required: true, admin: { width: "80%" } },
                  ],
                },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Deliverables & Pricing",
          fields: [
            {
              name: "deliverables",
              type: "array",
              labels: { singular: "Deliverable", plural: "Deliverables" },
              fields: [{ name: "item", type: "text", required: true }],
            },
            {
              name: "tools",
              type: "array",
              labels: { singular: "Tool", plural: "Tools" },
              fields: [{ name: "name", type: "text", required: true }],
            },
            {
              name: "pricing",
              type: "array",
              labels: { singular: "Tier", plural: "Tiers" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "tier", type: "text", required: true, admin: { width: "40%" } },
                    { name: "price", type: "text", required: true, admin: { width: "30%" } },
                    { name: "for", type: "text", required: true, admin: { width: "30%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "FAQs",
          fields: [
            {
              name: "faqs",
              type: "array",
              labels: { singular: "FAQ", plural: "FAQs" },
              fields: [
                { name: "q", type: "text", required: true, label: "Question" },
                { name: "a", type: "textarea", required: true, label: "Answer" },
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
