import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePatient = (id: string) => {
  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patient', id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/patient/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      const data = await response.json();
      return data.data;
    },
    enabled: () => !!id,
    refetchOnWindowFocus: false,
  });
  return { patient, isFetching: isLoading, error };
};

export const useUpdateDemographic = (id: string) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateDemographic,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-demographic', id],
    mutationFn: async (demographic: Record<string, any>) => {
      const response = await fetch(`/api/v1/patient/${id}/demographic`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ demographic }),
      });
      if (!response.ok) {
        throw new Error('Failed to update demographic');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
    },
  });

  return { updateDemographic, isPending, error };
};

export const useUpdateBiometric = (id: string) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateBiometric,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-biometric', id],
    mutationFn: async (biometric: Record<string, any>) => {
      const response = await fetch(`/api/v1/patient/${id}/biometric`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ biometric }),
      });
      if (!response.ok) {
        throw new Error('Failed to update biometric');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', id] });
    },
  });

  return { updateBiometric, isPending, error };
};
