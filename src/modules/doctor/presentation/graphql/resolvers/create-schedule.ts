import { CreateSchedule } from '@/modules/doctor/application/services/create-schedule';
import { Day } from '@/modules/doctor/domain/day';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { InternalError } from '@/modules/shared/domain/core/errors/internal-error';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';

export const CreateScheduleResolver = async (_: unknown, input: { doctorId: string; days: Primitives<Day>[] }) => {
  try {
    const service = new CreateSchedule(new PrismaDoctorRepository(db));
    const { doctorId, days } = input;
    await service.run(doctorId, days);
  } catch (error) {
    console.log('[ERROR - CreateScheduleResolver]', error);
    throw new InternalError('Internal server error');
  }
};
