import { PrismaClient } from '@helsa/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { bearer, emailOTP } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { cache } from 'react';
import { sendForgotPassword } from 'utils/send-forgot-password';
import { sendVerification } from 'utils/send-verification';
import { keys } from './keys';

const prisma = new PrismaClient();
const env = keys();
export const auth = betterAuth({
  basePath: '/api/v1/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  advanced: {
    generateId: false,
  },
  user: {
    additionalFields: {
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
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['https://app.helsahealthcare.com'],
  plugins: [
    emailOTP({
      otpLength: 6,
      sendVerificationOTP: async ({ email, otp, type }) => {
        switch (type) {
          case 'email-verification':
            await sendVerification(email, otp);
            break;
          case 'forget-password':
            await sendForgotPassword(email, otp);
          default:
            break;
        }
      },
      sendVerificationOnSignUp: true,
    }),
    nextCookies(),
    bearer(),
  ],
  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/callback/google`,
    },
  },
});

export type BetterSession = typeof auth.$Infer.Session;
export type BetterUser = typeof auth.$Infer.Session.user;

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
