import { UpdateDoctor } from '@/modules/doctor/application/services/update-doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateDoctorResolver = async (context, input) => {
  try {
    const { doctorId, doctor } = input;
    const service = new UpdateDoctor(new PrismaDoctorRepository(db));
    await service.run(doctorId, doctor);
  } catch (error) {
    console.log(error);
    throw new InternalError(error);
  }
};
