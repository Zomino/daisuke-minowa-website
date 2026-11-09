import { APIError, type CollectionConfig } from 'payload';

import { revalidateHome } from './utils';

export const Media: CollectionConfig = {
    slug: 'media',
    hooks: {
        afterChange: [revalidateHome],
        afterDelete: [revalidateHome],
        beforeDelete: [
            // Deleting an image in use would leave a published artwork without one, which can then
            // neither be shown nor unpublished. Check both published and draft versions.
            async ({ id, req }) => {
                const [published, drafts] = await Promise.all([
                    req.payload.count({
                        collection: 'artworks',
                        where: { image: { equals: id }, _status: { equals: 'published' } },
                        req,
                    }),
                    // count() cannot read drafts; find() with draft: true checks the latest version.
                    req.payload.find({
                        collection: 'artworks',
                        where: { image: { equals: id } },
                        draft: true,
                        limit: 1,
                        depth: 0,
                        req,
                    }),
                ]);
                if (published.totalDocs > 0 || drafts.totalDocs > 0) {
                    throw new APIError(
                        'この写真は作品で使われているため削除できません。先に作品の写真を変更してください。',
                        400,
                        undefined,
                        true
                    );
                }
            },
        ],
    },
    labels: {
        singular: { ja: '写真', en: 'Image' },
        plural: { ja: '写真', en: 'Images' },
    },
    access: {
        read: () => true, // Site visitors' browsers fetch the image files directly.
    },
    upload: {
        mimeTypes: ['image/*'],
        imageSizes: [
            {
                name: 'display',
                width: 4000,
                height: 4000,
                fit: 'inside',
                withoutEnlargement: true,
                formatOptions: { format: 'jpeg', options: { quality: 90 } },
            },
            {
                name: 'thumb',
                width: 32,
            },
        ],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: { ja: '代替テキスト', en: 'Alt text' },
        },
    ],
};
