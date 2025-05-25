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
import { routeHandler } from '../route-handler';

const schema = z.object({
  doctor: z.object({
    id: z.string(),
    userId: z.string(),
    licenseMedicalNumber: z.string(),
    specialtyId: z.string(),
  }),
});

export const POST = routeHandler(async ({ req }) => {
  const { doctor } = schema.parse(await req.json());
  const service = new CreateDoctor(new PrismaDoctorRepository(database));
  const updateService = new UpdateRole(new PrismaUserRepository(database));

  await service.run(doctor as unknown as Primitives<Doctor>);
  await updateService.run(UserRoleValue.DOCTOR, doctor.userId);

  return NextResponse.json({ success: true, message: 'Doctor created successfully' }, { status: 200 });
});

const searchSchema = z.object({
  q: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  availability: z.string().optional(),
  minRate: z.number().optional(),
  experience: z.number().optional(),
});

export const GET = routeHandler(async ({ user, params, searchParams }) => {
  const parsedInput = searchSchema.parse(searchParams);
  const service = new GetDoctors(new PrismaDoctorRepository(database));
  const doctors = await service.run(parsedInput);
  return NextResponse.json(
    {
      message: 'Ok',
      data: doctors,
    },
    { status: 200 },
  );
});
