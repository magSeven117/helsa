import { Primitives } from '@helsa/ddd/types/primitives';
import { Symptom } from '@helsa/engine/appointment/domain/symptom';
import { useQuery } from '@tanstack/react-query';

export const useSymptoms = () => {
  const { data, isLoading, error } = useQuery({
    initialData: [],
    queryKey: ['symptoms'],
    queryFn: async () => {
      const response = await fetch(`/api/v1/symptom`);
      if (!response.ok) {
        throw new Error('Failed to fetch symptoms');
      }
      const json = await response.json();
      return json.data as Primitives<Symptom>[];
    },
  });
  return {
    symptoms: data,
    isLoading,
    error,
  };
};
