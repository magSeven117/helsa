import { SetConsultingRoom } from '@/modules/doctor/application/services/set-consulting-room';
import { ConsultingRoomAddress } from '@/modules/doctor/domain/consulting-room-address';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const SetConsultingRoomResolver = async (
  _: unknown,
  input: {
    doctorId: string;
    consultingRoomAddress: Primitives<ConsultingRoomAddress>;
  }
) => {
  try {
    const { doctorId, consultingRoomAddress } = input;
    const service = new SetConsultingRoom(new PrismaDoctorRepository(db));
    await service.run(doctorId, consultingRoomAddress);
  } catch (error) {
    console.error(error);
    throw new Error('Error setting consulting room');
  }
};
