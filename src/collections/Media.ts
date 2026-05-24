import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    description: "Upload images for projects, OG previews, etc. Always add alt text.",
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 480, height: undefined, position: "centre" },
      { name: "card", width: 960, height: undefined, position: "centre" },
      { name: "feature", width: 1600, height: undefined, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt text",
      admin: {
        description: "Describe the image for accessibility & SEO.",
      },
    },
  ],
};
