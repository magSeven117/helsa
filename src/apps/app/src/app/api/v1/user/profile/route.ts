import { database } from '@helsa/database';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetHospital } from '@helsa/engine/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { withUser } from '../../withUser';

export const GET = withUser(async ({ user }) => {
  const { id, role } = user;

  let response;

  switch (role) {
    case 'doctor':
      response = await getDoctorProfile(id);
      break;
    case 'patient':
      response = await getPatientProfile(id);
      break;
    case 'hospital':
      response = await getHospitalProfile(id);
      break;
    default:
      throw new Error('Invalid role');
  }

  return NextResponse.json({
    message: 'Ok',
    data: response,
  });
});

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
  const response = await cache(() => service.run(userId), [`patient-${userId}`], {
    tags: [`patient-${userId}`],
    revalidate: 60 * 60,
  })();

  return response;
};

const getHospitalProfile = async (userId: string) => {
  const service = new GetHospital(new PrismaHospitalRepository(database));
  const response = await cache(() => service.run(userId), ['get-hospital', userId], {
    tags: [`hospital-${userId}`],
    revalidate: 60 * 60,
  })();
  return response;
};
