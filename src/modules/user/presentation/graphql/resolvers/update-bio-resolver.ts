import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';

export const UpdateBioResolver = async (_: unknown, input: { bio: string }) => {
  try {
    const { bio } = input;
    console.log(bio);
  } catch (error) {
    console.error(error);
    throw new InternalError('An error occurred. Please try again.');
  }
};
