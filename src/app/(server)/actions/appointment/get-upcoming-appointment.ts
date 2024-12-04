import { GetUpcomingAppointment } from '@/modules/appointment/application/get-upcoming-appointments';
import { PrismaAppointmentRepository } from '@/modules/appointment/infrastructure/persistence/prisma-appointment-repository';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { getPatient } from '../patient/get-patient';

export const getUpcomingAppointment = authActionClient
  .metadata({
    actionName: 'get-upcoming-appointment',
  })
  .action(async ({ ctx: { user } }) => {
    const patient = await getPatient({ userId: user.id });
    if (!patient) {
      return [];
    }
    const service = new GetUpcomingAppointment(new PrismaAppointmentRepository(db));
    const appointments = await service.run(patient.data?.id!);
    return appointments;
  });
