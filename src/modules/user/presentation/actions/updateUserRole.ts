'use server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const updateRole = async (role: string) => {
  const { userId } = auth();
  if (!userId) {
    return { error: 'User not found' };
  }
  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};
