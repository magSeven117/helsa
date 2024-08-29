import { db } from '@/modules/shared/infrastructure/persistence/prisma/PrismaConnection';
import { NextRequest, NextResponse } from 'next/server';
import { RegisterUserDoctor } from '../../application/RegisterUserDoctor';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';

export const POSTRegisterDoctorUser = async (req: NextRequest) => {
  try {
    const useCase = new RegisterUserDoctor(new PrismaUserRepository(db));

    const { id, externalId, email } = await req.json();
    await useCase.run(id, externalId, email);

    return NextResponse.json({ message: 'User created' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
};
