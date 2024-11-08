import { UpdateBiometric } from '@/modules/patient/application/services/update-biometric';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateBiometricResolver = async (_, input) => {
  try {
    const { patientId, biometric } = input;

    const service = new UpdateBiometric(new PrismaPatientRepository(db));
    await service.run(patientId, biometric);
  } catch (error) {
    console.log('Error on UpdateBiometricResolver', error);
    throw new InternalError('Error on UpdateBiometricResolver');
  }
};
