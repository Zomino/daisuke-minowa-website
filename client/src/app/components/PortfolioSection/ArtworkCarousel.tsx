'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type Artwork } from 'genTypes/artwork';
import Image from 'next/image';

import Carousel from '@components/Carousel/Carousel';

interface ArtworkCarouselProps extends Omit<React.ComponentProps<typeof Carousel>, 'children' | 'items'> {
    artwork: Artwork[];
}

export default function ArtworkCarousel({ artwork, ...rest }: ArtworkCarouselProps) {
    return (
        <Carousel loop items={artwork} {...rest}>
            {(item, index, { isFullScreen, toggleFullScreen }) => (
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
                            // TODO: Fix the type of blurDataURL to be a base64 string.
                            // The new implementation only supports blurDataURL as a base64 string, not a URL.
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
                                    {/*
                                        Use the multiplication symbol.
                                        Although the auto-generated types do not reflect this, the image width and height should be defined.
                                        This is because they are uploaded through the Strapi Upload plugin, which provides these properties.
                                    */}
                                    <dd>{`${item.image?.width} \u00D7 ${item.image?.height}`}</dd>
                                    <dt>Date:</dt>
                                    <dd>
                                        {item.date ? (
                                            <time dateTime={new Date(item.date).toISOString()}>{new Date(item.date).toLocaleDateString()}</time>
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
            )}
        </Carousel>
    );
}
