import { emailOTPClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { keys } from './keys';
export type { User } from 'better-auth';

export const authClient = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_BASE_URL,
  plugins: [
    emailOTPClient(),
    inferAdditionalFields({
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
