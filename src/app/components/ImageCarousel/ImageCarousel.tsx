import { AnimatePresence, motion } from 'framer-motion';

import Carousel from '@components/Carousel/Carousel';
import ImageWithSkeleton from '@components/ImageWithSkeleton/ImageWithSkeleton';

interface Image {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

interface ImageCarouselProps extends Omit<React.ComponentProps<typeof Carousel>, 'children' | 'items'> {
    images: Image[];
}

export default function ImageCarousel({ images, ...rest }: ImageCarouselProps) {
    return (
        <Carousel loop items={images} {...rest}>
            {(item, index, { isFullScreen, toggleFullScreen }) => (
                <figure className={`flex flex-col md:h-screen md:flex-row md:items-center ${isFullScreen ? '' : 'md:p-5'}`}>
                    <motion.div
                        className={`z-50 md:flex md:h-full md:items-center md:justify-center md:overflow-hidden ${isFullScreen ? 'cursor-zoom-out md:w-full' : 'cursor-zoom-in md:w-2/3'}`}
                        onClick={toggleFullScreen}
                        layout
                    >
                        <ImageWithSkeleton
                            className={`object-contain ${isFullScreen ? 'h-screen w-screen' : 'h-full w-full'}`}
                            src={item.download_url}
                            alt={`Image by ${item.author}`}
                            height={item.height}
                            width={item.width}
                        />
                    </motion.div>
                    {!isFullScreen && (
                        <AnimatePresence>
                            <motion.figcaption className="p-5 md:w-1/3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h3 className="text-xl font-extralight uppercase">{`Image by ${item.author}`}</h3>
                                <p className="mt-5">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat.
                                </p>
                                <dl className="mt-5 grid grid-cols-[auto_1fr] gap-2">
                                    <dt>Dimensions:</dt>
                                    {/* Use the multiplication symbol. */}
                                    <dd>{`${item.width} \u00D7 ${item.height}`}</dd>
                                    <dt>Date:</dt>
                                    <dd>
                                        <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
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
