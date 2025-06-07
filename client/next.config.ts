import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        // TODO: Replace Lorem Picsum with Strapi
        remotePatterns: [new URL('https://picsum.photos/**')],
    },
};

export default nextConfig;
