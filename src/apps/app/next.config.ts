import '@/env';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: {
      ignore: [/\api\/trpc/],
    },
  },
};

export default nextConfig;
