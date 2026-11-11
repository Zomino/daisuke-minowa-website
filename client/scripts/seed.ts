// Loads the content rescued from Strapi Cloud (rescue/*.json) into Payload.
// Run with: npx payload run scripts/seed.ts
// Artworks are created as drafts because their images were lost and must be attached by hand later.
import { readFile } from 'fs/promises';
import path from 'path';
import { getPayload } from 'payload';
import { fileURLToPath } from 'url';

import config from '../src/payload.config';

type RescuedArtwork = {
    title: string;
    height_cm: number;
    width_cm: number;
    technique: string | null;
    date: string | null;
    description: string | null;
};
type RescuedExhibition = {
    event_name: string;
    date_from: string;
    date_to: string | null;
    notes: string | null;
};
type RescuedEducation = {
    experience_name: string;
    year_from: number;
    year_to: number | null;
    notes: string | null;
};

const rescueDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../rescue');
const readJson = async <T>(file: string): Promise<T[]> => {
    const filePath = path.join(rescueDir, file);
    const json = await readFile(filePath, 'utf8');
    return JSON.parse(json);
};

// Dates in the rescued data are plain YYYY-MM-DD; store them at noon UTC so no time zone shifts the day.
const atNoon = (date: string) => `${date}T12:00:00.000Z`;

const payload = await getPayload({ config });

for (const collection of ['artworks', 'exhibition-entries', 'education-entries'] as const) {
    const { totalDocs } = await payload.count({ collection });
    if (totalDocs > 0) {
        console.error(
            `${collection} already has ${totalDocs} entries. Aborting so nothing is duplicated.`
        );
        process.exit(1);
    }
}

const exhibitions = await readJson<RescuedExhibition>('exhibitions.json');
for (const entry of exhibitions) {
    await payload.create({
        collection: 'exhibition-entries',
        data: {
            event_name: entry.event_name,
            date_from: atNoon(entry.date_from),
            date_to: entry.date_to ? atNoon(entry.date_to) : null,
            notes: entry.notes,
            _status: 'published',
        },
    });
}
console.log(`exhibition-entries: created ${exhibitions.length} (published)`);

const education = await readJson<RescuedEducation>('education.json');
for (const entry of education) {
    await payload.create({
        collection: 'education-entries',
        data: {
            experience_name: entry.experience_name,
            year_from: entry.year_from,
            year_to: entry.year_to,
            notes: entry.notes,
            _status: 'published',
        },
    });
}
console.log(`education-entries: created ${education.length} (published)`);

const artworks = await readJson<RescuedArtwork>('artworks.json');
for (const artwork of artworks) {
    await payload.create({
        collection: 'artworks',
        draft: true,
        data: {
            title: artwork.title,
            height_cm: artwork.height_cm,
            width_cm: artwork.width_cm,
            technique: artwork.technique,
            date: artwork.date ? atNoon(artwork.date) : null,
            description: artwork.description,
            _status: 'draft',
        },
    });
}
console.log(`artworks: created ${artworks.length} (draft, no image yet)`);

process.exit(0);
