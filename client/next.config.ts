import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
