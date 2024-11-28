import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { GetSpecialties } from '../../application/services/get-specialties';
import { PrismaDoctorRepository } from '../../infrastructure/persistence/prisma-doctor-repository';

export async function getSpecialties() {
  const service = new GetSpecialties(new PrismaDoctorRepository(db));
  const specialties = await service.run();
  return specialties.map((specialty) => specialty.toPrimitives());
}
