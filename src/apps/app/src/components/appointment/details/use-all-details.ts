import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentNote } from '@helsa/engine/appointment/domain/note';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Order } from '@helsa/engine/order/domain/order';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { useQueries } from '@tanstack/react-query';

export const useAllDetails = (id: string) => {
  const { loading, treatments, diagnoses, orders, notes, recordings, transcriptions } = useQueries({
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
      {
        initialData: [],
        queryKey: ['notes'],
        queryFn: async () => {
          const response = await fetch(`/api/v1/appointment/${id ?? ''}/notes`);
          if (!response.ok) {
            throw new Error('Error fetching notes');
          }
          const data = await response.json();
          return data.data as Primitives<AppointmentNote>[];
        },
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['recordings'],
        queryFn: async () => {
          if (!id) return null;
          const response = await fetch('/api/functions/get-recordings?id=' + id);
          if (!response.ok) {
            throw new Error('Failed to fetch recordings');
          }
          const data = await response.json();
          return data.data;
        },
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['transcriptions'],
        queryFn: async () => {
          const response = await fetch('/api/functions/get-transcription?id=' + id);
          if (!response.ok) {
            throw new Error('Failed to fetch transcriptions');
          }
          const data = await response.json();
          return data.data;
        },
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [treatments, diagnoses, orders, notes, recordings, transcriptions] = results;
      return {
        diagnoses,
        treatments,
        orders,
        notes,
        recordings,
        transcriptions,
        loading:
          diagnoses.isLoading ||
          treatments.isLoading ||
          orders.isLoading ||
          notes.isLoading ||
          recordings.isLoading ||
          transcriptions.isLoading,
      };
    },
  });
  return {
    loading,
    treatments: treatments.data,
    diagnoses: diagnoses.data,
    orders: orders.data,
    notes: notes.data,
    recordings: recordings.data,
    transcriptions: transcriptions.data,
  };
};
