import type { CollectionConfig } from 'payload';

export const ExhibitionEntries: CollectionConfig = {
    slug: 'exhibition-entries',
    labels: {
        singular: { ja: '展示歴', en: 'Exhibition' },
        plural: { ja: '展示歴', en: 'Exhibitions' },
    },
    versions: { drafts: true },
    defaultSort: '-date_from',
    admin: {
        useAsTitle: 'event_name',
        defaultColumns: ['event_name', 'date_from', '_status'],
    },
    fields: [
        {
            name: 'event_name',
            type: 'text',
            required: true,
            label: { ja: '展示名', en: 'Event name' },
        },
        {
            name: 'date_from',
            type: 'date',
            required: true,
            label: { ja: '開始日', en: 'From' },
            admin: {
                date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy/MM/dd' },
            },
        },
        {
            name: 'date_to',
            type: 'date',
            label: { ja: '終了日', en: 'To' },
            admin: {
                date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy/MM/dd' },
            },
        },
        {
            name: 'location',
            type: 'text',
            label: { ja: '場所', en: 'Location' },
        },
        {
            name: 'notes',
            type: 'textarea',
            maxLength: 200,
            label: { ja: 'メモ', en: 'Notes' },
        },
    ],
};
