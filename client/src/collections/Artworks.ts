import type { CollectionConfig } from 'payload';

export const Artworks: CollectionConfig = {
    slug: 'artworks',
    labels: {
        singular: { ja: '作品', en: 'Artwork' },
        plural: { ja: '作品', en: 'Artworks' },
    },
    versions: { drafts: true }, // Required fields are only enforced when publishing.
    defaultSort: '-date',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'date', '_status'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            maxLength: 200,
            label: { ja: 'タイトル', en: 'Title' },
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: { ja: '写真', en: 'Image' },
        },
        {
            name: 'height_cm',
            type: 'number',
            required: true,
            min: 0,
            label: { ja: '縦（cm）', en: 'Height (cm)' },
        },
        {
            name: 'width_cm',
            type: 'number',
            required: true,
            min: 0,
            label: { ja: '横（cm）', en: 'Width (cm)' },
        },
        {
            name: 'technique',
            type: 'text',
            maxLength: 1000,
            label: { ja: '技法', en: 'Technique' },
        },
        {
            name: 'date',
            type: 'date',
            label: { ja: '制作日', en: 'Date' },
            admin: {
                // Pick a day only, so time zones cannot shift the date by one.
                date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy/MM/dd' },
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: { ja: '説明', en: 'Description' },
        },
    ],
};
