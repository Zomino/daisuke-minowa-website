import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: { ja: 'ユーザー', en: 'User' },
        plural: { ja: 'ユーザー', en: 'Users' },
    },
    auth: true, // Adds email/password login and the account fields.
    // Only admins can change users; editors manage content only.
    access: {
        create: ({ req }) => req.user?.role === 'admin',
        // Editors can read themselves so the account page loads.
        read: ({ req }) => req.user?.role === 'admin' || { id: { equals: req.user?.id } },
        update: ({ req }) => req.user?.role === 'admin',
        delete: ({ req }) => req.user?.role === 'admin',
    },
    admin: {
        useAsTitle: 'email',
        hidden: ({ user }) => user?.role !== 'admin',
    },
    fields: [
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'editor',
            options: [
                { value: 'admin', label: { ja: '管理者', en: 'Admin' } },
                { value: 'editor', label: { ja: '編集者', en: 'Editor' } },
            ],
            label: { ja: '役割', en: 'Role' },
        },
    ],
};
