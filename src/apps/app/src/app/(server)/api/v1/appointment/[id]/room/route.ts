import { HttpNextResponse } from '@helsa/api/http-next-response';
import { database } from '@helsa/database';
import { EnterRoom } from '@helsa/engine/appointment/application/enter-room';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { InngestEventBus } from '@helsa/events';
import { client } from '@helsa/video';
import { getSession } from '@helsa/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log('Enter room endpoint called');
  
  try {
    // Authentication
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.domainError(new Error('Unauthenticated'), 401);
    }
    
    const { id } = await params;
    console.log('Appointment ID:', id);
    console.log('User role:', session.user.role);
    
    const service = new EnterRoom(new PrismaAppointmentRepository(database), new InngestEventBus());
    await service.run(id, session.user.role as 'PATIENT' | 'DOCTOR');
    
    console.log('Successfully entered room');
    return HttpNextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in enter room:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'No message');
    
    if (error instanceof AppointmentNotFoundError) {
      return HttpNextResponse.domainError(error, 404);
    }
    
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log('Get room token endpoint called');
  
  try {
    // Authentication
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.domainError(new Error('Unauthenticated'), 401);
    }
    
    const { id } = await params;
    console.log('Appointment ID:', id);
    console.log('User:', session.user);
    
    // Create user in Stream.io with default role (until custom roles are configured)
    console.log('User role from session:', session.user.role);
    
    await client.upsertUsers([
      {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image ?? '',
        role: 'user', // Use default role temporarily
      },
    ]);
    
    console.log('User upserted in Stream.io');
    
    // Generate token
    const token = client.generateUserToken({
      user_id: session.user.id,
      validity_in_seconds: 60 * 60 * 24, // 24 hours
    });
    
    console.log('Token generated successfully');
    return HttpNextResponse.json({ token });
  } catch (error) {
    console.error('Error in get room token:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'No message');
    
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}
