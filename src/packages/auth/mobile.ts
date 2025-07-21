import { expoClient } from '@better-auth/expo/client';
import { emailOTPClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import type { auth } from './server';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL,
  basePath: '/api/v1/auth',
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    expoClient({
      storage: SecureStore,
      scheme: 'helsa-mobile',
      storagePrefix: 'helsa_mobile',
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
