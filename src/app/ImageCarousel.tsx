import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ArrowsPointingInIcon, ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ImageCarousel({
    isOpen = false,
    onClose,
    images,
    startIndex = 0,
}: {
    isOpen?: boolean;
    images: Array<{
        id: string;
        author: string;
        width: number;
        height: number;
        url: string;
        download_url: string;
    }>;
    onClose?: () => void;
    startIndex?: number;
}) {
    const [areButtonsVisible, setAreButtonsVisible] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex, loop: true });
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleClose = useCallback(() => {
        onClose?.();
        setIsFullScreen(false);
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            if (isFullScreen) {
                setIsFullScreen(false);
                emblaApi?.scrollTo(startIndex); // Reset to the start index when forcefully exiting fullscreen
            } else if (isOpen) {
                onClose?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [emblaApi, isFullScreen, isOpen, handleClose, onClose, startIndex]);

    useEffect(() => {
        const handlePopstate = () => {
            if (isFullScreen) {
                setIsFullScreen(false);
                emblaApi?.scrollTo(startIndex); // Reset to the start index when forcefully exiting fullscreen
            } else if (isOpen) {
                onClose?.();
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => window.removeEventListener('popstate', handlePopstate);
    }, [emblaApi, isFullScreen, isOpen, onClose, startIndex]);

    useEffect(() => {
        // Lock the page scroll when the carousel is open.
        if (isOpen) document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!areButtonsVisible) return;

        const timeout = setTimeout(() => setAreButtonsVisible(false), 5000); // 3s fade-out

        return () => clearTimeout(timeout);
    }, [areButtonsVisible]);

    return (
        <div
            className={`fixed inset-0 z-50 bg-black transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
        >
            <div
                className="relative h-screen overflow-hidden"
                ref={emblaRef}
                onMouseMove={() => setAreButtonsVisible(true)}
                onMouseLeave={() => setAreButtonsVisible(false)}
            >
                <div className="flex h-full">
                    {images.map((image) => (
                        <figure
                            key={image.id}
                            className={`flex-[0_0_100%] overflow-y-auto ${isFullScreen ? 'flex items-center justify-center' : 'md:flex md:flex-row md:items-center md:p-5'}`}
                        >
                            <div className={isFullScreen ? '' : 'md:w-2/3'} onClick={() => !isFullScreen && setIsFullScreen(!isFullScreen)}>
                                <Image
                                    className={`${isFullScreen ? 'max-h-screen max-w-screen' : ''} object-contain`}
                                    src={image.download_url}
                                    alt={`Image by ${image.author}`}
                                    height={image.height}
                                    width={image.width}
                                />
                            </div>
                            {!isFullScreen && (
                                <figcaption className="p-5 md:w-1/3">
                                    <h3 className="text-xl font-extralight uppercase">{`Image by ${image.author}`}</h3>
                                    <p className="mt-5">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.
                                    </p>
                                    <dl className="mt-5 grid grid-cols-[auto_1fr] gap-2">
                                        <dt>Dimensions:</dt>
                                        {/* Use the multiplication symbol. */}
                                        <dd>{`${image.width} \u00D7 ${image.height}`}</dd>
                                        <dt>Date:</dt>
                                        <dd>
                                            <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
                                        </dd>
                                    </dl>
                                    <p></p>
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
                <button
                    onClick={handleClose}
                    className={`absolute top-4 right-4 inline cursor-pointer rounded-full bg-black/70 p-3 transition-all duration-300 hover:bg-white/20 ${areButtonsVisible ? 'opacity-100' : 'opacity-0'}`}
                    aria-label="Close Carousel"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div
                    className={`absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-full bg-black/70 p-3 text-white/70 transition-all duration-300 ${areButtonsVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        className="cursor-pointer rounded-full p-3 hover:bg-white/20"
                        aria-label="Previous"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="cursor-pointer rounded-full p-3 hover:bg-white/20"
                        aria-label="Toggle Fullscreen"
                        title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                        {isFullScreen ? <ArrowsPointingInIcon className="h-6 w-6" /> : <ArrowsPointingOutIcon className="h-6 w-6" />}
                    </button>
                    <button onClick={() => emblaApi?.scrollNext()} className="cursor-pointer rounded-full p-3 hover:bg-white/20" aria-label="Next">
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// TODO:
// Decouple the carousel from the images
