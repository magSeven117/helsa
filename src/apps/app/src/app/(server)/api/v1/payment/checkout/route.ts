import { env } from '@/env';
import { Checkout } from '@helsa/payment';

export const POST = Checkout({
  accessToken: env.POLAR_SECRET_KEY || '',
  server: 'sandbox',
  successUrl: `${env.NEXT_PUBLIC_BASE_URL || ''}/profile/plan`,
});