import { database } from '@helsa/database';
import { GetDoctorAppointments } from '@helsa/engine/appointment/application/get-doctor-appointments';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { GetDoctor } from '@helsa/engine/doctor/application/services/get-doctor';
import { UpdateIndexStore } from '@helsa/engine/doctor/application/services/update-index-store';
import { PrismaDoctorRepository } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-repository';
import { PrismaDoctorSearcher } from '@helsa/engine/doctor/infrastructure/persistence/prisma-doctor-searcher';
import { GetUser } from '@helsa/engine/user/application/get-user';
import { PrismaUserRepository } from '@helsa/engine/user/infrastructure/prisma-user-repository';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  const { data } = await req.json();

  const service = new UpdateIndexStore(
    new PrismaDoctorRepository(database),
    new PrismaDoctorSearcher(database),
    new GetUser(new PrismaUserRepository(database)),
    new GetDoctorAppointments(
      new PrismaAppointmentRepository(database),
      new GetDoctor(new PrismaDoctorRepository(database)),
    ),
  );

  await service.run(data.doctorId);

  return NextResponse.json({
    message: 'Ok',
  });
});
