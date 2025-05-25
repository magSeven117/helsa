import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      UPSTASH_REDIS_REST_TOKEN: z.string(),
      UPSTASH_REDIS_REST_URL: z.string(),
      QSTASH_URL: z.string(),
      QSTASH_TOKEN: z.string(),
      QSTASH_CURRENT_SIGNING_KEY: z.string(),
      QSTASH_NEXT_SIGNING_KEY: z.string(),
    },
    client: {
      NEXT_PUBLIC_BASE_URL: z.string(),
    },
    runtimeEnv: {
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      QSTASH_URL: process.env.QSTASH_URL,
      QSTASH_TOKEN: process.env.QSTASH_TOKEN,
      QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
      QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  });
