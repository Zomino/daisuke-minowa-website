'use client';

import { AnimatePresence, motion } from 'framer-motion';
// The up-to-date Image implementation frustratingly only supports blurDataURL as a base64 string, not a URL.
// It is not worth the effort to come up with a workaround for now.
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';

import { type Artwork as PayloadArtwork, type Media } from '@/payload-types';

import ArtworkCarousel from './ArtworkCarousel';

export type ArtworkItem = PayloadArtwork & { image: Media; blurDataURL?: string };

interface ArtworkProps extends React.ComponentProps<'div'> {
    artwork: ArtworkItem[];
}

export default function Artwork({ artwork, className, ...rest }: ArtworkProps) {
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [carouselStartIndex, setCarouselStartIndex] = useState(0);

    // Lock the page scroll when the carousel is open.
    // This is done here and not in the carousel component to ensure that the carousel remains loosely coupled with the context in which it is used.
    useEffect(() => {
        if (isCarouselOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isCarouselOpen]);

    const handleImageClick = (index: number) => {
        setCarouselStartIndex(index);
        setIsCarouselOpen(true);
    };

    return (
        <div
            className={`mt-10 columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 ${className}`}
            {...rest}
        >
            <AnimatePresence>
                {isCarouselOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 h-screen w-screen bg-black/70 backdrop-blur-md"
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <ArtworkCarousel
                            artwork={artwork}
                            onClose={() => setIsCarouselOpen(false)}
                            startIndex={carouselStartIndex}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {artwork.map((a, index) => (
                <div
                    key={a.id}
                    className="group relative overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:cursor-pointer"
                    onClick={() => handleImageClick(index)}
                >
                    <Image
                        className="transition duration-300 group-hover:brightness-50"
                        src={a.image.sizes?.display?.url || ''}
                        alt={a.image.alt || a.title}
                        width={a.image.sizes?.display?.width ?? undefined}
                        height={a.image.sizes?.display?.height ?? undefined}
                        quality={90}
                        placeholder={a.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={a.blurDataURL}
                        // Match the sizes to the grid media queries.
                        // These are approximate values to help Next.js optimize the image loading.
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
                    >
                        <h3 className="text-white">{a.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
