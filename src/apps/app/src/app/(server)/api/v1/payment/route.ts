import { routeHandler } from '@helsa/controller/route-handler';
import payment from '@helsa/payment';
import { NextResponse } from 'next/server';

export const GET = routeHandler({ name: 'get-customer-info' }, async ({ user }) => {
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
    const meters = await payment.customerMeters.list({
      customerId: customer.id,
      limit: 5,
    });
    return NextResponse.json({
      data: {
        customer,
        subscription: subscription.result.items[0],
        meters: meters.result.items,
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ data: { customer: null, subscription: null } });
  }
});

export const POST = routeHandler({ name: 'add-metter' }, async ({ user }) => {
  const result = await payment.events.ingest({
    events: [
      {
        name: 'ai_usage',
        customerId: user.id,
        metadata: {
          promptTokens: 30000,
          completionTokens: 100000,
        },
      },
    ],
  });
  return NextResponse.json({ data: result });
});
