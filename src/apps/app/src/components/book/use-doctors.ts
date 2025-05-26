import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { useQuery } from '@tanstack/react-query';

export const useDoctors = (filters: { q?: string; availability?: string; minRate?: number; experience?: number }) => {
  const { data, isFetching, error } = useQuery({
    initialData: [],
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await fetch(`/api/v1/doctor?filters=${JSON.stringify(filters)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const json = await response.json();
      return json.data as Primitives<Doctor>[];
    },
    refetchOnWindowFocus: false,
  });

  return {
    doctors: data,
    isLoading: isFetching,
    error,
  };
};
