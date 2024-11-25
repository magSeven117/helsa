import { UpdateDoctor } from '@/modules/doctor/application/services/update-doctor';
import { Doctor } from '@/modules/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const UpdateDoctorResolver = async (
  _: unknown,
  input: {
    doctorId: string;
    doctor: Primitives<Doctor>;
  }
) => {
  try {
    const { doctorId, doctor } = input;
    const service = new UpdateDoctor(new PrismaDoctorRepository(db));
    await service.run(doctorId, doctor);
  } catch (error: any) {
    console.log(error);
    throw new InternalError(error);
  }
};
