import type { CollectionConfig } from 'payload';

import { revalidateHome } from './utils';

export const Media: CollectionConfig = {
    slug: 'media',
    hooks: {
        afterChange: [revalidateHome],
        afterDelete: [revalidateHome],
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
