'use server';
import { getSession } from '@helsa/auth/server';
import { AuthorizationError } from '@helsa/ddd/core/errors/authorization-error';
import { createMiddleware } from 'next-safe-action';

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await getSession();
  if (!session?.user) {
    console.log('Unauthorized');
    throw new AuthorizationError('Unauthorized');
  }
  return next({
    ctx: {
      user: session?.user,
    },
  });
});
