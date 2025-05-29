import { useMutation } from '@tanstack/react-query';

export const useUser = () => {
  const {
    mutateAsync: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const response = await fetch('/api/v1/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return response.json();
    },
  });
  return {
    updateUser,
    isPending,
    error,
  };
};
