import { useQuery } from '@tanstack/react-query';

export const useStream = (id: string) => {
  const {
    data: token,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['stream', id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/appointment/${id}/room`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch stream data');
      }
      const data = await response.json();
      return data.token as string;
    },
    refetchOnWindowFocus: false,
    enabled: () => !!id,
  });
  return {
    token,
    isFetching,
    error,
  };
};
