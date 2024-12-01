'use server';

import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';

export const getCurrentUser = authActionClient.action(async ({ ctx }) => {
  return ctx.user;
});
