import strapiClient from '@lib/strapiClient';
import { type Artwork as A } from 'genTypes/artwork';

import Artwork from './Artwork';

export default async function PortfolioSection() {
    const images =
        (await strapiClient
            .collection('artworks')
            .find({ populate: ['image'] })
            .then((res) => res.data as unknown as A[])
            .catch(console.error)) || [];

    // TODO: Remove
    console.log('Portfolio images:', images);

    return (
        <section id="portfolio">
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">Portfolio</h2>
            <Artwork className="mt-10" artwork={images} />
        </section>
    );
}
