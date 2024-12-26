'use server';

import { authActionClient } from '@helsa/actions';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { ConsultingRoomAddress } from '@helsa/engine/doctor/domain/consulting-room-address';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { SetConsultingRoom } from '@helsa/engine/doctor/application/services/set-consulting-room';
import { z } from 'zod';

const schema = z.object({
  doctorId: z.string(),
  consultingRoomAddress: z.object({
    city: z.string(),
    address: z.string(),
  }),
});

export const saveConsultingRoom = authActionClient
  .schema(schema)
  .metadata({
    actionName: 'save-consulting-room',
  })
  .action(async ({ parsedInput }) => {
    const { doctorId, consultingRoomAddress } = parsedInput;
    const service = new SetConsultingRoom(new PrismaDoctorRepository(database));
    await service.run(doctorId, consultingRoomAddress as unknown as Primitives<ConsultingRoomAddress>);
  });
