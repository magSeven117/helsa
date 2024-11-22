import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { TriggerEventBus } from '@/modules/shared/infrastructure/events/trigger/trigger-event-bus';
import { db } from '@/modules/shared/infrastructure/persistence/prisma/prisma-connection';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { RegisterUser } from '../../application/register-user';
import { PrismaUserRepository } from '../../infrastructure/prisma-user-repository';
import { verifyWebhook } from '../guards/svix-guard';

export const POSTCreateUser = async (req: NextRequest) => {
  const useCase = new RegisterUser(new PrismaUserRepository(db), new TriggerEventBus());
  const headerPayload = headers();
  const bodyPayload = await req.text();
  let evt;
  try {
    evt = await verifyWebhook(headerPayload, bodyPayload, process.env.CLERK_WEBHOOK_SECRET);
  } catch (error) {
    console.log(error);
    return new NextResponse('Error occurred', { status: 500 });
  }
  if (evt.type !== 'user.created') {
    return new NextResponse('Error occurred', { status: 500 });
  }
  const { id, email_addresses, unsafe_metadata, full_name } = evt.data;
  if (unsafe_metadata.provider !== 'oauth') return NextResponse.json({ message: 'User created' }, { status: 200 });
  try {
    await useCase.run(
      Uuid.random().value,
      id,
      email_addresses?.[0].email_address,
      unsafe_metadata.role,
      full_name,
      unsafe_metadata.additionalData
    );
  } catch (error) {
    console.log(error);
    return new NextResponse('Error occurred', { status: 500 });
  }

  return NextResponse.json({ message: 'User created' }, { status: 200 });
};
