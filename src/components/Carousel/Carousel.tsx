import useEmblaCarousel from 'embla-carousel-react';
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'motion/react';
import { type JSX, useCallback, useEffect, useState } from 'react';

import CarouselButton from './CarouselButton';

// undefined must be exluded to make the type usable.
type EmblaOptions = Exclude<Parameters<typeof useEmblaCarousel>[0], undefined>;

// The CarouselBag interface provides methods and state for controlling the carousel.
// This is inspired by Formik's bag of methods and state, which is passed to the children render function.
interface CarouselBag {
    scrollNext: () => void;
    scrollPrev: () => void;
    close: () => void;
    toggleFullScreen: () => void;
    isFullScreen: boolean;
    isRecentlyHovered: boolean;
}

interface CarouselProps<T> extends Omit<EmblaOptions, 'startIndex'> {
    children: (item: T, index: number, carouselBag: CarouselBag) => number | string | JSX.Element;
    items: T[];
    onClose?: () => void;
    startIndex?: number; // Optional start index for the carousel
}

export default function Carousel<T>({ children, onClose, items, startIndex = 0, ...rest }: CarouselProps<T>) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex, ...rest });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isRecentlyHovered, setIsRecentlyHovered] = useState(false);

    const close = useCallback(() => {
        onClose?.();
        // Reset fullscreen state when closing.
        // This must happen after the onClose callback to prevent flickering in case the onClose callback closes the carousel.
        setIsFullScreen(false);
    }, [onClose]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const toggleFullScreen = useCallback(() => setIsFullScreen(!isFullScreen), [isFullScreen]);

    // Handle keyboard events.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    return scrollPrev();
                case 'ArrowRight':
                    return scrollNext();
                case 'Escape':
                    return close();
                case 'f':
                    return toggleFullScreen();
                default:
                    return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('popstate', close);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('popstate', close);
        };
    }, [close, emblaApi, isFullScreen, onClose, scrollNext, scrollPrev, startIndex, toggleFullScreen]);

    // Set a timer to hide the hover buttons after 5 seconds of inactivity.
    useEffect(() => {
        if (!isRecentlyHovered) return;

        const timer = setTimeout(() => setIsRecentlyHovered(false), 5000);

        return () => clearTimeout(timer);
    }, [isRecentlyHovered]);

    return (
        <div
            className="relative"
            ref={emblaRef}
            onMouseMove={() => setIsRecentlyHovered(true)}
            onMouseLeave={() => setIsRecentlyHovered(false)}
        >
            <div className="flex">
                {items.map((item, i) => (
                    <div key={i} className="flex-[0_0_100%]">
                        {children(item, i, { scrollNext, scrollPrev, close, toggleFullScreen, isFullScreen, isRecentlyHovered })}
                    </div>
                ))}
            </div>
            <motion.div animate={{ opacity: isRecentlyHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
                <CarouselButton ariaLabel="Close Carousel" className="absolute top-4 right-4 bg-black/70" title="Close Carousel" onClick={close}>
                    <XMarkIcon className="h-6 w-6" />
                </CarouselButton>
            </motion.div>
            <motion.div
                className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/70 p-2 text-white/70"
                animate={{ opacity: isRecentlyHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <CarouselButton ariaLabel="Previous Image" title="Previous Image" onClick={scrollPrev}>
                    <ChevronLeftIcon className="h-6 w-6" />
                </CarouselButton>
                <CarouselButton
                    ariaLabel="Toggle Fullscreen"
                    aria-pressed={isFullScreen}
                    title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    onClick={() => setIsFullScreen(!isFullScreen)}
                >
                    {isFullScreen ? <ArrowsPointingInIcon className="h-6 w-6" /> : <ArrowsPointingOutIcon className="h-6 w-6" />}
                </CarouselButton>
                <CarouselButton ariaLabel="Next Image" title="Next Image" onClick={scrollNext}>
                    <ChevronRightIcon className="h-6 w-6" />
                </CarouselButton>
            </motion.div>
        </div>
    );
}
