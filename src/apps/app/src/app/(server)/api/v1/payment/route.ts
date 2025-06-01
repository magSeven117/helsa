import payment from '@helsa/payment';
import { NextResponse } from 'next/server';
import { routeHandler } from '../route-handler';

export const GET = routeHandler(async ({ user }) => {
  try {
    const customer = await payment.customers.getExternal({
      externalId: user.id,
    });
    if (!customer) {
      return NextResponse.json({ data: { customer: null, subscription: null } });
    }
    const subscription = await payment.subscriptions.list({
      customerId: customer.id,
      limit: 1,
      active: true,
    });
    if (!subscription || subscription.result.items.length === 0) {
      return NextResponse.json({ data: { customer: null, subscription: null } });
    }
    return NextResponse.json({
      data: {
        customer,
        subscription: subscription.result.items[0],
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ data: { customer: null, subscription: null } });
  }
});
