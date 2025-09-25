import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    client: {
      NEXT_PUBLIC_STREAM_CLIENT_SECRET: z.string().optional(),
      NEXT_PUBLIC_STREAM_CLIENT_KEY: z.string().optional(),
      NEXT_PUBLIC_DAILY_API_KEY: z.string().optional(),
      NEXT_PUBLIC_DAILY_DOMAIN: z.string().optional(),
    },
    server: {
      DAILY_API_KEY: z.string().optional(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_STREAM_CLIENT_SECRET: process.env.NEXT_PUBLIC_STREAM_CLIENT_SECRET,
      NEXT_PUBLIC_STREAM_CLIENT_KEY: process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY,
      NEXT_PUBLIC_DAILY_API_KEY: process.env.NEXT_PUBLIC_DAILY_API_KEY,
      NEXT_PUBLIC_DAILY_DOMAIN: process.env.NEXT_PUBLIC_DAILY_DOMAIN,
      DAILY_API_KEY: process.env.DAILY_API_KEY,
    },
  });