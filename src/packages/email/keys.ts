import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const keys = () =>
  createEnv({
    server: {
      RESEND_API_KEY: z.string(),
    },
    client: {
      NEXT_PUBLIC_BASE_URL: z.string(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    },
  });
