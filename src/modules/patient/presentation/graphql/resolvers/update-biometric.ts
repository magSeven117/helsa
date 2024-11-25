import { UpdateBiometric } from '@/modules/patient/application/services/update-biometric';
import { PatientBiometric } from '@/modules/patient/domain/members/biometric';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateBiometricResolver = async (
  _: unknown,
  input: {
    patientId: string;
    biometric: {
      height: number;
      organDonor: string;
      bloodType: string;
    };
  }
) => {
  try {
    const { patientId, biometric } = input;

    const service = new UpdateBiometric(new PrismaPatientRepository(db));
    await service.run(patientId, biometric as Primitives<PatientBiometric>);
  } catch (error) {
    console.log('Error on UpdateBiometricResolver', error);
    throw new InternalError('Error on UpdateBiometricResolver');
  }
};
