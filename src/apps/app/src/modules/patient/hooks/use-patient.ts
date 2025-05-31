import { useQuery } from '@tanstack/react-query';
import { getPatient } from '../api/patient';

export const usePatient = (id: string, include = {}) => {
  const {
    data: patient,
    error,
    isPending,
  } = useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      return getPatient(id, include);
    },
    enabled: () => !!id,
    refetchOnWindowFocus: false,
  });
  return {
    patient,
    error,
    isPending,
  };
};
