import type { CollectionConfig } from "payload";

import { revalidateHome } from "@/collections/revalidateHome";

export const Artworks: CollectionConfig = {
  slug: "artworks",
  hooks: {
    afterChange: [revalidateHome],
    afterDelete: [revalidateHome],
  },
  labels: {
    singular: { ja: "作品", en: "Artwork" },
    plural: { ja: "作品", en: "Artworks" },
  },
  versions: { drafts: true }, // 必須の項目は、公開するときだけ確かめる。
  defaultSort: "-date",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "_status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 200,
      label: { ja: "タイトル", en: "Title" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: { ja: "写真", en: "Image" },
    },
    {
      name: "height_cm",
      type: "number",
      required: true,
      min: 0,
      label: { ja: "縦（cm）", en: "Height (cm)" },
    },
    {
      name: "width_cm",
      type: "number",
      required: true,
      min: 0,
      label: { ja: "横（cm）", en: "Width (cm)" },
    },
    {
      name: "technique",
      type: "text",
      maxLength: 1000,
      label: { ja: "技法", en: "Technique" },
    },
    {
      name: "date",
      type: "date",
      label: { ja: "制作日", en: "Date" },
      admin: {
        // 日だけを選ぶ。タイムゾーンで日付が1日ずれないようにするため。
        date: { pickerAppearance: "dayOnly", displayFormat: "yyyy/MM/dd" },
      },
    },
    {
      name: "description",
      type: "textarea",
      label: { ja: "説明", en: "Description" },
    },
  ],
};
