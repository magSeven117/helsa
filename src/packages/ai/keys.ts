import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      VOYAGE_API_KEY: z.string(),
      DEEPSEEK_API_KEY: z.string(),
    },
    runtimeEnv: {
      VOYAGE_API_KEY: process.env.VOYAGE_API_KEY,
      DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    },
  });
