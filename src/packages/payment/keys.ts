import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      POLAR_SECRET_KEY: z.string().optional(),
      POLAR_WEBHOOK_SECRET: z.string().optional(),
    },
    runtimeEnv: {
      POLAR_SECRET_KEY: process.env.POLAR_SECRET_KEY,
      POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    },
  });
