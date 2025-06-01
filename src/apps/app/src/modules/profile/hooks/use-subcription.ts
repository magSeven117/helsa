import { useQuery } from '@tanstack/react-query';
import { getSubscription } from '../api/subscription';

export const useSubscription = () => {
  const {
    data: subscription,
    error,
    isPending,
  } = useQuery({
    initialData: {
      customer: null,
      subscription: null,
    },
    queryKey: ['subscription'],
    queryFn: async () => {
      return getSubscription();
    },
    refetchOnWindowFocus: false,
  });
  return {
    subscription,
    error,
    isPending,
  };
};
