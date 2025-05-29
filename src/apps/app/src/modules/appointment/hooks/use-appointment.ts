'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const defaultInclude = {
  specialty: true,
  doctor: { include: { user: true } },
  patient: { include: { user: true } },
  diagnostics: true,
  treatments: { include: { medication: true } },
  orders: true,
};

export const useAppointment = (id: string, include: any = defaultInclude) => {
  const { data, isFetching, error } = useQuery({
    initialData: {
      id: '',
      date: new Date(),
      motive: '',
      symptoms: [],
      doctor: { user: { name: '', image: '' } },
      patient: { user: { name: '', image: '' } },
      specialty: { name: '' },
      diagnostics: [],
      treatments: [],
      orders: [],
    },
    queryKey: ['appointment'],
    queryFn: async () => {
      const response = await fetch(`/api/v1/appointment/${id}?include=${JSON.stringify(include)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointment');
      }
      const json = await response.json();
      return json.data;
    },
    enabled: () => !!id,
    refetchOnWindowFocus: false,
  });

  return {
    appointment: data as Primitives<Appointment>,
    isLoading: isFetching,
    error,
  };
};

export const useFinalizeAppointment = (id: string) => {
  const client = useQueryClient();
  const {
    mutateAsync: finalizeAppointment,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      if (!id) {
        throw new Error('ID is required');
      }
      const response = await fetch(`/api/v1/appointment/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to finalize appointment');
      }
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['appointments'],
      });
      client.invalidateQueries({
        queryKey: ['appointment'],
      });
    },
  });

  return {
    finalizeAppointment,
    isPending,
    error,
    isSuccess,
  };
};

export const useCreateAppointment = () => {
  const {
    mutateAsync: createAppointment,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: {
      date: Date;
      motive: string;
      symptoms: string[];
      doctorId: string;
      typeId: string;
      id: string;
      specialtyId: string;
      priceId: string;
    }) => {
      const response = await fetch('/api/v1/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }
    },
  });
  return {
    createAppointment,
    isPending,
    error,
    isSuccess,
  };
};

export const useAppointmentList = ({
  filter,
  pagination,
  sort,
}: {
  filter: {
    start?: string;
    end?: string;
    states?: string[];
    specialties?: string[];
    types?: string[];
  };
  pagination: {
    page?: number;
    pageSize?: number;
  };
  sort: {
    sortBy?: string;
    order?: string;
  };
}) => {
  const { data, error, isFetching } = useQuery({
    initialData: {
      data: [],
      meta: {
        total: 0,
        page: 0,
        pageSize: 10,
      },
    },
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/appointment?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(
          pagination,
        )}&sort=${JSON.stringify(sort)}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const json = await response.json();
      return json.data;
    },
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading: isFetching,
    error,
  };
};
