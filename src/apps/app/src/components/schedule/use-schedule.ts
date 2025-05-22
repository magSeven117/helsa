'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Schedule } from '@helsa/engine/doctor/domain/schedule';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSaveSchedule = () => {
  const client = useQueryClient();
  const {
    mutateAsync: saveSchedule,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['save-schedule'],
    mutationFn: async (data: {
      doctorId: string;
      days: { day: string; hours: { hour: string }[] }[];
      duration?: number;
      maxAppointment?: number;
    }) => {
      const { doctorId, days, duration, maxAppointment } = data;
      await fetch(`/api/v1/doctor/${doctorId}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days, duration, maxAppointment }),
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['schedule'] });
    },
  });

  return {
    saveSchedule,
    isPending,
    error,
  };
};

export const useSchedule = (doctorId: string) => {
  const { data: schedule, isLoading } = useQuery({
    initialData: {
      id: '',
      days: [],
      appointmentDuration: 0,
      maxAppointmentsPerDay: 0,
    },
    queryKey: ['schedule'],
    queryFn: async () => {
      const response = await fetch(`/api/v1/doctor/${doctorId}/schedule`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      const data = await response.json();
      return data.data as Primitives<Schedule>;
    },
    enabled: () => !!doctorId,
    refetchOnWindowFocus: false,
  });
  return {
    schedule,
    isLoading,
  };
};
