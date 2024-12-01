import { SaveEducation } from '@/modules/doctor/application/services/add-education';
import { Education } from '@/modules/doctor/domain/educations';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const AddEducationResolver = async (
  ctx: unknown,
  input: { doctorId: string; education: Primitives<Education> }
) => {
  try {
    const { doctorId, education } = input;
    const service = new SaveEducation(new PrismaDoctorRepository(db));
    await service.run(doctorId, education);
  } catch (error: any) {
    console.log(error);
    throw new InternalError(error.message);
  }
};
