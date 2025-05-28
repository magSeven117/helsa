import { getSession } from '@helsa/auth/server';
import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetHospital } from '@helsa/engine/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { unstable_cache as cache } from 'next/cache';

export const getProfile = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error('Session not found');
  }
  const { id, role } = session.user;
  let response;
  switch (role) {
    case 'DOCTOR':
      response = await getDoctorProfile(id);
      break;
    case 'PATIENT':
      response = await getPatientProfile(id);
      break;
    case 'HOSPITAL':
      response = await getHospitalProfile(id);
      break;
    default:
      throw new Error('Invalid role');
  }

  return {
    profile: response!,
    user: session.user,
  };
};

const getDoctorProfile = async (userId: string) => {
  const service = new GetDoctor(new PrismaDoctorRepository(database));
  const response = await cache(() => service.run(userId), [`doctor-${userId}`], {
    tags: [`doctor-${userId}`],
    revalidate: 60 * 60,
  })();

  return response;
};

const getPatientProfile = async (userId: string) => {
  const service = new GetPatient(new PrismaPatientRepository(database));
  const response = await cache(() => service.run(userId, 'userId'), [`patient-${userId}`], {
    tags: [`patient-${userId}`],
    revalidate: 60 * 60,
  })();

  return response;
};

const getHospitalProfile = async (userId: string) => {
  const service = new GetHospital(new PrismaHospitalRepository(database));
  const response = await cache(() => service.run(userId, 'adminId'), ['get-hospital', userId], {
    tags: [`hospital-${userId}`],
    revalidate: 60 * 60,
  })();
  return response;
};
