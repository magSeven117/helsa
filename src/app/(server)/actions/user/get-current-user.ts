'use server';

import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';

export const getCurrentUser = authActionClient.metadata({ actionName: 'get-current-user' }).action(async ({ ctx }) => {
  return ctx.user;
});
