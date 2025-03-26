import { database } from '@helsa/database';
import { StartAppointment } from '@helsa/engine/appointment/application/start-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { task } from '@trigger.dev/sdk/v3';

export const startAppointment = task({
  id: 'start-appointment',
  maxDuration: 300,
  run: async (payload: any) => {
    const service = new StartAppointment(new PrismaAppointmentRepository(database));
    await service.run(payload.data.appointmentId);
  },
});
