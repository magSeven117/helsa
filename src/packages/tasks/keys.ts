import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const keys = () =>
  createEnv({
    server: {
      TRIGGER_SECRET_KEY: z.string(),
    },
    runtimeEnv: {
      TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
    },
  });
