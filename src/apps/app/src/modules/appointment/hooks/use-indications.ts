'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Order } from '@helsa/engine/order/domain/order';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';

export const useIndications = (id: string) => {
  const { diagnosis, orders, pending, treatments } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['treatments'],
        queryFn: async () => {
          const response = await fetch('/api/v1/treatment?appointmentId=' + id);
          if (!response.ok) {
            throw new Error('Failed to fetch indications');
          }
          const json = await response.json();
          return json.data as Primitives<Treatment>[];
        },
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['diagnosis'],
        queryFn: async () => {
          const response = await fetch(`/api/v1/diagnosis?id=${id}&field=appointmentId`);
          if (!response.ok) {
            throw new Error('Failed to fetch indications');
          }
          const json = await response.json();
          return json.data as Primitives<Diagnostic>[];
        },
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['orders'],
        queryFn: async () => {
          const response = await fetch(`/api/v1/order?appointmentId=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch indications');
          }
          const json = await response.json();
          return json.data as Primitives<Order>[];
        },
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [treatments, diagnosis, orders] = results;
      return {
        treatments,
        diagnosis,
        orders,
        pending: treatments.isLoading || diagnosis.isLoading || orders.isLoading,
      };
    },
  });

  return {
    treatments: treatments.data,
    diagnosis: diagnosis.data,
    orders: orders.data,
    pending,
  };
};

export const useAddIndications = () => {
  const client = useQueryClient();
  const { mutateAsync: createOrder } = useMutation({
    mutationFn: async (data: Partial<Primitives<Order>>) => {
      const response = await fetch('/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error creating order');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  const { mutateAsync: createTreatment } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/v1/treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error creating treatment');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['treatments'] });
    },
  });
  const { mutateAsync: createDiagnosis } = useMutation({
    mutationFn: async (data: Partial<Primitives<Diagnostic>>) => {
      const response = await fetch('/api/v1/diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error creating diagnosis');
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['diagnosis'] });
    },
  });
  return {
    createOrder,
    createTreatment,
    createDiagnosis,
  };
};
