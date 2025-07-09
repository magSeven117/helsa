import { database } from '@helsa/database';
import { SetReadyAppointments } from '@helsa/engine/appointment/application/set-ready-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { client } from '@helsa/ingest';
export const setReadyAppointment = client.createFunction(
  { id: 'set-ready-appointment', name: 'Set Ready Appointment' },
  { cron: '* / 30 * * * *' },
  async () => {
    const service = new SetReadyAppointments(new PrismaAppointmentRepository(database));
    await service.run();
  },
);
