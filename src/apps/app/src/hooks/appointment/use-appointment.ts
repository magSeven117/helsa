import { useORPC } from '@helsa/api/source/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAppointment = (id: string) => {
  const orpc = useORPC();
  const { data, error, isFetching } = useSuspenseQuery(
    orpc.appointment.get.queryOptions({
      input: {
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
      },
    }),
  );

  return {
    appointment: data,
    isLoading: isFetching,
    error,
  };
};
