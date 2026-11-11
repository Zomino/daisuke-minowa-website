// Attaches the artwork photos found so far (rescue/images/, named after the artwork title) and publishes those artworks.
// Run with: npx payload run scripts/attach-images.ts
// Everything is checked before anything is uploaded, so a mismatch leaves the database and Blob untouched.
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
    // draft: true finds the latest version, which is where the seeded drafts live.
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
