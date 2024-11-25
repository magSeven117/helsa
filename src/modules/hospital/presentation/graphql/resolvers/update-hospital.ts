import { UpdateHospital } from '@/modules/hospital/application/services/update-hospital';
import { Hospital } from '@/modules/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateHospitalResolver = async (
  _: unknown,
  input: {
    hospitalId: string;
    hospital: Primitives<Hospital>;
  }
) => {
  try {
    const { hospitalId, hospital } = input;
    const service = new UpdateHospital(new PrismaHospitalRepository(db));
    await service.run(hospitalId, hospital);
  } catch (error) {
    console.log('[UPDATE HOSPITAL ERROR]', error);
    throw new InternalError('Internal server error');
  }
};
