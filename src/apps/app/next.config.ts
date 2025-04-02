import '@/env';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  logging: {
    incomingRequests: {
      ignore: [/\api\/trpc/],
    },
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
};

export default nextConfig;
