import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import Image from '@components/Image/Image';
import SkeletonLoader from '@components/SkeletonLoader/SkeletonLoader';

/** An abstraction for loading images that fades the image in when it enters the viewport. */
export default function ImageWithSkeleton(props: React.ComponentProps<typeof Image>) {
    const { alt, onLoad, ...rest } = props;

    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad(event);
        }
    };

    return (
        <div className="relative">
            {!isLoaded && (
                // The SkeletonLoader inherits the size of the image indirectly through the shared parent div.
                <SkeletonLoader className="absolute inset-0 h-full w-full">
                    <PhotoIcon className="h-6 w-6" />
                </SkeletonLoader>
            )}
            {/* alt has been passed explicitly to silence ES Lint. */}
            <Image alt={alt} onLoad={handleLoad} {...rest} />
        </div>
    );
}
