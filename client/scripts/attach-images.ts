// 見つかった作品の写真（rescue/images/ にあり、ファイル名は作品のタイトル）を作品に付けて、その作品を公開する。
// 実行方法：npx payload run scripts/attach-images.ts
// アップロードの前に全件を確かめるので、合わないものがあれば、DB にも Blob にも何も変更しない。
import { readdir } from 'fs/promises';
import path from 'path';
import { getPayload } from 'payload';
import { fileURLToPath } from 'url';

import config from '../src/payload.config';

const imagesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../rescue/images');
const files = (await readdir(imagesDir)).filter((file) => !file.startsWith('.'));

const payload = await getPayload({ config });

const matches = [];
const problems = [];
for (const file of files) {
    const title = path.parse(file).name;
    // draft: true にすると最新の版から探す。seed で入れた下書きはそこにある。
    const { docs } = await payload.find({
        collection: 'artworks',
        where: { title: { equals: title } },
        draft: true,
        depth: 0,
    });
    if (docs.length !== 1) {
        problems.push(`${file}: expected 1 artwork titled "${title}", found ${docs.length}`);
    } else if (docs[0].image) {
        problems.push(`${file}: "${title}" already has an image`);
    } else {
        matches.push({ file, title, artwork: docs[0] });
    }
}
if (problems.length > 0) {
    console.error(`Nothing was changed.\n${problems.join('\n')}`);
    process.exit(1);
}

for (const { file, title, artwork } of matches) {
    const image = await payload.create({
        collection: 'media',
        data: { alt: title },
        filePath: path.join(imagesDir, file),
    });
    await payload.update({
        collection: 'artworks',
        id: artwork.id,
        data: { image: image.id, _status: 'published' },
    });
    console.log(`${title}: attached ${file} (media id ${image.id}) and published`);
}

process.exit(0);
