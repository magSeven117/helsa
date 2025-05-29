import { Primitives } from '@helsa/ddd/types/primitives';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { useQuery } from '@tanstack/react-query';

export const usePathologies = () => {
  const { data, isLoading, error } = useQuery({
    initialData: [],
    queryKey: ['pathologies'],
    queryFn: async () => {
      const response = await fetch(`/api/v1/diagnosis/pathology`);
      if (!response.ok) {
        throw new Error('Failed to fetch pathologies');
      }
      const json = await response.json();
      return json.data as Primitives<Pathology>[];
    },
    refetchOnWindowFocus: false,
  });
  return {
    pathologies: data,
    isLoading,
    error,
  };
};
