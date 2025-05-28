import { auth } from '@helsa/auth/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { routeHandler } from '../route-handler';

export const PUT = routeHandler(async ({ req, user }) => {
  const { id: userId } = user;
  const data = await req.json();

  // Assuming you have a service to handle the update logic
  await auth.api.updateUser({ body: data, headers: await headers(), userId });

  return NextResponse.json({ success: true, message: 'Bio updated successfully' });
});
