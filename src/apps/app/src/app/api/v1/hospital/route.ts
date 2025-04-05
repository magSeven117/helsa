import { database } from '@helsa/database';
import { Primitives } from '@helsa/ddd/types/primitives';
import { CreateHospital } from '@helsa/engine/hospital/application/services/create-hospital';
import { GetHospital } from '@helsa/engine/hospital/application/services/get-hospital';
import { Hospital } from '@helsa/engine/hospital/domain/hospital';
import { PrismaHospitalRepository } from '@helsa/engine/hospital/infrastructure/prisma-hospital-repository';
import { UpdateRole } from '@helsa/engine/user/application/update-role';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { unstable_cache as cache } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withUser } from '../withUser';

const schema = z.object({
  hospital: z.object({
    adminId: z.string(),
    name: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      country: z.string(),
      zipCode: z.string(),
      coordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    }),
  }),
});

export const POST = withUser(async ({ req }) => {
  const { hospital } = schema.parse(await req.json());

  const service = new CreateHospital(new PrismaHospitalRepository(database));
  const updateRole = new UpdateRole(new PrismaUserRepository(database));
  await service.run(hospital as unknown as Primitives<Hospital>);
  await updateRole.run(UserRoleValue.HOSPITAL, hospital.adminId);

  return NextResponse.json(
    {
      message: 'Hospital created successfully',
    },
    { status: 201 },
  );
});

export const GET = withUser(async ({ user }) => {
  const service = new GetHospital(new PrismaHospitalRepository(database));
  const response = await cache(() => service.run(user.id), ['get-hospital', user.id], {
    tags: [`get-hospital-${user.id}`],
    revalidate: 60 * 60,
  })();
  return NextResponse.json({ data: response });
});
