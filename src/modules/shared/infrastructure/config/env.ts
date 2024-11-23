import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    TRIGGER_SECRET_KEY: z.string(),
    MONGO_URI: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
  },
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    MONGO_URI: process.env.MONGO_URI,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
