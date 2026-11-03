import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        singular: { ja: '写真', en: 'Image' },
        plural: { ja: '写真', en: 'Images' },
    },
    access: {
        read: () => true, // Site visitors' browsers fetch the image files directly.
    },
    upload: {
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: { ja: '代替テキスト', en: 'Alt text' },
        },
    ],
};
