import { emailOTPClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { keys } from './keys';
import type { auth } from './server';

export const authClient = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_BASE_URL,
  basePath: '/api/v1/auth',
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>({
      user: {
        role: {
          type: 'string',
          defaultValue: 'UNDEFINED',
        },
        bio: {
          type: 'string',
          defaultValue: '',
          input: true,
        },
        plan: {
          type: 'string',
          defaultValue: 'free',
          input: true,
        },
      },
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
