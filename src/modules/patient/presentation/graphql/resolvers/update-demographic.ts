import { UpdateDemographic } from '@/modules/patient/application/services/update-demographic';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateDemographicResolver = async (parent, input, context) => {
  try {
    const { patientId, demographic } = input;
    const service = new UpdateDemographic(new PrismaPatientRepository(db));
    await service.run(patientId, demographic);
  } catch (error) {
    console.log('[ERROR] update-demographic.resolver', error);
    throw new InternalError('An error occurred. Please try again.');
  }
};
