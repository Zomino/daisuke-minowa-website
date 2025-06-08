import strapiClient from '@lib/strapiClient';
import { type Artwork as A } from 'genTypes/Artwork';

import Artwork from './Artwork';

export default async function PortfolioSection(props: React.ComponentProps<'section'>) {
    const images =
        (await strapiClient
            .collection('artworks')
            .find({ populate: ['image'] })
            .then((res) => res.data as unknown as A[])
            .catch(console.error)) || [];

    return (
        <section id="portfolio" {...props}>
            <h2 className="text-center text-2xl tracking-widest uppercase md:text-3xl">Portfolio</h2>
            <div className="mt-10 columns-1 gap-1 space-y-1 md:columns-2 lg:columns-3 xl:columns-4">
                <Artwork artwork={images} />
            </div>
        </section>
    );
}
