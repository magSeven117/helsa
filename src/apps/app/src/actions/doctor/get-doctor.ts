'use server';
import { getSession } from '@helsa/auth/server';
import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';

export const getDoctor = async () => {
  const user = await getSession();
  if (!user) {
    return null;
  }
  const userId = user.user.id;

  const doctorRepository = new PrismaDoctorRepository(database);
  const getDoctorService = new GetDoctor(doctorRepository);
  const doctor = await getDoctorService.run(userId);
  if (!doctor) {
    return null;
  }
  return doctor;
};
