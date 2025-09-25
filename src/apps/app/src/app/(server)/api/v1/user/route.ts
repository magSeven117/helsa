import { routeHandler } from '@helsa/api/route-handler';
import { auth } from '@helsa/auth/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const PUT = routeHandler(
  {
    name: 'update-user',
    schema: z.object({
      bio: z.string().optional(),
      name: z.string().optional(),
      image: z.string().optional(),
    }),
  },
  async ({ body, user }) => {
    // Assuming you have a service to handle the update logic
    await auth.api.updateUser({ body, headers: await headers() });

    return NextResponse.json({ success: true, message: 'Bio updated successfully' });
  }
);
