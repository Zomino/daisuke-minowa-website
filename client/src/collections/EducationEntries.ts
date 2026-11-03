import type { CollectionConfig } from 'payload';

export const EducationEntries: CollectionConfig = {
    slug: 'education-entries',
    labels: {
        singular: { ja: '学歴', en: 'Education' },
        plural: { ja: '学歴', en: 'Education' },
    },
    versions: { drafts: true },
    defaultSort: '-year_from',
    admin: {
        useAsTitle: 'experience_name',
        defaultColumns: ['experience_name', 'year_from', '_status'],
    },
    fields: [
        {
            name: 'experience_name',
            type: 'text',
            required: true,
            label: { ja: '学校名', en: 'Institution' },
        },
        {
            name: 'year_from',
            type: 'number',
            required: true,
            min: 1900, // Guards against typos such as 19911.
            max: 2100,
            label: { ja: '入学年', en: 'From (year)' },
        },
        {
            name: 'year_to',
            type: 'number',
            min: 1900,
            max: 2100,
            label: { ja: '卒業年', en: 'To (year)' },
        },
        {
            name: 'notes',
            type: 'textarea',
            maxLength: 200,
            label: { ja: 'メモ', en: 'Notes' },
        },
    ],
};
