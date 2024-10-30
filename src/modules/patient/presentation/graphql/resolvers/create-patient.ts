import { CreatePatient } from '@/modules/patient/application/services/create-patient';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';

export const CreatePatientResolver = async (context, input) => {
  try {
    const service = new CreatePatient(new PrismaPatientRepository(db));
    const updateService = new UpdateRole(new PrismaUserRepository(db));
    await service.run(input.patient);
    await updateService.run(UserRoleValue.PATIENT, input.patient.userId);
  } catch (error) {
    console.log('[ERROR ON CREATE PATIENT]', error);
    throw new InternalError('Internal error');
  }
};
