'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type Artwork as A } from 'genTypes/Artwork';
import { useEffect, useState } from 'react';

import { STRAPI_BASE_URL } from '@config/env';
import ImageWithSkeleton from '@components/ImageWithSkeleton/ImageWithSkeleton';

import ArtworkCarousel from 'app/components/PortfolioSection/ArtworkCarousel';

interface ArtworkProps {
    artwork: A[];
}

export default function Artwork({ artwork }: ArtworkProps) {
    const [isCarouselOpen, setIsCarouselOpen] = useState(false);
    const [carouselStartIndex, setCarouselStartIndex] = useState(0);

    // Lock the page scroll when the carousel is open.
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
        <>
            <AnimatePresence>
                {isCarouselOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 h-screen w-screen bg-black"
                        animate={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <ArtworkCarousel artwork={artwork} onClose={() => setIsCarouselOpen(false)} startIndex={carouselStartIndex} />
                    </motion.div>
                )}
            </AnimatePresence>
            {artwork.map((a, index) => (
                <div key={a.id} className="group relative hover:cursor-pointer" onClick={() => handleImageClick(index)}>
                    <ImageWithSkeleton
                        className="transition duration-300 group-hover:brightness-50"
                        src={`${STRAPI_BASE_URL}${a.image?.url || ''}`}
                        alt={a.image?.alternativeText || 'Artwork by Daisuke Minowa'}
                        width={a.image?.width}
                        height={a.image?.height}
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100"
                    >
                        <h3>{a.title}</h3>
                    </div>
                </div>
            ))}
        </>
    );
}
