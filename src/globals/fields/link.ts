import type { Field } from "payload";

export const linkField = (name: string, label?: string): Field => ({
  name,
  type: "group",
  label: label ?? name,
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true, admin: { width: "60%" } },
        { name: "href", type: "text", required: true, admin: { width: "40%" } },
      ],
    },
  ],
});
