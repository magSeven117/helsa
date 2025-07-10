import { getDoctorSpecialties } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { useQuery } from '@tanstack/react-query';

export const useSpecialties = () => {
  const {
    data: specialties,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['specialties'],
    queryFn: async () => getDoctorSpecialties(),
    refetchOnWindowFocus: false,
  });
  return {
    specialties,
    isLoading,
    error,
  };
};
