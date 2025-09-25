import { env } from '@/env';
import { getSession } from '@helsa/auth/server';
import payment, { CustomerPortal } from '@helsa/payment';
import { NextRequest } from 'next/server';

export const GET = CustomerPortal({
  accessToken: env.POLAR_SECRET_KEY || '',
  getCustomerId: async (req: NextRequest) => {
    const session = await getSession();
    if (!session) {
      throw new Error('Not authenticated');
    }
    const customer = await payment.customers.getExternal({
      externalId: session.user.id,
    });
    return customer.id;
  },
  server: 'sandbox',
});