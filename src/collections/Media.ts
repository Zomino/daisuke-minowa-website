import { APIError, type CollectionBeforeDeleteHook, type CollectionConfig } from "payload";

import { revalidateHome } from "@/collections/revalidateHome";

/**
 * 作品（公開中か最新の下書き）で使われている写真は、削除できないようにする。
 * 削除できると、公開中の作品に写真がなくなり、表示も非公開にもできなくなるため。
 */
const preventDeletingImagesInUse: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const [published, drafts] = await Promise.all([
    req.payload.count({
      collection: "artworks",
      where: { image: { equals: id }, _status: { equals: "published" } },
      req,
    }),
    // count() は下書きを読めないので、find() に draft: true を付けて最新の版を確かめる。
    req.payload.find({
      collection: "artworks",
      where: { image: { equals: id } },
      draft: true,
      limit: 1,
      depth: 0,
      req,
    }),
  ]);
  if (published.totalDocs > 0 || drafts.totalDocs > 0) {
    throw new APIError(
      "この写真は作品で使われているため削除できません。先に作品の写真を変更してください。",
      400,
      undefined,
      true,
    );
  }
};

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    afterChange: [revalidateHome],
    afterDelete: [revalidateHome],
    beforeDelete: [preventDeletingImagesInUse],
  },
  labels: {
    singular: { ja: "写真", en: "Image" },
    plural: { ja: "写真", en: "Images" },
  },
  access: {
    read: () => true, // サイトを見る人のブラウザが、写真のファイルを直接取りに来るため。
  },
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      {
        name: "display",
        width: 4000,
        height: 4000,
        fit: "inside",
        withoutEnlargement: true,
        formatOptions: { format: "jpeg", options: { quality: 90 } },
      },
      {
        name: "thumb",
        width: 32,
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: { ja: "代替テキスト", en: "Alt text" },
    },
  ],
};
