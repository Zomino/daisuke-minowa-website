import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: { ja: 'ユーザー', en: 'User' },
        plural: { ja: 'ユーザー', en: 'Users' },
    },
    auth: true, // Adds email/password login and the account fields.
    admin: {
        useAsTitle: 'email',
    },
    fields: [],
};
