import { database } from '@helsa/database';
import { NotifyDoctor } from '@helsa/engine/appointment/application/notify-doctor';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { NovuNotifier } from '@helsa/notifications/notifier';
import { client } from '@helsa/events';
export const notifyDoctor = client.createFunction(
  { id: 'notify-doctor', name: 'Notify doctor' },
  { event: 'appointment/scheduled' },
  async ({ event }) => {
    const { data } = event;
    const repository = new PrismaAppointmentRepository(database);
    const notifier = new NovuNotifier();
    const service = new NotifyDoctor(notifier, repository);
    await service.execute(data.id);
  },
);
