import type { NextConfig } from 'next';
import { URL } from 'url';

const strapiBaseUrl = new URL(process.env.STRAPI_BASE_URL || 'http://localhost:1337');

console.log(strapiBaseUrl, strapiBaseUrl.hostname);

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'graceful-peace-347db111aa.media.strapiapp.com',
                // hostname: strapiBaseUrl.hostname,
                pathname: '/**',
            },
        ],
    },
};

console.log('Next.js config:', nextConfig);

export default nextConfig;
