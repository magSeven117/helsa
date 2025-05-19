import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentType } from '@helsa/engine/appointment/domain/appointment-type';
import { useQuery } from '@tanstack/react-query';

export const useTypes = () => {
  const { data, isFetching, error } = useQuery({
    initialData: [],
    queryKey: ['appointment-types'],
    queryFn: async () => {
      const response = await fetch('/api/v1/appointment/types');
      if (!response.ok) {
        throw new Error('Failed to fetch appointment types');
      }
      const json = await response.json();
      return json.data as Primitives<AppointmentType>[];
    },
    refetchOnWindowFocus: false,
  });

  return {
    types: data,
    isLoading: isFetching,
    error,
  };
};
