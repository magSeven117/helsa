import { database } from '@helsa/database';
import { CreateAppointmentCallRoom } from '@helsa/engine/appointment/application/create-appointment-call-room';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { StreamCallService } from '@helsa/engine/appointment/infrastructure/stream-call-service';
import { env } from '@helsa/env';
import { StreamClient } from '@stream-io/node-sdk';
import { task } from '@trigger.dev/sdk/v3';

export const CreateAppointmentRoomTask = task({
  id: 'create-appointment-room',
  run: async (payload: any) => {
    const client = new StreamClient(env.NEXT_PUBLIC_STREAM_CLIENT_KEY, env.NEXT_PUBLIC_STREAM_CLIENT_SECRET);
    const service = new CreateAppointmentCallRoom(
      new PrismaAppointmentRepository(database),
      new StreamCallService(client),
    );

    await service.run(payload.appointmentId);
    return {
      message: 'Appointment room created',
    };
  },
});
