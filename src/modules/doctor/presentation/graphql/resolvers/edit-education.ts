import { EditEducation } from '@/modules/doctor/application/services/edit-education';
import { Education } from '@/modules/doctor/domain/educations';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const EditEducationResolver = async (
  _: unknown,
  input: { doctorId: string; educationId: string; education: Primitives<Education> }
) => {
  try {
    const { doctorId, educationId, education } = input;
    const service = new EditEducation(new PrismaDoctorRepository(db));
    await service.run(doctorId, educationId, education);
  } catch (error) {
    console.log('[EDIT EDUCATION ERROR]', error);
    throw new InternalError('Internal server error');
  }
};
