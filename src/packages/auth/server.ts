import { PrismaClient } from '@helsa/database';
import { resend } from '@helsa/email';
import ForgetPassword from '@helsa/email/templates/forget-password';
import VerifyEmail from '@helsa/email/templates/verify-email';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { bearer, emailOTP } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { cache } from 'react';
import { keys } from './keys';

const prisma = new PrismaClient();
const env = keys();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  advanced: {
    generateId: false,
    cookies: {
      session_token: {
        name: 'helsa_token',
      },
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
        if (type === 'forget-password') {
          await resend.emails.send({
            to: email,
            from: 'Helsa <contact@helsahealthcare.com>',
            subject: 'Verify your email',
            react: ForgetPassword({ verificationCode: otp }),
          });
        } else if (type === 'email-verification') {
          await resend.emails.send({
            to: email,
            from: 'Helsa <contact@helsahealthcare.com>',
            subject: 'Verify your email',
            react: VerifyEmail({ verificationCode: otp }),
          });
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
      redirectURI: `${env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
    },
    facebook: {
      enabled: true,
      clientId: env.FACEBOOK_CLIENT_ID!,
      clientSecret: env.FACEBOOK_CLIENT_SECRET!,
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
