'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { FiMaximize, FiMinimize, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'motion/react';
import { type JSX, useCallback, useEffect, useState } from 'react';

import CarouselButton from './CarouselButton';

const MotionCarouselButton = motion.create(CarouselButton);

const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

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
    isUserActive: boolean;
}

interface CarouselProps<T> extends Omit<EmblaOptions, 'startIndex'> {
    children: (item: T, index: number, carouselBag: CarouselBag) => number | string | JSX.Element;
    className?: string;
    items: T[];
    onClose?: () => void;
    startIndex?: number; // Optional start index for the carousel
}

export default function Carousel<T>({ children, className, onClose, items, startIndex = 0, ...rest }: CarouselProps<T>) {
    const [emblaRef, emblaApi] = useEmblaCarousel(rest);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isUserActive, setIsUserActive] = useState(false);

    // Scroll to the startIndex without animation.
    // This must be done n a useEffect to prevent scroll bars from popping in and out when the carousel is first rendered.
    useEffect(() => {
        emblaApi?.scrollTo(startIndex, true);
    }, [emblaApi, startIndex]);

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
        if (!isUserActive) return;

        const timer = setTimeout(() => setIsUserActive(false), 5000);

        return () => clearTimeout(timer);
    }, [isUserActive]);

    return (
        <div
            // Ensure the carousel takes full height and width of its container when .
            className={`overflow-hidden bg-black/30 backdrop-blur-md text-white ${
                isFullScreen ? 'fixed inset-0 h-screen w-screen' : 'relative h-full w-full'
            } ${className}`}
            ref={emblaRef}
            onMouseMove={() => setIsUserActive(true)}
            onMouseLeave={() => setIsUserActive(false)}
        >
            {/* Adding height and widtch with overflow-auto allows each item to have its own scrolling context. */}
            <div className="flex h-full w-full">
                {items.map((item, i) => (
                    <div key={i} className="flex-[0_0_100%] overflow-auto">
                        {children(item, i, { scrollNext, scrollPrev, close, toggleFullScreen, isFullScreen, isUserActive })}
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {isUserActive && (
                    <motion.div variants={buttonVariants} initial="hidden" animate="visible" exit="hidden">
                        <>
                            <MotionCarouselButton
                                ariaLabel="Close Carousel"
                                className="absolute top-4 right-4"
                                title="Close Carousel"
                                onClick={close}
                                variants={buttonVariants}
                            >
                                <FiX className="h-6 w-6" />
                            </MotionCarouselButton>
                            <motion.div
                                className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 p-2 text-white/90 backdrop-blur-sm"
                                variants={buttonVariants}
                            >
                                <CarouselButton ariaLabel="Previous Image" className="bg-transparent" title="Previous Image" onClick={scrollPrev}>
                                    <FiChevronLeft className="h-6 w-6" />
                                </CarouselButton>
                                <CarouselButton
                                    ariaLabel="Toggle Fullscreen"
                                    aria-pressed={isFullScreen}
                                    className="bg-transparent"
                                    title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                >
                                    {isFullScreen ? <FiMinimize className="h-6 w-6" /> : <FiMaximize className="h-6 w-6" />}
                                </CarouselButton>
                                <CarouselButton ariaLabel="Next Image" className="bg-transparent" title="Next Image" onClick={scrollNext}>
                                    <FiChevronRight className="h-6 w-6" />
                                </CarouselButton>
                            </motion.div>
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
