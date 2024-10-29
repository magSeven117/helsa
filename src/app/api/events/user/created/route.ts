import { CreateDoctorOnUserCreated } from '@/modules/doctor/application/event-handlers/create-doctor-on-user-created';
import { CreateDoctor } from '@/modules/doctor/application/services/create-doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/prisma-doctor-repository';
import { CreateHospitalOnUserCreated } from '@/modules/hospital/application/handlers/create-hospital-on-user-created';
import { CreateHospital } from '@/modules/hospital/application/services/CreateHospital';
import { PrismaHospitalRepository } from '@/modules/hospital/infrastructure/prisma-hospital-repository';
import { CreatePatientOnUserCreated } from '@/modules/patient/application/handlers/create-patient-on-user-created';
import { CreatePatient } from '@/modules/patient/application/services/create-patient';
import { PrismaPatientRepository } from '@/modules/patient/infrastructure/prisma-patient-repository';
import { DomainEventPrimitives } from '@/modules/shared/domain/core/domain-event';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { UserCreated } from '@/modules/user/domain/user-created';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const handlers = [
  new CreateDoctorOnUserCreated(new CreateDoctor(new PrismaDoctorRepository(db))),
  new CreatePatientOnUserCreated(new CreatePatient(new PrismaPatientRepository(db))),
  new CreateHospitalOnUserCreated(new CreateHospital(new PrismaHospitalRepository(db))),
];

export const POST = verifySignatureAppRouter(async (req: NextRequest) => {
  try {
    const data: DomainEventPrimitives = await req.json();
    const event = UserCreated.fromPrimitives(data);
    const promises = handlers.map((handler) => handler.handle(event));
    await Promise.all(promises);
    return NextResponse.json({ message: 'Event received' });
  } catch (error) {
    console.log('[USER_CREATED_EVENT_ERROR]', error);
    return NextResponse.json({ message: 'Event not received' }, { status: 500 });
  }
});
