import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { auth } from '@/modules/shared/infrastructure/auth/better-auth';
import { headers } from 'next/headers';

export const UpdateBioResolver = async (_: unknown, input: { bio: string }) => {
  try {
    const { bio } = input;
    await auth.api.updateUser({ body: { bio }, headers: headers() });
  } catch (error) {
    console.error(error);
    throw new InternalError('An error occurred. Please try again.');
  }
};
