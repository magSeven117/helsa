import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { UpdateRole } from '@/modules/user/application/update-role';
import { UserRoleValue } from '@/modules/user/domain/user-role';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user-repository';
import { CreateDoctor } from '../../../application/services/create-doctor';
import { PrismaDoctorRepository } from '../../../infrastructure/persistence/prisma-doctor-repository';

export const CreateDoctorResolver = async (ctx, input) => {
  try {
    const { doctor } = input;
    const service = new CreateDoctor(new PrismaDoctorRepository(db));
    const updateService = new UpdateRole(new PrismaUserRepository(db));
    await service.run(doctor);
    await updateService.run(UserRoleValue.DOCTOR, doctor.userId);
  } catch (error) {
    console.log(error);
    throw new InternalError('Error occurred');
  }
};
