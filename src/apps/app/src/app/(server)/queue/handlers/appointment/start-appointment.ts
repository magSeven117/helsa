import { database } from '@helsa/database';
import { StartAppointment } from '@helsa/engine/appointment/application/start-appointment';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { client } from '@helsa/events';

export const startAppointment = client.createFunction(
  { name: 'Start appointment', id: 'start-appointment' },
  { event: 'appointment/user-enter' },
  async ({ event }) => {
    const { data } = event;
    const service = new StartAppointment(new PrismaAppointmentRepository(database));
    await service.run(data.appointmentId);
  },
);
