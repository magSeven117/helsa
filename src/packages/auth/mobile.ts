import { expoClient } from '@better-auth/expo/client';
import { emailOTPClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  plugins: [
    emailOTPClient(),
    expoClient({
      scheme: 'helsapatient',
      storagePrefix: 'helsa',
      storage: SecureStore,
    }),
  ],
});

export const { signIn, signOut, useSession } = authClient;
