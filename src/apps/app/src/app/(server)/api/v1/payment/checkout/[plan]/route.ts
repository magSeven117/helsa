import { getSession } from '@helsa/auth/server';
import payment, { products } from '@helsa/payment';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ plan: string }> }) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { plan } = await params;

  const product = products.find((product) => product.slug === plan);

  if (!product) {
    throw new Error('Invalid plan');
  }

  const successUrl = new URL('/settings/billing', req.url).toString();

  const checkout = await payment.checkouts.create({
    products: [product.productId],
    successUrl: successUrl.toString(),
    customerExternalId: session.user.id,
    customerName: session.user.name,
    customerEmail: session.user.email,
    metadata: {
      type: plan,
      userId: session.user.id,
    },
  });

  return NextResponse.redirect(checkout.url);
};
