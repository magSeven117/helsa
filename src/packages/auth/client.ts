import { env } from '@helsa/env';
import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
export type { User } from 'better-auth';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [emailOTPClient()],
});

export const { signIn, signOut, useSession } = authClient;
