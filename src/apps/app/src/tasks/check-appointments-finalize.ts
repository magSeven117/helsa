import { database } from '@helsa/database';
import { CheckAppointmentsToFinalize } from '@helsa/engine/appointment/application/check-appointments-to-finalize';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { schedules } from '@trigger.dev/sdk/v3';

export const checkAppointmentsFinalize = schedules.task({
  id: 'check-appointments-finalize',
  description: 'Check appointments to finalize',
  cron: {
    pattern: '*/30 * * * *',
  },
  run: async () => {
    const service = new CheckAppointmentsToFinalize(new PrismaAppointmentRepository(database));
    await service.run();
  },
});
