import { env } from '@helsa/env';
import { config } from '@helsa/next-config';
import type { NextConfig } from 'next';
if (env.NODE_ENV === 'development') {
  console.log('Next Config:', config);
}
let nextConfig: NextConfig = { ...config };
export default nextConfig;
