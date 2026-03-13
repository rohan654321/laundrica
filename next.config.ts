import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add indexlaundry.ae if you're using images from there too
      {
        protocol: 'https',
        hostname: 'indexlaundry.ae',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;