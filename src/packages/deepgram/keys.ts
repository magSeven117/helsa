import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      DEEPGRAM_SECRET: z.string(),
    },
    runtimeEnv: {
      DEEPGRAM_SECRET: process.env.DEEPGRAM_SECRET,
    },
  });
