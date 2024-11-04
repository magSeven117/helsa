import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const UpdateBioResolver = async (context, input) => {
  try {
    const user = auth();
    const { bio } = input;
    await clerkClient.users.updateUserMetadata(user.userId, {
      publicMetadata: {
        bio,
      },
    });
  } catch (error) {
    console.error(error);
    throw new InternalError('An error occurred. Please try again.');
  }
};
