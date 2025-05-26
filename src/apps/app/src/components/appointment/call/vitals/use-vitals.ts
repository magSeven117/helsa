import { Primitives } from '@helsa/ddd/types/primitives';
import { AppointmentTelemetry } from '@helsa/engine/appointment/domain/telemetry';
import { useMutation } from '@tanstack/react-query';

export const useVitals = (id: string) => {
  const {
    mutateAsync: saveVital,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['vitals'],
    mutationFn: async (data: Partial<Primitives<AppointmentTelemetry>>) => {
      const response = await fetch(`/api/v1/appointment/${id}/vitals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to save vitals');
      }
      return response.json();
    },
  });
  return {
    saveVital,
    isPending,
    error,
  };
};
