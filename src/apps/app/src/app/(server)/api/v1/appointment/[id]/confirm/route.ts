import { HttpNextResponse } from '@helsa/api/http-next-response';
import { database } from '@helsa/database';
import { ConfirmAppointment } from '@helsa/engine/appointment/application/confirm-appointment';
import { AppointmentNotFoundError } from '@helsa/engine/appointment/domain/errors/appointment-not-found-error';
import { PrismaAppointmentRepository } from '@helsa/engine/appointment/infrastructure/persistence/prisma-appointment-repository';
import { InngestEventBus } from '@helsa/events';
import { getSession } from '@helsa/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log('Confirm appointment endpoint called');
  
  try {
    // Authentication
    const session = await getSession();
    if (!session?.user) {
      return HttpNextResponse.domainError(new Error('Unauthenticated'), 401);
    }
    
    // Authorization - only doctors can confirm appointments
    if (session.user.role !== 'DOCTOR') {
      return HttpNextResponse.domainError(new Error('Unauthorized'), 403);
    }
    
    const { id } = await params;
    console.log('Appointment ID to confirm:', id);
    
    const service = new ConfirmAppointment(new PrismaAppointmentRepository(database), new InngestEventBus());
    console.log('Service created, running confirmation...');
    await service.run(id);
    console.log('Appointment confirmed successfully');
    
    return HttpNextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in confirm appointment:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'No message');
    
    if (error instanceof AppointmentNotFoundError) {
      console.log('Appointment not found error');
      return HttpNextResponse.domainError(error, 404);
    }
    
    console.log('Default error handler - internal server error');
    return HttpNextResponse.internalServerError(error instanceof Error ? error : undefined);
  }
}
