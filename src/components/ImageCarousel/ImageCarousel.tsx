import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

import Carousel from '@components/Carousel/Carousel';

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
    // Lock the page scroll when the carousel is open.
    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';

    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);

    return (
        <Carousel loop items={images} {...rest}>
            {(item, index, carouselBag) => (
                <figure className="flex flex-col">
                    <div className="md:w-2/3">
                        <Image
                            className="object-contain"
                            src={item.download_url}
                            alt={`Image by ${item.author}`}
                            height={item.height}
                            width={item.width}
                        />
                    </div>
                    <figcaption className="p-5 md:w-1/3">
                        <h3 className="text-xl font-extralight uppercase">{`Image by ${item.author}`}</h3>
                        <p className="mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    </figcaption>
                </figure>
            )}
        </Carousel>
    );
}

// {(item, i, carouselBag) => (
//                 <figure
//                     className={` ${carouselBag.isFullScreen ? 'flex items-center justify-center overflow-hidden' : 'overflow-y-auto md:flex md:flex-row md:items-center md:p-5'}`}
//                 >
//                     <motion.div
//                         className={carouselBag.isFullScreen ? '' : 'md:w-2/3'}
//                         layout
//                         onClick={() => !carouselBag.isFullScreen && carouselBag.toggleFullScreen()}
//                         transition={{ type: 'spring', stiffness: 30, damping: 3000 }}
//                     >
//                         <Image
//                             className={`${carouselBag.isFullScreen ? 'max-h-screen max-w-screen' : ''} object-contain`}
//                             src={item.download_url}
//                             alt={`Image by ${item.author}`}
//                             height={item.height}
//                             width={item.width}
//                         />
//                     </motion.div>
//                     <AnimatePresence>
//                         {!carouselBag.isFullScreen && (
//                             <motion.figcaption className="p-5 md:w-1/3">
//                                 <h3 className="text-xl font-extralight uppercase">{`Image by ${item.author}`}</h3>
//                                 <p className="mt-5">
//                                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
//                                     magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
//                                     consequat.
//                                 </p>
//                                 <dl className="mt-5 grid grid-cols-[auto_1fr] gap-2">
//                                     <dt>Dimensions:</dt>
//                                     {/* Use the multiplication symbol. */}
//                                     <dd>{`${item.width} \u00D7 ${item.height}`}</dd>
//                                     <dt>Date:</dt>
//                                     <dd>
//                                         <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
//                                     </dd>
//                                 </dl>
//                                 <p></p>
//                             </motion.figcaption>
//                         )}
//                     </AnimatePresence>
//                 </figure>
//             )}
