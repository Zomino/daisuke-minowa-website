import { postgresAdapter } from '@payloadcms/db-postgres';
import { en } from '@payloadcms/translations/languages/en';
import { ja } from '@payloadcms/translations/languages/ja';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug, // The collection whose members can log in to the admin panel.
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users],
    i18n: {
        // Each user can pick a language on their account page; Japanese is used when the browser's language is not supported.
        supportedLanguages: { ja, en },
        fallbackLanguage: 'ja',
    },
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
});
