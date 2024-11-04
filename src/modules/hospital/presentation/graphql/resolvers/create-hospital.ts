import { CreateHospital } from '@/modules/hospital/application/services/create-hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';

export const CreateHospitalResolver = async (_, input) => {
  try {
    const { hospital } = input;
    const service = new CreateHospital(new PrismaHospitalRepository(db));
    const updateRol = new UpdateRole(new PrismaUserRepository(db));
    await service.run(hospital);
    await updateRol.run(UserRoleValue.HOSPITAL, hospital.adminId);
  } catch (error) {
    console.log('[createHospital] error', error);
    throw new InternalError(error);
  }
};
