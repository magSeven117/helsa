import { Primitives } from '@helsa/ddd/types/primitives';
import { Price } from '@helsa/engine/doctor/domain/price';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePrices = (doctorId: string) => {
  const {
    data: prices,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['prices', doctorId],
    queryFn: async () => {
      const response = await fetch(`/api/v1/doctor/${doctorId}/price`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data.data as Primitives<Price>[];
    },
    enabled: () => !!doctorId,
    refetchOnWindowFocus: false,
  });
  return {
    prices,
    isLoading,
    error,
  };
};

export const usePriceTypes = () => {
  const {
    data: types,
    isLoading,
    error,
  } = useQuery({
    initialData: [],
    queryKey: ['types'],
    queryFn: async () => {
      const response = await fetch('/api/v1/appointment/types', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
  return {
    types,
    isLoading,
    error,
  };
};

export const useCreatePrice = (doctorId: string) => {
  const client = useQueryClient();
  const { mutateAsync: createPrice, isPending } = useMutation({
    mutationKey: ['create-price'],
    mutationFn: async (data: {
      id: string;
      typeId: string;
      amount: number;
      currency: string;
      duration: number;
      doctorId: string;
      name: string;
    }) => {
      const response = await fetch(`/api/v1/doctor/${doctorId}/price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const res = await response.json();
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['prices', doctorId],
      });
    },
  });
  return { createPrice, isPending };
};

export const useDeletePrice = (doctorId: string) => {
  const client = useQueryClient();
  const { mutateAsync: deletePrice, isPending } = useMutation({
    mutationKey: ['delete-price'],
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/v1/doctor/${doctorId}/price/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['prices', doctorId],
      });
    },
  });
  return { deletePrice, isPending };
};
