import { getSession } from '@helsa/auth/server';
import payment from '@helsa/payment';
import { appointment } from '@helsa/payment/products';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }
  const searchParams = req.nextUrl.searchParams;
  const appointmentId = searchParams.get('appointmentId') ?? '';

  const successUrl = new URL(`/appointments?id=${appointmentId}`, req.url).toString();

  const checkout = await payment.checkouts.create({
    productId: appointment.productId,
    successUrl: successUrl.toString(),
    customerExternalId: session.user.id,
    customerName: session.user.name,
    customerEmail: session.user.email,
    metadata: {
      type: 'appointment',
      userId: session.user.id,
      appointmentId,
    },
  });

  return NextResponse.redirect(checkout.url);
};
