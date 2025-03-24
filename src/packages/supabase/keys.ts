import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const keys = () =>
  createEnv({
    client: {
      NEXT_PUBLIC_SUPABASE_URL: z.string(),
      NEXT_PUBLIC_SUPABASE_KEY: z.string(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
  });
