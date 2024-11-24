'use server';

import { auth } from '@/modules/shared/infrastructure/auth/better-auth';
import { headers } from 'next/headers';

export const getCurrentUser = async () => {
  const data = await auth.api.getSession({
    headers: headers(),
  });
  if (!data) {
    return null;
  }
  return data.user;
};
