import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {},
    client: {
      NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string(),
      NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET: z.string(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_OPENPANEL_CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
      NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET,
    },
  });
