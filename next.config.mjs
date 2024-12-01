import { createJiti } from 'jiti';
import { fileURLToPath } from 'node:url';
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti.import('./src/modules/shared/infrastructure/config/env');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@simplewebauthn/server', '@trigger.dev/sdk'],
  },
};

export default nextConfig;
