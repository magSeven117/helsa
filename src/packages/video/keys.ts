import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    client: {
      NEXT_PUBLIC_STREAM_CLIENT_SECRET: z.string(),
      NEXT_PUBLIC_STREAM_CLIENT_KEY: z.string(),
      NEXT_PUBLIC_DAILY_API_KEY: z.string(),
    },
    server: {
      DAILY_API_KEY: z.string(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_STREAM_CLIENT_SECRET: process.env.NEXT_PUBLIC_STREAM_CLIENT_SECRET,
      NEXT_PUBLIC_STREAM_CLIENT_KEY: process.env.NEXT_PUBLIC_STREAM_CLIENT_KEY,
      NEXT_PUBLIC_DAILY_API_KEY: process.env.NEXT_PUBLIC_DAILY_API_KEY,
      DAILY_API_KEY: process.env.DAILY_API_KEY,
    },
  });
