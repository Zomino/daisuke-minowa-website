import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { en } from '@payloadcms/translations/languages/en';
import { ja } from '@payloadcms/translations/languages/ja';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Artworks } from './collections/Artworks';
import { EducationEntries } from './collections/EducationEntries';
import { ExhibitionEntries } from './collections/ExhibitionEntries';
import { Media } from './collections/Media';
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
    collections: [Artworks, ExhibitionEntries, EducationEntries, Media, Users],
    i18n: {
        // Each user can pick a language on their account page; Japanese is used when the browser's language is not supported.
        supportedLanguages: { ja, en },
        fallbackLanguage: 'ja',
    },
    secret: process.env.PAYLOAD_SECRET || '',
    sharp, // Used to generate the image sizes declared on upload collections.
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    plugins: [
        vercelBlobStorage({
            collections: {
                // Store Blob's public URL so images are not proxied through Payload.
                media: { disablePayloadAccessControl: true },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
            clientUploads: true, // Browser uploads straight to Blob, avoiding Vercel's 4.5MB request limit.
            // Default is a year. A day limits how long a re-uploaded image with the same filename can be stale.
            cacheControlMaxAge: 60 * 60 * 24,
        }),
    ],
});
