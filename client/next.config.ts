import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337', // Default Strapi port
                pathname: '/**', // Allow all paths
            },
            {
                protocol: 'https',
                hostname: 'graceful-peace-347db111aa.strapiapp.com', // I could not get this to work with an environment variable, so I hardcoded it for now.
                pathname: '/**', // Allow all paths
            },
        ],
    },
};

export default nextConfig;
