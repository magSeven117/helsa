import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentNote } from '@helsa/engine/appointment/domain/note';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useNotes = (id?: string) => {
  const {
    data: notes,
    isFetching,
    error,
  } = useQuery({
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
  });

  return {
    notes,
    isFetching,
    error,
  };
};

export const useAddNote = () => {
  const client = useQueryClient();
  const { mutateAsync: createNote, error } = useMutation({
    mutationFn: async ({
      appointmentId,
      note,
      id,
      isPublic,
    }: {
      appointmentId: string;
      note: string;
      id: string;
      isPublic: boolean;
    }) => {
      const response = await fetch(`/api/v1/appointment/${appointmentId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note, id, isPublic }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw {
          title: 'Error creating note',
          message: error.message,
          status: response.status,
          type: response.status >= 500 ? 'error' : 'warning',
        };
      }
      return response.json();
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });
  return { createNote, error };
};
