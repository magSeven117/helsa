import { Uuid } from '@/modules/shared/domain/core/value-objects/Uuid';
import { db } from '@/modules/shared/infrastructure/connections/prisma';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { RegisterUser } from '../../application/RegisterUser';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';
import { verifyWebhook } from '../guards/svix-guard';

export const POSTCreateUser = async (req: NextRequest) => {
  const useCase = new RegisterUser(new PrismaUserRepository(db));
  const headerPayload = headers();
  const bodyPayload = await req.text();
  let evt;
  try {
    evt = await verifyWebhook(headerPayload, bodyPayload);
  } catch (error) {
    return new NextResponse('Error occurred', { status: 500 });
  }
  if (evt.type !== 'user.created') {
    return new NextResponse('Error occurred', { status: 500 });
  }
  const { id, email_addresses } = evt.data;
  try {
    await useCase.run(
      Uuid.random().value,
      id,
      email_addresses?.[0].email_address
    );
  } catch (error) {
    return new NextResponse('Error occurred', { status: 500 });
  }

  return NextResponse.json({ message: 'User created' }, { status: 200 });
};
