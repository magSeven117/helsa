/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@simplewebauthn/server', '@trigger.dev/sdk'],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
