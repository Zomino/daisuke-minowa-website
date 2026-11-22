import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e8iamxtmlr29wftj.public.blob.vercel-storage.com", // 本番
      },
      {
        protocol: "https",
        hostname: "h6q8eg2flhkmk59y.public.blob.vercel-storage.com", // プレビューと手元
      },
    ],
  },
};

export default withPayload(nextConfig);
