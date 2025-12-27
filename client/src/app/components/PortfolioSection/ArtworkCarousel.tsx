'use client';

import { AnimatePresence, motion } from 'framer-motion';
// The up-to-date Image implementation frustratingly only supports blurDataURL as a base64 string, not a URL.
// It is not worth the effort to come up with a workaround for now.
import Image from 'next/image';

import Carousel from '@components/Carousel/Carousel';
import { type Artwork } from 'genTypes/artwork';

interface ArtworkCarouselProps extends Omit<React.ComponentProps<typeof Carousel>, 'children' | 'items'> {
    artwork: Artwork[];
}

export default function ArtworkCarousel({ artwork, ...rest }: ArtworkCarouselProps) {
    return (
        <Carousel loop items={artwork} {...rest}>
            {(item, index, { isFullScreen, toggleFullScreen }) => {
                const date = item.date ? new Date(item.date) : null;

                return (
                    <figure className={`flex flex-col md:h-screen md:flex-row md:items-center ${isFullScreen ? '' : 'md:p-5'}`}>
                        <motion.div
                            className={`z-50 md:flex md:h-full md:items-center md:justify-center md:overflow-hidden ${isFullScreen ? 'cursor-zoom-out md:w-full' : 'cursor-zoom-in md:w-2/3'}`}
                            onClick={toggleFullScreen}
                            layout
                        >
                            <Image
                                className={`object-contain ${isFullScreen ? 'h-screen w-screen' : 'h-full w-full'}`}
                                src={item.image?.url || ''}
                                alt={item.image?.alternativeText || 'Artwork by Daisuke Minowa'}
                                height={item.image?.height}
                                width={item.image?.width}
                                placeholder="blur"
                                blurDataURL={item.image?.formats?.thumbnail?.url || ''}
                            />
                        </motion.div>
                        {!isFullScreen && (
                            <AnimatePresence>
                                <motion.figcaption className="p-5 md:w-1/3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <h3 className="text-xl font-extralight uppercase">{item.title ?? '(untitled)'}</h3>
                                    {item.description && <p className="mt-5">{item.description}</p>}
                                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-2">
                                        <dt>Dimensions:</dt>
                                        {/* Use the multiplication symbol. */}
                                        <dd>{`${item.width_cm} \u00D7 ${item.height_cm} cm`}</dd>
                                        <dt>Date:</dt>
                                        <dd>
                                            {date ? (
                                                <time dateTime={date.toISOString()}>
                                                    {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </time>
                                            ) : (
                                                '(undated)'
                                            )}
                                        </dd>
                                    </dl>
                                    <p></p>
                                </motion.figcaption>
                            </AnimatePresence>
                        )}
                    </figure>
                );
            }}
        </Carousel>
    );
}
