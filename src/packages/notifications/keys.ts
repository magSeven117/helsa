import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      NOVU_SECRET_KEY: z.string(),
    },
    runtimeEnv: {
      NOVU_SECRET_KEY: process.env.NOVU_SECRET_KEY,
    },
  });
