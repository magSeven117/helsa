import { RemoveEducation } from '@/modules/doctor/application/services/remove-education';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const RemoveEducationResolver = async (
  _: unknown,
  input: {
    doctorId: string;
    educationId: string;
  }
) => {
  try {
    const { doctorId, educationId } = input;
    const service = new RemoveEducation(new PrismaDoctorRepository(db));
    return await service.run(doctorId, educationId);
  } catch (error: any) {
    console.log('[ERROR REMOVE EDUCATION]', error);
    throw new InternalError(error);
  }
};
