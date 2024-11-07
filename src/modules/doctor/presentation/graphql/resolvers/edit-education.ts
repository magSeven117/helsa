import { EditEducation } from '@/modules/doctor/application/services/edit-education';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const EditEducationResolver = async (ctx, input) => {
  try {
    const { doctorId, educationId, education } = input;
    const service = new EditEducation(new PrismaDoctorRepository(db));
    await service.run(doctorId, educationId, education);
  } catch (error) {
    console.log('[EDIT EDUCATION ERROR]', error);
    throw new InternalError('Internal server error');
  }
};
