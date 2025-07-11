import { HttpNextResponse } from '@helsa/api/http-next-response';
import { routeHandler } from '@helsa/api/route-handler';
import { database } from '@helsa/database';
import { FormatError } from '@helsa/ddd/core/errors/format-error';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { GetHospital } from '@helsa/engine/hospital/application/services/get-hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { GetPatient } from '@helsa/engine/patient/application/services/get-patient';
import { PrismaPatientRepository } from '@helsa/engine/patient/infrastructure/prisma-patient-repository';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';

export const GET = routeHandler(
  { name: 'get-user-profile' },
  async ({ user }) => {
    const { id, role } = user;

    let response;

    switch (role.value) {
      case UserRoleValue.DOCTOR:
        response = await getDoctorProfile(id.value);
        break;
      case UserRoleValue.PATIENT:
        response = await getPatientProfile(id.value);
        break;
      case UserRoleValue.HOSPITAL:
        response = await getHospitalProfile(id.value);
        break;
      default:
        throw new FormatError('Invalid role');
    }

    return NextResponse.json({
      data: response,
    });
  },
  (error) => {
    switch (true) {
      case error instanceof FormatError:
        return HttpNextResponse.domainError(error, 400);

      default:
        return HttpNextResponse.internalServerError();
    }
  },
);

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
