import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string(),
      DIRECT_URL: z.string().optional(),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_URL: process.env.DIRECT_URL,
    },
  });
