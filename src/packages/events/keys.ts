import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      INNGEST_SIGNING_KEY: z.string(),
      INNGEST_EVENT_KEY: z.string(),
    },
    runtimeEnv: {
      INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
      INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    },
  });
