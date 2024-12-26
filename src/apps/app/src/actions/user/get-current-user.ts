'use server';

import { authActionClient } from '@helsa/actions';

export const getCurrentUser = authActionClient.metadata({ actionName: 'get-current-user' }).action(async ({ ctx }) => {
  return ctx.user;
});
