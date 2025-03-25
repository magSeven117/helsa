import { database } from '@helsa/database';
import { SetReadyAppointments } from '@helsa/engine/appointment/application/set-ready-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { schedules } from '@trigger.dev/sdk/v3';

export const getReadyAppointment = schedules.task({
  id: 'get-ready-appointment',
  description: 'Get ready for the appointment',
  cron: {
    pattern: '*/30 * * * *',
  },
  run: async () => {
    const service = new SetReadyAppointments(new PrismaAppointmentRepository(database));
    await service.run();
  },
});
