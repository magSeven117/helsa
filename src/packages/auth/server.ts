import { expo } from '@better-auth/expo';
import { PrismaClient } from '@helsa/database';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { bearer, emailOTP, openAPI } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { cache } from 'react';
import { keys } from './keys';
import { sendForgotPassword } from './utils/send-forgot-password';
import { sendVerification } from './utils/send-verification';

const prisma = new PrismaClient();
const env = keys();
export const auth = betterAuth({
  basePath: '/api/v1/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  advanced: {
    generateId: false,
    cookies: {
      session_token: {
        name: 'helsa_session',
      },
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: '.helsahealthcare.com',
    },
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
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/callback/google`,
    },
  },
  trustedOrigins: [
    'http://localhost:3000',
    'https://helsahealthcare.com',
    'https://app.helsahealthcare.com',
    'helsa-mobile://',
  ],
  plugins: [
    emailOTP({
      otpLength: 6,
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
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
    openAPI(),
    expo(),
  ],
});

export type BetterSession = typeof auth.$Infer.Session;
export type BetterUser = typeof auth.$Infer.Session.user;

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
