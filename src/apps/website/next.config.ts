import '@/env';
import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@simplewebauthn/server', '@trigger.dev/sdk'],
  images: {
    unoptimized: true,
  },
};

export default withPayload(nextConfig);
