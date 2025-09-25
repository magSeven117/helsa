import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
      UPSTASH_REDIS_REST_URL: z.string().optional(),
      UPSTASH_VECTOR_REST_URL: z.string().optional(),
      UPSTASH_VECTOR_REST_TOKEN: z.string().optional(),
      QSTASH_URL: z.string().optional(),
      QSTASH_TOKEN: z.string().optional(),
      QSTASH_CURRENT_SIGNING_KEY: z.string().optional(),
      QSTASH_NEXT_SIGNING_KEY: z.string().optional(),
    },
    client: {
      NEXT_PUBLIC_BASE_URL: z.string().optional(),
    },
    runtimeEnv: {
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
      UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
      QSTASH_URL: process.env.QSTASH_URL,
      QSTASH_TOKEN: process.env.QSTASH_TOKEN,
      QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
      QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  });
