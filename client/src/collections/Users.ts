import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
    slug: 'users',
    labels: {
        singular: { ja: 'ユーザー', en: 'User' },
        plural: { ja: 'ユーザー', en: 'Users' },
    },
    auth: true, // メールとパスワードのログインと、アカウントの項目を足す。
    // ユーザーを管理できるのは管理者だけ。編集者は、自分の情報を見ることと、自分のパスワードを変えることだけができる。
    access: {
        create: ({ req }) => req.user?.role === 'admin',
        // アカウントのページを開けるよう、編集者は自分の情報を読める。
        read: ({ req }) => req.user?.role === 'admin' || { id: { equals: req.user?.id } },
        update: ({ req }) => req.user?.role === 'admin' || { id: { equals: req.user?.id } },
        delete: ({ req }) => req.user?.role === 'admin',
        unlock: ({ req }) => req.user?.role === 'admin',
    },
    admin: {
        useAsTitle: 'email',
        hidden: ({ user }) => user?.role !== 'admin',
    },
    fields: [
        // Payload に最初からあるメールの項目に合わさる。編集者は変えられないので、自分でログインできなくなることはない。
        {
            name: 'email',
            type: 'email',
            access: {
                update: ({ req }) => req.user?.role === 'admin',
            },
        },
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
            access: {
                // これがないと、編集者が自分を管理者にできてしまう。
                update: ({ req }) => req.user?.role === 'admin',
            },
        },
    ],
};
