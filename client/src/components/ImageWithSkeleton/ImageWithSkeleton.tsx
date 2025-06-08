'use client';

import { MdImage } from 'react-icons/md';
import { useState } from 'react';

import Image from '@components/Image/Image';
import SkeletonLoader from '@components/SkeletonLoader/SkeletonLoader';

/** An abstraction for loading images that fades the image in when it enters the viewport. */
export default function ImageWithSkeleton(props: React.ComponentProps<typeof Image>) {
    const { alt, onLoad, ...rest } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad(event);
        }
    };

    return (
        <div className="relative">
            {!isLoaded && !hasError && (
                // The SkeletonLoader inherits the size of the image indirectly through the shared parent div.
                <SkeletonLoader className="absolute inset-0 h-full w-full">
                    <MdImage className="h-6 w-6 text-gray-500" />
                </SkeletonLoader>
            )}
            {!isLoaded && hasError && (
                <div className="absolute inset-0 h-full w-full">
                    <div className="flex h-full w-full items-center justify-center">
                        <span role="alert" className="text-sm whitespace-nowrap text-gray-500">
                            Image failed to load
                        </span>
                    </div>
                </div>
            )}
            {/* alt has been passed explicitly to silence ES Lint. */}
            <Image alt={alt} onLoad={handleLoad} onError={() => setHasError(true)} onLoadStart={() => setIsLoaded(false)} {...rest} />
        </div>
    );
}
