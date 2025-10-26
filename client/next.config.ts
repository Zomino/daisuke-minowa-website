import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'graceful-peace-347db111aa.media.strapiapp.com',
            },
        ],
    },
};

export default nextConfig;
