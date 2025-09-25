import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      BETTER_STACK_API_KEY: z.string().optional(),
      BETTER_STACK_URL: z.string().optional(),
      LOGTAIL_SOURCE_TOKEN: z.string().optional(),
    },
    runtimeEnv: {
      BETTER_STACK_API_KEY: process.env.BETTER_STACK_API_KEY,
      BETTER_STACK_URL: process.env.BETTER_STACK_URL,
      LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    },
  });
