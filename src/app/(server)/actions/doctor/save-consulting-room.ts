import { SetConsultingRoom } from '@/modules/doctor/application/services/set-consulting-room';
import { ConsultingRoomAddress } from '@/modules/doctor/domain/consulting-room-address';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { authActionClient } from '@/modules/shared/infrastructure/actions/client-actions';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
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
    const service = new SetConsultingRoom(new PrismaDoctorRepository(db));
    await service.run(doctorId, consultingRoomAddress as unknown as Primitives<ConsultingRoomAddress>);
  });
