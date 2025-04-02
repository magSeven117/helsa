import { useTRPC } from '@helsa/api/src/providers/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAppointment = (id: string) => {
  const trpc = useTRPC();
  const { data, error, isFetching } = useSuspenseQuery(
    trpc.appointment.getAppointment.queryOptions({
      appointmentId: id,
      include: {
        specialty: true,
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
        diagnostics: true,
        treatments: {
          include: { medication: true },
        },
        orders: true,
      },
    }),
  );

  return {
    appointment: data,
    isLoading: isFetching,
    error,
  };
};
