import { CreateDoctorOnUserCreated } from '@/modules/doctor/application/event-handlers/create-doctor-on-user-created';
import { CreateDoctor } from '@/modules/doctor/application/services/create-doctor';
import { PrismaDoctorRepository } from '@/modules/doctor/infrastructure/persistence/PrismaDoctorRepository';
import { DomainEventPrimitives } from '@/modules/shared/domain/core/domain-event';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { UserCreated } from '@/modules/user/domain/user-created';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const handlers = [new CreateDoctorOnUserCreated(new CreateDoctor(new PrismaDoctorRepository(db)))];

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
