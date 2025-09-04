import { database } from '@helsa/database';
import { CreateAppointmentCallRoom } from '@helsa/engine/appointment/application/create-appointment-call-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { client } from '@helsa/events';
import { dailyCallService } from '@helsa/video';

export const createAppointmentRoom = client.createFunction(
  { id: 'create-appointment-room', name: 'Create Appointment Room' },
  { event: 'appointment/scheduled' },
  async ({ event }) => {
    const { data } = event;
    const service = new CreateAppointmentCallRoom(
      new PrismaAppointmentRepository(database),
      dailyCallService,
    );
    await service.run(data.id);
  },
);
