import type { NextConfig } from 'next';

if (!process.env.STRAPI_BASE_URL) {
    throw new Error('Missing STRAPI_BASE_URL environment variable');
}

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: process.env.STRAPI_BASE_URL,
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
