'use client';

import { AnimatePresence, motion } from 'framer-motion';
// 新しい Image の実装は、残念ながら blurDataURL に base64 の文字列しか受け付けず、URL は使えない。
// 今のところ、回避策を考えるほどの価値はない。
import Image from 'next/image';

import Carousel from '@components/Carousel/Carousel';

import { type ArtworkItem } from './Artwork';

interface ArtworkCarouselProps
    extends Omit<React.ComponentProps<typeof Carousel>, 'children' | 'items'> {
    artwork: ArtworkItem[];
}

export default function ArtworkCarousel({ artwork, ...rest }: ArtworkCarouselProps) {
    return (
        <Carousel loop items={artwork} {...rest}>
            {(item, index, { isFullScreen, toggleFullScreen }) => {
                const date = item.date ? new Date(item.date) : null;

                return (
                    <figure
                        className={`flex flex-col md:h-screen md:flex-row md:items-center ${isFullScreen ? '' : 'md:p-5'}`}
                    >
                        <motion.div
                            className={`z-50 md:flex md:h-full md:items-center md:justify-center md:overflow-hidden ${isFullScreen ? 'cursor-zoom-out md:w-full' : 'cursor-zoom-in md:w-2/3'}`}
                            onClick={toggleFullScreen}
                            layout
                        >
                            <Image
                                className={`object-contain ${isFullScreen ? 'h-screen w-screen' : 'h-full w-full'}`}
                                src={item.image.sizes?.display?.url || ''}
                                alt={item.image.alt || item.title}
                                height={item.image.sizes?.display?.height ?? undefined}
                                width={item.image.sizes?.display?.width ?? undefined}
                                quality={90}
                                placeholder={item.blurDataURL ? 'blur' : 'empty'}
                                blurDataURL={item.blurDataURL}
                            />
                        </motion.div>
                        {!isFullScreen && (
                            <AnimatePresence>
                                <motion.figcaption
                                    className="p-5 md:w-1/3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h3 className="text-xl font-extralight uppercase">
                                        {item.title ?? '(untitled)'}
                                    </h3>
                                    {item.technique && (
                                        <p className="mt-5 text-sm tracking-wide text-black/70 uppercase">
                                            {item.technique}
                                        </p>
                                    )}
                                    {item.description && (
                                        <p className={item.technique ? 'mt-3' : 'mt-5'}>
                                            {item.description}
                                        </p>
                                    )}
                                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-2">
                                        <dt>Dimensions:</dt>
                                        {/* 掛け算の記号を使う。 */}
                                        <dd>{`${item.width_cm} \u00D7 ${item.height_cm} cm`}</dd>
                                        <dt>Date:</dt>
                                        <dd>
                                            {date ? (
                                                <time dateTime={date.toISOString()}>
                                                    {date.toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        // 日付は UTC の正午で保存しているので、日がずれないよう UTC で読む。
                                                        timeZone: 'UTC',
                                                    })}
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
