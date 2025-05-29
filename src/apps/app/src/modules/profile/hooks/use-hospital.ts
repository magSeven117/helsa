import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useHospital = (id: string) => {
  const {
    data: hospital,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hospital', id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/hospital/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hospital data');
      }
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
    enabled: () => !!id, // Only run if id is defined
  });

  return {
    hospital,
    isLoading,
    error,
  };
};

export const useUpdateHospital = (id: string) => {
  const client = useQueryClient();
  const {
    mutateAsync: updateHospital,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-hospital'],
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/v1/hospital/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hospital: data }),
      });

      if (!response.ok) {
        throw new Error('Failed to update hospital');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate the hospital query to refetch the updated data
      client.invalidateQueries({
        queryKey: ['hospital', id],
      });
    },
  });
  return {
    updateHospital,
    isPending,
    error,
  };
};
