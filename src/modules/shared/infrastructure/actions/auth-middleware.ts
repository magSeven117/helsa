'use server';
import { createMiddleware } from 'next-safe-action';
import { AuthorizationError } from '../../domain/core/errors/authorization-error';
import { getSession } from '../auth/better-auth';

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await getSession();
  if (!session?.user) {
    throw new AuthorizationError('Unauthorized');
  }
  return next({
    ctx: {
      user: session?.user,
    },
  });
});
