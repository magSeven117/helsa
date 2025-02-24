/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@simplewebauthn/server', '@trigger.dev/sdk'],
  },
};

export default nextConfig;
