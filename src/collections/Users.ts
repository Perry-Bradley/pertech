import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    description: "Admin users who can edit site content.",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
