import { AddEducation } from '@/modules/doctor/application/services/add-education';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const AddEducationResolver = async (ctx, input) => {
  try {
    const { doctorId, education } = input;
    const service = new AddEducation(new PrismaDoctorRepository(db));
    await service.run(doctorId, education);
  } catch (error) {
    console.log(error);
    throw new InternalError(error.message);
  }
};
