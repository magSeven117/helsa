// @ts-expect-error No declaration file
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import type { NextConfig } from 'next';
export const config: NextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@simplewebauthn/server', '@trigger.dev/sdk'],
  },
};
