import { database } from '@helsa/database';
import { CreateAppointmentCallRoom } from '@helsa/engine/appointment/application/create-appointment-call-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamCallService } from '@helsa/engine/appointment/infrastructure/stream-call-service';
import { client as videoClient } from '@helsa/video';
import { client } from '@helsa/events';

export const createAppointmentRoom = client.createFunction(
  { id: 'create-appointment-room', name: 'Create Appointment Room' },
  { event: 'appointment/scheduled' },
  async ({ event }) => {
    const { data } = event;
    const service = new CreateAppointmentCallRoom(
      new PrismaAppointmentRepository(database),
      new StreamCallService(videoClient),
    );
    await service.run(data.id);
  },
);
