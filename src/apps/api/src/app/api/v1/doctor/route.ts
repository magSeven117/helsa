import { HttpNextResponse } from '@helsa/controller/http-next-response';
import { routeHandler } from '@helsa/controller/route-handler';
import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateDoctor } from '@helsa/engine/doctor/application/services/create-doctor';
import { GetDoctors } from '@helsa/engine/doctor/application/services/get-doctors';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { UpdateRole } from '@helsa/engine/user/application/update-role';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  doctor: z.object({
    id: z.string(),
    userId: z.string(),
    licenseMedicalNumber: z.string(),
    specialtyId: z.string(),
  }),
});

export const POST = routeHandler({ name: 'create-doctor', schema }, async ({ body }) => {
  const service = new CreateDoctor(new PrismaDoctorRepository(database));
  const updateService = new UpdateRole(new PrismaUserRepository(database));

  await service.run(body.doctor as unknown as Primitives<Doctor>);
  await updateService.run(UserRoleValue.DOCTOR, body.doctor.userId);

  return NextResponse.json({ success: true, message: 'Doctor created successfully' }, { status: 200 });
});

const searchSchema = z.object({
  filters: z.object({
    q: z.string().optional(),
    specialties: z.array(z.string()).optional(),
    availability: z.string().optional(),
    minRate: z.number().optional(),
    experience: z.number().optional(),
  }),
});

export const GET = routeHandler({ name: 'get-doctors', querySchema: searchSchema }, async ({ searchParams }) => {
  const service = new GetDoctors(new PrismaDoctorRepository(database));
  const doctors = await service.run(searchParams.filters);
  return HttpNextResponse.json({ data: doctors });
});
