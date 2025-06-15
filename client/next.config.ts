import type { NextConfig } from 'next';
import { URL } from 'url';

const strapiBaseUrl = new URL(process.env.STRAPI_BASE_URL || 'http://localhost:1337');

console.log(strapiBaseUrl, strapiBaseUrl.hostname);

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: strapiBaseUrl.hostname,
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
