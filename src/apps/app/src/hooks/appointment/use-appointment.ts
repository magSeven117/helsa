import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { useEffect, useState } from 'react';

export const useAppointment = (id: string) => {
  const [appointment, setAppointment] = useState<Primitives<Appointment> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      setIsLoading(true);
      const include = {
        specialty: true,
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
        diagnostics: true,
        treatments: { include: { medication: true } },
        orders: true,
      };
      try {
        const response = await fetch(`/api/v1/appointment/${id}?include=${JSON.stringify(include)}`);
        const json = await response.json();
        setAppointment(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  return {
    appointment,
    isLoading,
    error,
  };
};
