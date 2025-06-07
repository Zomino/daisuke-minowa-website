import { motion } from 'framer-motion';
import I from 'next/image';
import { useState } from 'react';

/** An abstraction for loading images that fades the image in when it loads. */
export default function Image(props: React.ComponentProps<typeof I>) {
    const { onLoad, ...rest } = props;

    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad(event);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ duration: 1 }}>
            <I onLoad={handleLoad} {...rest} />
        </motion.div>
    );
}
