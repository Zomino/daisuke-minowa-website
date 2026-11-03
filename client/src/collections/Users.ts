import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true, // Adds email/password login and the account fields.
    admin: {
        useAsTitle: 'email',
    },
    fields: [],
};
