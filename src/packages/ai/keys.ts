import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      VOYAGE_API_KEY: z.string().optional(),
      DEEPSEEK_API_KEY: z.string().optional(),
      GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
      OPENAI_API_KEY: z.string().optional(),
    },
    runtimeEnv: {
      VOYAGE_API_KEY: process.env.VOYAGE_API_KEY,
      DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION  // TEMPORAL
  });