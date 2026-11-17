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
        user: Users.slug, // 管理画面にログインできるユーザーのコレクション。
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Artworks, ExhibitionEntries, EducationEntries, Media, Users],
    i18n: {
        // 言語は、それぞれのユーザーがアカウントのページで選べる。ブラウザの言語に対応していないときは日本語にする。
        supportedLanguages: { ja, en },
        fallbackLanguage: 'ja',
    },
    secret: process.env.PAYLOAD_SECRET || '',
    sharp, // アップロードのコレクションで決めた、写真のサイズ違いを作るのに使う。
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
                // 写真を Payload 経由で配らないよう、Blob の公開 URL を保存する。
                media: { disablePayloadAccessControl: true },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
            clientUploads: true, // ブラウザから Blob に直接アップロードして、Vercel の 4.5MB の上限を避ける。
            // 標準は1年。同じファイル名で上げ直した写真が古いまま表示される期間を、1日にとどめる。
            cacheControlMaxAge: 60 * 60 * 24,
        }),
    ],
});
